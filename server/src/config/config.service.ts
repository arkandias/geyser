import { Injectable, Logger } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import {
  JWTConfig,
  NonParsedDatabaseUrl,
  OIDCConfig,
  ParsedApiUrl,
  ParsedDatabaseUrl,
} from "./config.interfaces";
import { Env } from "./envSchema";

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  readonly nodeEnv: string;
  readonly port: number;
  readonly api: ParsedApiUrl;
  readonly database: ParsedDatabaseUrl | NonParsedDatabaseUrl;
  readonly oidc: OIDCConfig;
  readonly jwt: JWTConfig;

  constructor(private configService: NestConfigService<Env, true>) {
    this.nodeEnv = this.parseNodeEnv();
    this.port = this.parsePort();
    this.api = this.parseApiUrl();
    this.database = this.parseDatabaseUrl();
    this.oidc = this.parseOIDCConfig();
    this.jwt = this.parseJWTConfig();
    this.validateEnvironment();
  }

  validateEnvironment() {
    if (this.nodeEnv === "production" && !this.api.secure) {
      throw new Error("Invalid API_URL: Production environment requires HTTPS");
    }
  }

  parseNodeEnv(): "development" | "production" {
    const nodeEnv = this.configService.getOrThrow<"development" | "production">(
      "NODE_ENV",
    );
    this.logger.log(`Node environment: ${nodeEnv}`);
    return nodeEnv;
  }

  parsePort(): number {
    const port = this.configService.getOrThrow<number>("PORT");
    this.logger.log(`Port: ${port}`);
    return port;
  }

  parseApiUrl(): ParsedApiUrl {
    let url = this.configService.getOrThrow<string>("API_URL");
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
      this.logger.warn("Invalid API_URL: Trailing slash removed");
    }

    const secure = url.startsWith("https://");

    const origin = /^(https?:\/\/[^/]+)/.exec(url)?.[1];
    if (!origin) {
      throw new Error("Invalid API_URL: Failed to extract origin");
    }

    this.logger.log(`API URL: ${url} (origin: ${origin}, secure: ${secure})`);

    return { url, secure, origin };
  }

  parseDatabaseUrl(): ParsedDatabaseUrl | NonParsedDatabaseUrl {
    const url = this.configService.getOrThrow<string>("API_DATABASE_URL");
    const matches =
      /^([a-z-]+):\/\/([^:@]+):([^:@]*)@([a-z]+):(\d+)\/(.+)$/.exec(url);

    if (!matches || matches.length < 7) {
      this.logger.warn("Could not parse DATABASE_URL");
      return { url, parsed: false };
    }

    const [
      ,
      protocol = "",
      username = "",
      password = "",
      host = "",
      port = "",
      database = "",
    ] = matches;

    this.logger.log("Database configuration:");
    this.logger.log(`- protocol: ${protocol}`);
    this.logger.log(`- host: ${host}`);
    this.logger.log(`- port: ${port}`);
    this.logger.log(`- database: ${database}`);
    this.logger.log(`- username: ${username}`);

    return {
      url,
      parsed: true,
      protocol,
      username,
      password,
      host,
      port: Number(port),
      database,
    };
  }

  parseOIDCConfig(): OIDCConfig {
    const discoveryUrl = this.configService.getOrThrow<string>(
      "API_OIDC_DISCOVERY_URL",
    );
    const clientId =
      this.configService.getOrThrow<string>("API_OIDC_CLIENT_ID");
    const clientSecret = this.configService.getOrThrow<string>(
      "API_OIDC_CLIENT_SECRET",
    );

    this.logger.log("OIDC configuration:");
    this.logger.log(`- Discovery URL: ${discoveryUrl}`);
    this.logger.log(`- Client ID: ${clientId}`);

    return {
      discoveryUrl: discoveryUrl,
      clientId,
      clientSecret,
    };
  }

  parseJWTConfig(): JWTConfig {
    const accessTokenMaxAge = this.configService.getOrThrow<number>(
      "JWT_ACCESS_TOKEN_MAX_AGE_MS",
    );
    const refreshTokenMaxAge = this.configService.getOrThrow<number>(
      "JWT_REFRESH_TOKEN_MAX_AGE_MS",
    );
    const stateExpirationTime = this.configService.getOrThrow<number>(
      "JWT_STATE_EXPIRATION_TIME_MS",
    );

    this.logger.log("JWT configuration:");
    this.logger.log(`- Access token max age (ms): ${accessTokenMaxAge}`);
    this.logger.log(`- Refresh token max age (ms): ${refreshTokenMaxAge}`);
    this.logger.log(`- State expiration time (ms): ${stateExpirationTime}`);

    return {
      accessTokenMaxAge,
      refreshTokenMaxAge,
      stateExpirationTime,
    };
  }
}
