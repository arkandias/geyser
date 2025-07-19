export const version = import.meta.env.DEV
  ? "dev"
  : (import.meta.env.VITE_BUILD_VERSION ?? null);

export const apiUrl = import.meta.env.VITE_API_URL ?? "";
if (!apiUrl && import.meta.env.MODE !== "test") {
  throw new Error("Missing required environment variable VITE_API_URL");
}

export const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL ?? "";
if (!graphqlUrl && import.meta.env.MODE !== "test") {
  throw new Error("Missing required environment variable VITE_GRAPHQL_URL");
}

export const multiTenant = import.meta.env.VITE_MULTI_TENANT === "true";

export const bypassAuth =
  import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === "true";

export const adminSecret = import.meta.env.DEV
  ? (import.meta.env.VITE_ADMIN_SECRET ?? null)
  : null;
if (bypassAuth && !adminSecret) {
  throw new Error(
    "Missing admin secret to bypass authentication. Set VITE_ADMIN_SECRET environment variable",
  );
}
