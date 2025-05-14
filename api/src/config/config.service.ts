import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import { Env } from "./env.schema";

@Injectable()
export class ConfigService {
  private readonly apiURL: string;
  private readonly apiOrigin: string;
  private readonly apiIsSecure: boolean;

  constructor(private configService: NestConfigService<Env, true>) {
    this.validateEnvironment();

    this.apiURL = this.configService
      .getOrThrow<string>("API_URL")
      .replace(/\/$/, "");

    this.apiIsSecure = this.apiURL.startsWith("https://");

    const match = /^(https?:\/\/[^/]+)/.exec(this.apiURL)?.[1];
    if (!match) {
      throw new Error("Invalid API_URL: Cannot extract origin");
    }
    this.apiOrigin = match;
  }

  validateEnvironment() {
    if (this.nodeEnv === "production" && !this.api.isSecure) {
      throw new Error("Production environment requires HTTPS (secure API_URL)");
    }
  }

  get nodeEnv(): "development" | "production" {
    return this.configService.getOrThrow<"development" | "production">(
      "NODE_ENV",
    );
  }

  get port() {
    return this.configService.getOrThrow<number>("PORT");
  }

  get api() {
    return {
      url: this.apiURL,
      isSecure: this.apiIsSecure,
      origin: this.apiOrigin,
    };
  }

  get databaseURL() {
    return this.configService.getOrThrow<string>("API_DATABASE_URL");
  }

  get oidc() {
    return {
      discoveryURL: this.configService.getOrThrow<string>(
        "API_OIDC_DISCOVERY_URL",
      ),
      clientId: this.configService.getOrThrow<string>("API_OIDC_CLIENT_ID"),
      clientSecret: this.configService.getOrThrow<string>(
        "API_OIDC_CLIENT_SECRET",
      ),
    };
  }

  get jwt() {
    return {
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
  }
}
