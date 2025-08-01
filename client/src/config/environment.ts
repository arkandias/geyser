import {
  axiosErrorMessage,
  errorMessage,
  zodErrorMessage,
} from "@geyser/shared";
import axios from "axios";
import { z } from "zod";

const envSchema = z.looseObject({
  VITE_BUILD_VERSION: z.string().optional(),
  VITE_API_URL: z.string().optional(),
  VITE_GRAPHQL_URL: z.string().optional(),
  VITE_TENANCY_MODE: z.string().optional(),
  VITE_BASE_DOMAIN: z.string().optional(),
  VITE_ORGANIZATION_KEY: z.string().optional(),
  VITE_BYPASS_AUTH: z.string().optional(),
  VITE_ADMIN_SECRET: z.string().optional(),
});
export type Env = z.infer<typeof envSchema>;

// Import runtime configuration
let runtimeEnv: Env = {};
try {
  const response = await axios.get("/config.json");
  runtimeEnv = envSchema.parse(response.data);
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(`Invalid config.json: ${zodErrorMessage(error)}`);
  } else {
    const message = axios.isAxiosError(error)
      ? axiosErrorMessage(error)
      : errorMessage(error);
    console.warn(`Could not get config.json: ${message}`);
  }
}

// Merge build environment and runtime environment
const env = envSchema.parse({
  ...import.meta.env,
  ...runtimeEnv,
});

// Environment validation

export const version = import.meta.env.DEV
  ? "dev"
  : (env.VITE_BUILD_VERSION ?? null);

export const apiUrl = env.VITE_API_URL ?? "";
if (!apiUrl) {
  throw new Error("Missing required environment variable VITE_API_URL");
}
export const graphqlUrl = env.VITE_GRAPHQL_URL ?? "";
if (!graphqlUrl) {
  throw new Error("Missing required environment variable VITE_GRAPHQL_URL");
}

export const multiTenant = env.VITE_TENANCY_MODE === "multi";
export const baseDomain = env.VITE_BASE_DOMAIN ?? "";
if (multiTenant && !baseDomain) {
  throw new Error(
    "Missing base domain to enable multi-tenant mode. Set VITE_BASE_DOMAIN environment variable",
  );
}
export const organizationKey = env.VITE_ORGANIZATION_KEY ?? null;

export const bypassAuth =
  import.meta.env.DEV && env.VITE_BYPASS_AUTH === "true";
export const adminSecret = import.meta.env.DEV
  ? (env.VITE_ADMIN_SECRET ?? null)
  : null;
if (bypassAuth && !adminSecret) {
  throw new Error(
    "Missing admin secret to bypass authentication. Set VITE_ADMIN_SECRET environment variable",
  );
}

export default {
  version,
  apiUrl,
  graphqlUrl,
  multiTenant,
  baseDomain,
  organizationKey,
  bypassAuth,
  adminSecret,
};
