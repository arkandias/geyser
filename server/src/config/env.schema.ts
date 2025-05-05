import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  ROOT_URL: z.string(),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

  HASURA_CLAIMS_NAMESPACE: z.string(),

  KEYCLOAK_URL: z.string(),
  KEYCLOAK_REALM: z.string(),
  KEYCLOAK_CLIENT_ID: z.string(),
  KEYCLOAK_STATE_EXPIRATION_TIME_MS: z.number().default(5 * 60 * 1000), // 5m

  JWT_ACCESS_TOKEN_MAX_AGE_MS: z.number().default(60 * 60 * 1000), // 1h
  JWT_REFRESH_TOKEN_MAX_AGE_MS: z.number().default(7 * 24 * 60 * 60 * 1000), // 7d
});

export type Env = z.infer<typeof EnvSchema>;
