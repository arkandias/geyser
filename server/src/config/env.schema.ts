import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  ROOT_URL: z.string(),
  KEYCLOAK_PREFIX: z.string().default("/auth"),
  API_PREFIX: z.string().default("/api"),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

  KEYCLOAK_URL: z.string(),
  KEYCLOAK_REALM: z.string(),
  KEYCLOAK_CLIENT_ID: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
