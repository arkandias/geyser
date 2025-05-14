import { errorMessage } from "@geyser/shared";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import fs from "fs";
import jose from "jose";
import path from "path";

@Injectable()
export class KeysService {
  private readonly logger = new Logger(KeysService.name);
  private readonly keysDir = path.join(process.cwd(), "keys");
  private readonly privateKeyPath = path.join(this.keysDir, "private.key");
  private readonly publicKeyPath = path.join(this.keysDir, "public.key");
  private _keyPair?: {
    privateKey: jose.CryptoKey;
    publicKey: jose.CryptoKey;
  };
  private _jwk?: jose.JWK;

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
        const privateKeyPEM = fs.readFileSync(this.privateKeyPath, "utf8");
        const publicKeyPEM = fs.readFileSync(this.publicKeyPath, "utf8");

        // Import keys
        this._keyPair = {
          privateKey: await jose.importPKCS8(privateKeyPEM, "RS256"),
          publicKey: await jose.importSPKI(publicKeyPEM, "RS256"),
        };

        this.logger.log("Loaded existing RSA key pair");
        return;
      } catch (error) {
        this.logger.warn(`Failed to load RSA key pair: ${errorMessage(error)}`);
      }
    } else {
      // Generate a new RSA key pair
      const { privateKey, publicKey } = await jose.generateKeyPair("RS256", {
        modulusLength: 2048,
        extractable: true,
      });

      this._keyPair = { privateKey, publicKey };

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
    if (!this._keyPair) {
      this.logger.warn("Failed to initialize JWK: Missing key pair");
      return;
    }

    this._jwk = await jose.exportJWK(this._keyPair.publicKey);
    this._jwk.kid = "key-1";
    this._jwk.use = "sig";
    this._jwk.alg = "RS256";

    this.logger.log("JWK initialized");
  }

  get keyPair(): {
    privateKey: jose.CryptoKey;
    publicKey: jose.CryptoKey;
  } {
    if (!this._keyPair) {
      throw new InternalServerErrorException("No key pair available");
    }
    return this._keyPair;
  }

  get privateKey(): jose.CryptoKey {
    return this.keyPair.privateKey;
  }

  get publicKey(): jose.CryptoKey {
    return this.keyPair.publicKey;
  }

  get jwk(): jose.JWK {
    if (!this._jwk) {
      throw new InternalServerErrorException("JWK not initialized");
    }
    return this._jwk;
  }
}
