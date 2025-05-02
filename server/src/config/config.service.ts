import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import { Env } from "./env.schema";

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService<Env, true>) {}

  get nodeEnv(): string {
    // todo: why not inferred?
    return this.configService.getOrThrow<string>("NODE_ENV");
  }

  get port() {
    return this.configService.getOrThrow<number>("PORT");
  }

  get url() {
    return {
      root: this.configService.getOrThrow<string>("ROOT_URL"),
      prefix: {
        keycloak: this.configService.getOrThrow<string>("KEYCLOAK_PREFIX"),
        api: this.configService.getOrThrow<string>("API_PREFIX"),
      },
    };
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

  get keycloak() {
    return {
      url: this.configService.getOrThrow<string>("KEYCLOAK_URL"),
      realm: this.configService.getOrThrow<string>("KEYCLOAK_REALM"),
      clientId: this.configService.getOrThrow<string>("KEYCLOAK_CLIENT_ID"),
    };
  }
}
