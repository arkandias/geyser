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
        .map((origin) => new RegExp(`^${origin.trim()}$`)),
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
      timeout: this.configService.getOrThrow<number>("API_GRAPHQL_TIMEOUT"),
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
      `- Access token max age (ms): ${this.jwt.accessTokenMaxAge}`,
    );
    this.logger.log(
      `- Refresh token max age (ms): ${this.jwt.refreshTokenMaxAge}`,
    );
    this.logger.log(
      `- State expiration time (ms): ${this.jwt.stateExpirationTime}`,
    );
  }
}
