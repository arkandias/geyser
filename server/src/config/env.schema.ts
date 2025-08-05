import { z } from "zod";

export const envSchema = z.looseObject({
  API_NODE_ENV: z.enum(["development", "production"]).default("development"),
  API_PORT: z.coerce.number().default(3000),

  API_URL: z.url({ protocol: /^https?$/ }),
  API_ORIGINS: z.string(),
  API_ADMIN_SECRET: z.string(),

  API_DATABASE_URL: z.url(),

  API_GRAPHQL_URL: z.url(),
  API_GRAPHQL_ADMIN_SECRET: z.string(),
  API_GRAPHQL_TIMEOUT_MS: z.number().default(30 * 1000), // 30s

  API_OIDC_DISCOVERY_URL: z.string(),
  API_OIDC_CLIENT_ID: z.string(),
  API_OIDC_CLIENT_SECRET: z.string(),

  API_JWT_ACCESS_TOKEN_MAX_AGE_MS: z.number().default(60 * 60 * 1000), // 1h
  API_JWT_REFRESH_TOKEN_MAX_AGE_MS: z
    .number()
    .default(14 * 24 * 60 * 60 * 1000), // 14d
  API_JWT_STATE_EXPIRATION_TIME_MS: z.number().default(5 * 60 * 1000), // 5m

  API_KEYS_ALGORITHM: z
    .literal([
      "Ed25519",
      "EdDSA",
      "ES256",
      "ES384",
      "ES512",
      "PS256",
      "PS384",
      "PS512",
      "RS256",
      "RS384",
      "RS512",
    ])
    .default("EdDSA"),
  API_KEYS_MODULUS_LENGTH_RSA: z.number().default(2048),
  API_KEYS_ROTATION_INTERVAL_MS: z.number().default(7 * 24 * 60 * 60 * 1000), // 7d
  API_KEYS_EXPIRATION_TIME_MS: z.number().default(28 * 24 * 60 * 60 * 1000), // 28d
});

export type Env = z.infer<typeof envSchema>;
