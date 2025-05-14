export interface ParsedApiURL {
  url: string;
  secure: boolean;
  origin: string;
}

export interface ParsedDatabaseURL {
  url: string;
  parsed: true;
  protocol: string;
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

export interface NonParsedDatabaseURL {
  url: string;
  parsed: false;
}

export interface OIDCConfig {
  discoveryURL: string;
  clientId: string;
  clientSecret: string;
}

export interface JWTConfig {
  accessTokenMaxAge: number;
  refreshTokenMaxAge: number;
  stateExpirationTime: number;
}
