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

  get rootURL() {
    return this.configService.getOrThrow<string>("ROOT_URL");
  }

  get stateExpirationTime() {
    return this.configService.getOrThrow<number>("STATE_EXPIRATION_TIME_MS");
  }

  get database() {
    return {
      host: this.configService.getOrThrow<string>("DATABASE_HOST"),
      port: this.configService.getOrThrow<number>("DATABASE_PORT"),
      username: this.configService.getOrThrow<string>("DATABASE_USER"),
      password: this.configService.getOrThrow<string>("DATABASE_PASSWORD"),
      database: this.configService.getOrThrow<string>("DATABASE_NAME"),
    };
  }

  get hasura() {
    return {
      claimsNamespace: this.configService.getOrThrow<string>(
        "HASURA_CLAIMS_NAMESPACE",
      ),
    };
  }

  get keycloak() {
    const rootURL = this.configService.getOrThrow<string>("KEYCLOAK_URL");
    const realm = this.configService.getOrThrow<string>("KEYCLOAK_REALM");
    return {
      rootURL,
      realm,
      authURL: `${rootURL}/realms/${realm}/protocol/openid-connect/auth`,
      certsURL: `${rootURL}/realms/${realm}/protocol/openid-connect/certs`,
      introspectURL: `${rootURL}/realms/${realm}/protocol/openid-connect/introspect`,
      logoutURL: `${rootURL}/realms/${realm}/protocol/openid-connect/logout`,
      tokenURL: `${rootURL}/realms/${realm}/protocol/openid-connect/token`,
      userinfoURL: `${rootURL}/realms/${realm}/protocol/openid-connect/userinfo`,
      clientId: this.configService.getOrThrow<string>("KEYCLOAK_CLIENT_ID"),
      clientSecret: this.configService.getOrThrow<string>(
        "KEYCLOAK_CLIENT_SECRET",
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
    };
  }
}
