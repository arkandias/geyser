import { Injectable, Logger } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import { Env } from "./env.dto";

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  readonly nodeEnv: string;
  readonly port: number;
  readonly apiUrl: URL;
  readonly databaseUrl: URL;
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
      "NODE_ENV",
    );
    this.logger.log(`Node environment: ${this.nodeEnv}`);

    this.port = this.configService.getOrThrow<number>("PORT");
    this.logger.log(`Port: ${this.port}`);

    this.apiUrl = new URL(this.configService.getOrThrow<string>("API_URL"));
    this.logger.log(`API URL: ${this.apiUrl.href}`);

    this.databaseUrl = new URL(
      this.configService.getOrThrow<string>("API_DATABASE_URL"),
    );
    this.logger.log(`Database URL: ${this.databaseUrl.href}`);

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
        "JWT_ACCESS_TOKEN_MAX_AGE_MS",
      ),
      refreshTokenMaxAge: this.configService.getOrThrow<number>(
        "JWT_REFRESH_TOKEN_MAX_AGE_MS",
      ),
      stateExpirationTime: this.configService.getOrThrow<number>(
        "JWT_STATE_EXPIRATION_TIME_MS",
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

    this.validateEnvironment();
  }

  validateEnvironment() {
    if (this.nodeEnv === "production" && this.apiUrl.protocol !== "https:") {
      throw new Error("Invalid API_URL: Production environment requires HTTPS");
    }
  }
}
