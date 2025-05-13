import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import { Env } from "./env.schema";

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService<Env, true>) {}

  get nodeEnv(): "development" | "production" | "test" {
    return this.configService.getOrThrow<"development" | "production" | "test">(
      "NODE_ENV",
    );
  }

  get port() {
    return this.configService.getOrThrow<number>("PORT");
  }

  get apiURL() {
    return this.configService.getOrThrow<string>("API_URL").replace(/\/$/, "");
  }

  get databaseURL() {
    return this.configService.getOrThrow<string>("API_DATABASE_URL");
  }

  get oidc() {
    return {
      issuerURL: this.configService.getOrThrow<string>("API_OIDC_ISSUER_URL"),
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
