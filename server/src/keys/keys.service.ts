import { randomUUID } from "node:crypto";

import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import fs from "fs";
import jose from "jose";
import path from "path";

import { ConfigService } from "@/config/config.service";
import { Metadata, metadataSchema } from "@/keys/metadata.schema";

@Injectable()
export class KeysService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KeysService.name);
  private readonly keysDir = path.join(process.cwd(), "keys");
  private readonly metadataPath = path.join(this.keysDir, "metadata.json");
  private metadata: Metadata = { keys: [] };
  private rotationTimeout: NodeJS.Timeout | null = null;
  jwks: jose.JSONWebKeySet = { keys: [] };
  private _privateKey: jose.CryptoKey | null = null;
  private _getKey: ReturnType<typeof jose.createLocalJWKSet> | null = null;
  private _jwksKeys: jose.JWK[] | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    // Ensure keys directory exists
    if (!fs.existsSync(this.keysDir)) {
      fs.mkdirSync(this.keysDir, { recursive: true });
    }

    this.loadMetadata();
    await this.rotateKeys();

    // Set interval for key rotation
    this.rotationTimeout = setInterval(() => {
      void this.rotateKeys();
    }, this.configService.keys.rotationInterval);
  }

  onModuleDestroy() {
    if (this.rotationTimeout) {
      clearInterval(this.rotationTimeout);
    }
  }

  get kid(): string {
    const activeKey = this.metadata.keys.find((key) => key.status === "active");
    if (!activeKey) {
      throw new InternalServerErrorException("No active key");
    }
    return activeKey.kid;
  }

  get privateKey(): jose.CryptoKey {
    if (!this._privateKey) {
      throw new InternalServerErrorException("No private key available");
    }
    return this._privateKey;
  }

  get getKey() {
    // Only rebuild if JWKS changed
    if (!this._getKey || this.jwks.keys !== this._jwksKeys) {
      this._getKey = jose.createLocalJWKSet(this.jwks);
      this._jwksKeys = this.jwks.keys;
      this.logger.debug("JWKS key function rebuilt");
    }
    return this._getKey;
  }

  private async updateJwks(): Promise<void> {
    this.logger.log("Updating JWKS...");

    const keys: jose.JWK[] = [];
    for (const key of this.metadata.keys) {
      if (key.status === "expired") {
        continue;
      }

      const publicKeyPath = path.join(this.keysDir, `${key.kid}.pem`);
      if (!fs.existsSync(publicKeyPath)) {
        this.logger.warn(
          `Missing public key file: ${path.basename(publicKeyPath)}`,
        );
        continue;
      }

      const publicKey = await this.loadPublicKey(publicKeyPath);
      const jwk = await this.exportJwk(publicKey, key.kid);
      keys.push(jwk);
    }
    this.jwks.keys = keys;
    this._getKey = jose.createLocalJWKSet(this.jwks);
    this.logger.log(`JWKS: ${keys.length} key(s) loaded`);
  }

  private async rotateKeys(): Promise<void> {
    const now = Date.now();
    this.logger.log("Rotation started...");

    // Purge expired keys
    this.metadata.keys
      .filter((key) => key.status !== "expired" && key.expiresAt <= now)
      .forEach((key) => {
        this.logger.log(`Expired key: ${key.kid}`);
        key.status = "expired";
        key.removedAt = now;
        if (key.publicKeyPath) {
          fs.unlinkSync(key.publicKeyPath);
          this.logger.debug(
            `File deleted: ${path.basename(key.publicKeyPath)}`,
          );
          key.publicKeyPath = null;
        }
      });

    // Generate a new key pair
    const kid = randomUUID();
    const { privateKey, publicKey } = await jose.generateKeyPair(
      this.configService.keys.alg,
      {
        modulusLength: [
          "PS256",
          "PS384",
          "PS512",
          "RS256",
          "RS384",
          "RS512",
        ].includes(this.configService.keys.alg)
          ? this.configService.keys.modulusLength
          : undefined,
        extractable: false,
      },
    );
    this.logger.log(`Generated key: ${kid}`);

    // Save public key
    const publicKeyPath = this.publicKeyPath(kid);
    await this.savePublicKey(publicKey, publicKeyPath);

    // Deprecate any active key in metadata
    this.metadata.keys
      .filter((key) => key.status === "active")
      .forEach((key) => {
        key.status = "deprecated";
        key.deprecatedAt = now;
        this.logger.log(`Deprecated key: ${key.kid}`);
      });

    // Add new active public key to metadata
    this.metadata.keys.push({
      kid,
      status: "active",
      createdAt: now,
      expiresAt: now + this.configService.keys.expirationTime,
      deprecatedAt: null,
      removedAt: null,
      publicKeyPath,
    });

    // Save metadata
    this.saveMetadata();

    // Update JWKS with metadata
    await this.updateJwks();

    // Replace active private key
    this._privateKey = privateKey;

    this.logger.log("Rotation completed");
  }

  private saveMetadata(): void {
    fs.writeFileSync(this.metadataPath, JSON.stringify(this.metadata));
    this.logger.log("Metadata saved");
  }

  private loadMetadata(): void {
    if (!fs.existsSync(this.metadataPath)) {
      this.logger.log("Metadata not found");
      return;
    }
    this.metadata = metadataSchema.parse(
      JSON.parse(fs.readFileSync(this.metadataPath, "utf8")),
    );
    this.logger.log("Metadata loaded");
  }

  private publicKeyPath(kid: string) {
    return path.join(this.keysDir, `${kid}.pem`);
  }

  private async savePublicKey(
    publicKey: jose.CryptoKey,
    publicKeyPath: string,
  ): Promise<void> {
    const publicKeyPem = await jose.exportSPKI(publicKey);
    fs.writeFileSync(publicKeyPath, publicKeyPem);
    this.logger.debug(`Public key saved to ${path.basename(publicKeyPath)}`);
  }

  private async loadPublicKey(publicKeyPath: string): Promise<jose.CryptoKey> {
    const publicKeyPEM = fs.readFileSync(publicKeyPath, "utf8");
    const publicKey = await jose.importSPKI(
      publicKeyPEM,
      this.configService.keys.alg,
    );
    this.logger.debug(`Public key loaded from ${path.basename(publicKeyPath)}`);
    return publicKey;
  }

  private async exportJwk(
    publicKey: jose.CryptoKey,
    kid: string,
  ): Promise<jose.JWK> {
    const jwk = await jose.exportJWK(publicKey);
    jwk.use = "sig";
    jwk.alg = this.configService.keys.alg;
    jwk.kid = kid;
    return jwk;
  }
}
