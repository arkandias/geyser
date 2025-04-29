export const version = import.meta.env.DEV
  ? "dev"
  : (import.meta.env.VITE_BUILD_VERSION ?? null);

export const graphqlURL = import.meta.env.VITE_GRAPHQL_URL ?? "";
export const authURL = import.meta.env.VITE_AUTH_URL ?? "";
export const hasuraAdminSecret = import.meta.env.VITE_HASURA_ADMIN_SECRET ?? "";
export const hasuraUserId = import.meta.env.VITE_HASURA_USER_ID ?? "";
export const bypassAuth =
  import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === "true";

if (!graphqlURL) {
  throw new Error("Missing VITE_GRAPHQL_URL environment variable");
}

if (!authURL && !bypassAuth) {
  throw new Error(
    "Missing VITE_AUTH_URL environment variable. " +
      "In development, you can use VITE_BYPASS_AUTH=true instead.",
  );
}

if (bypassAuth && !hasuraAdminSecret) {
  throw new Error(
    "VITE_HASURA_ADMIN_SECRET is required when using VITE_BYPASS_AUTH=true",
  );
}

if (bypassAuth && !hasuraUserId) {
  throw new Error(
    "VITE_HASURA_USER_ID is required when using VITE_BYPASS_AUTH=true",
  );
}
