export const version = import.meta.env.DEV
  ? "dev"
  : (import.meta.env.VITE_BUILD_VERSION ?? null);

export const keycloakURL = import.meta.env.VITE_KEYCLOAK_URL ?? "";
export const apiURL = import.meta.env.VITE_API_URL ?? "";
export const graphqlURL = import.meta.env.VITE_GRAPHQL_URL ?? "";

export const bypassAuth =
  import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === "true";
export const hasuraUserId = import.meta.env.VITE_HASURA_USER_ID ?? "";
export const hasuraAdminSecret = import.meta.env.VITE_HASURA_ADMIN_SECRET ?? "";

if (!graphqlURL) {
  throw new Error("Missing VITE_GRAPHQL_URL environment variable");
}

if (bypassAuth) {
  if (!hasuraAdminSecret) {
    throw new Error(
      "VITE_HASURA_ADMIN_SECRET is required when using VITE_BYPASS_AUTH=true",
    );
  }
  if (!hasuraUserId) {
    throw new Error(
      "VITE_HASURA_USER_ID is required when using VITE_BYPASS_AUTH=true",
    );
  }
} else {
  if (!keycloakURL) {
    throw new Error(
      "Missing VITE_AUTH_URL environment variable. " +
        "In development, you can use VITE_BYPASS_AUTH=true instead.",
    );
  }
  if (!apiURL) {
    throw new Error(
      "Missing VITE_API_URL environment variable. " +
        "In development, you can use VITE_BYPASS_AUTH=true instead.",
    );
  }
}
