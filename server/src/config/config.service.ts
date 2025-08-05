import { Injectable, Logger } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import type { Env } from "./env.schema";

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  readonly nodeEnv: "development" | "production";
  readonly port: number;
  readonly api: {
    url: URL;
    allowedOrigins: RegExp[];
    adminSecret: string;
  };
  readonly databaseUrl: URL;
  readonly graphql: {
    url: URL;
    adminSecret: string;
    timeout: number;
  };
  readonly oidc: {
    discoveryUrl: URL;
    clientId: string;
    clientSecret: string;
  };
  readonly jwt: {
    accessTokenMaxAge: number;
    refreshTokenMaxAge: number;
    stateExpirationTime: number;
  };
  readonly keys: {
    alg:
      | "Ed25519"
      | "EdDSA"
      | "ES256"
      | "ES384"
      | "ES512"
      | "PS256"
      | "PS384"
      | "PS512"
      | "RS256"
      | "RS384"
      | "RS512";
    modulusLength: number;
    rotationInterval: number;
    expirationTime: number;
  };

  constructor(private configService: NestConfigService<Env, true>) {
    this.nodeEnv = this.configService.getOrThrow<"development" | "production">(
      "API_NODE_ENV",
    );
    this.logger.log(`Node environment: ${this.nodeEnv}`);

    this.port = this.configService.getOrThrow<number>("API_PORT");
    this.logger.log(`Port: ${this.port}`);

    this.api = {
      url: new URL(this.configService.getOrThrow<string>("API_URL")),
      allowedOrigins: this.configService
        .getOrThrow<string>("API_ORIGINS")
        .split(",")
        .map((origin) => {
          const pattern = origin
            .trim()
            .replace(/[.+^${}()|[\]\\]/g, "\\$&")
            .replace(/\*/g, ".*");
          return new RegExp(`^${pattern}$`);
        }),
      adminSecret: this.configService.getOrThrow<string>("API_ADMIN_SECRET"),
    };
    if (this.nodeEnv === "production" && this.api.url.protocol !== "https:") {
      throw new Error("Production environment requires HTTPS");
    }
    this.logger.log(`API URL: ${this.api.url.href}`);
    this.logger.log(`Allowed origins: ${this.api.allowedOrigins.join(", ")}`);

    this.databaseUrl = new URL(
      this.configService.getOrThrow<string>("API_DATABASE_URL"),
    );
    this.logger.log(`Database URL: ${this.databaseUrl.href}`);

    this.graphql = {
      url: new URL(this.configService.getOrThrow<string>("API_GRAPHQL_URL")),
      adminSecret: this.configService.getOrThrow<string>(
        "API_GRAPHQL_ADMIN_SECRET",
      ),
      timeout: this.configService.getOrThrow<number>("API_GRAPHQL_TIMEOUT_MS"),
    };

    this.oidc = {
      discoveryUrl: new URL(
        this.configService.getOrThrow<string>("API_OIDC_DISCOVERY_URL"),
      ),
      clientId: this.configService.getOrThrow<string>("API_OIDC_CLIENT_ID"),
      clientSecret: this.configService.getOrThrow<string>(
        "API_OIDC_CLIENT_SECRET",
      ),
    };
    this.logger.log("OIDC configuration:");
    this.logger.log(`- Discovery URL: ${this.oidc.discoveryUrl.href}`);
    this.logger.log(`- Client ID: ${this.oidc.clientId}`);

    this.jwt = {
      accessTokenMaxAge: this.configService.getOrThrow<number>(
        "API_JWT_ACCESS_TOKEN_MAX_AGE_MS",
      ),
      refreshTokenMaxAge: this.configService.getOrThrow<number>(
        "API_JWT_REFRESH_TOKEN_MAX_AGE_MS",
      ),
      stateExpirationTime: this.configService.getOrThrow<number>(
        "API_JWT_STATE_EXPIRATION_TIME_MS",
      ),
    };
    this.logger.log("JWT configuration:");
    this.logger.log(
      `- Access token max age: ${this.jwt.accessTokenMaxAge}ms (${this.formatDuration(this.jwt.accessTokenMaxAge)})`,
    );
    this.logger.log(
      `- Refresh token max age: ${this.jwt.refreshTokenMaxAge}ms (${this.formatDuration(this.jwt.refreshTokenMaxAge)})`,
    );
    this.logger.log(
      `- State expiration time: ${this.jwt.stateExpirationTime}ms (${this.formatDuration(this.jwt.stateExpirationTime)})`,
    );

    this.keys = {
      alg: this.configService.getOrThrow<
        | "Ed25519"
        | "EdDSA"
        | "ES256"
        | "ES384"
        | "ES512"
        | "PS256"
        | "PS384"
        | "PS512"
        | "RS256"
        | "RS384"
        | "RS512"
      >("API_KEYS_ALGORITHM"),
      modulusLength: this.configService.getOrThrow<number>(
        "API_KEYS_MODULUS_LENGTH_RSA",
      ),
      rotationInterval: this.configService.getOrThrow<number>(
        "API_KEYS_ROTATION_INTERVAL_MS",
      ),
      expirationTime: this.configService.getOrThrow<number>(
        "API_KEYS_EXPIRATION_TIME_MS",
      ),
    };
    this.logger.log("Keys configuration:");
    this.logger.log(`- Algorithm: ${this.keys.alg}`);
    if (
      ["PS256", "PS384", "PS512", "RS256", "RS384", "RS512"].includes(
        this.keys.alg,
      )
    ) {
      this.logger.log(`- Modulus length: ${this.keys.modulusLength}`);
      if (this.keys.modulusLength < 2048) {
        this.logger.warn(
          "RSA modulus length should be at least 2048 for security",
        );
      }
    }
    this.logger.log(
      `- Rotation interval: ${this.keys.rotationInterval}ms (${this.formatDuration(this.keys.rotationInterval)})`,
    );
    this.logger.log(
      `- Expiration time: ${this.keys.expirationTime}ms (${this.formatDuration(this.keys.expirationTime)})`,
    );

    this.validate();
  }

  private validate(): void {
    if (this.jwt.refreshTokenMaxAge <= this.jwt.accessTokenMaxAge) {
      this.logger.warn(
        "JWT refresh token max age should be greater than access token max age",
      );
    }
    if (this.keys.rotationInterval < 60000) {
      this.logger.warn("Keys rotation interval is very short (< 1 minute)");
    }
    if (this.keys.rotationInterval > 2147483647) {
      this.logger.warn(
        "Keys rotation interval exceeds setTimeout limit (2147483647 ms / ~24.8 days)",
      );
    }
    if (this.keys.expirationTime < this.keys.rotationInterval * 2) {
      this.logger.warn(
        "Keys expiration time should be at least 2x rotation interval for safe overlap",
      );
    }
    if (this.keys.expirationTime <= this.jwt.refreshTokenMaxAge) {
      this.logger.warn(
        "Keys expiration time should be longer than refresh token max age",
      );
    }
  }

  private formatDuration(ms: number): string {
    const days = Math.round(ms / (24 * 60 * 60 * 1000));
    const hours = Math.round(ms / (60 * 60 * 1000));
    const minutes = Math.round(ms / (60 * 1000));

    if (days >= 1) return `${days}d`;
    if (hours >= 1) return `${hours}h`;
    if (minutes >= 1) return `${minutes}min`;
    return `${ms}ms`;
  }
}
