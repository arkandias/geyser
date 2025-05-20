export interface ParsedApiUrl {
  url: string;
  secure: boolean;
  origin: string;
}

export interface ParsedDatabaseUrl {
  url: string;
  parsed: true;
  protocol: string;
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

export interface NonParsedDatabaseUrl {
  url: string;
  parsed: false;
}

export interface OIDCConfig {
  discoveryUrl: string;
  clientId: string;
  clientSecret: string;
}

export interface JWTConfig {
  accessTokenMaxAge: number;
  refreshTokenMaxAge: number;
  stateExpirationTime: number;
}
