import { Injectable, Logger } from "@nestjs/common";
import fs from "fs";
import jose from "jose";
import path from "path";

@Injectable()
export class KeysService {
  private readonly logger = new Logger(KeysService.name);
  private keyPair?: {
    privateKey: jose.CryptoKey;
    publicKey: jose.CryptoKey;
  };
  private jwk?: jose.JWK;
  private readonly keysDir = path.join(process.cwd(), "keys");
  private readonly privateKeyPath = path.join(this.keysDir, "private.key");
  private readonly publicKeyPath = path.join(this.keysDir, "public.key");

  async init(): Promise<void> {
    // Ensure keys directory exists
    if (!fs.existsSync(this.keysDir)) {
      fs.mkdirSync(this.keysDir, { recursive: true });
    }

    await this.initializeKeyPair();
    await this.initializeJWK();
  }

  private async initializeKeyPair(): Promise<void> {
    if (
      fs.existsSync(this.privateKeyPath) &&
      fs.existsSync(this.publicKeyPath)
    ) {
      try {
        // Read existing keys
        const privateKeyPem = fs.readFileSync(this.privateKeyPath, "utf8");
        const publicKeyPem = fs.readFileSync(this.publicKeyPath, "utf8");

        // Import keys
        this.keyPair = {
          privateKey: await jose.importPKCS8(privateKeyPem, "RS256"),
          publicKey: await jose.importSPKI(publicKeyPem, "RS256"),
        };

        this.logger.log("Loaded existing RSA key pair");
        return;
      } catch (error) {
        this.logger.warn(`Failed to load RSA key pair: ${error}`);
      }
    } else {
      // Generate a new RSA key pair
      const { privateKey, publicKey } = await jose.generateKeyPair("RS256", {
        modulusLength: 2048,
        extractable: true,
      });

      this.keyPair = { privateKey, publicKey };

      // Export the keys in PEM format for storage
      const privateKeyPem = await jose.exportPKCS8(privateKey);
      const publicKeyPem = await jose.exportSPKI(publicKey);

      // Save keys to files
      fs.writeFileSync(this.privateKeyPath, privateKeyPem);
      fs.writeFileSync(this.publicKeyPath, publicKeyPem);

      this.logger.log("Generated a new RSA key pair");
    }
  }

  async initializeJWK(): Promise<void> {
    if (!this.keyPair) {
      this.logger.warn("Failed to initialize JWK: Missing key pair");
      return;
    }

    this.jwk = await jose.exportJWK(this.keyPair.publicKey);
    this.jwk.kid = "key-1";
    this.jwk.use = "sig";
    this.jwk.alg = "RS256";
  }

  getKeyPair(): {
    privateKey: jose.CryptoKey;
    publicKey: jose.CryptoKey;
  } {
    if (!this.keyPair) {
      throw new Error("No key pair available");
    }
    return this.keyPair;
  }

  getPrivateKey(): jose.CryptoKey {
    return this.getKeyPair().privateKey;
  }

  getPublicKey(): jose.CryptoKey {
    return this.getKeyPair().publicKey;
  }

  getJWK(): jose.JWK {
    if (!this.jwk) {
      throw new Error("JWK not initialized");
    }
    return this.jwk;
  }
}
