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

export const organizationKey = import.meta.env.VITE_ORGANIZATION_KEY ?? null;

type BypassAuth = {
  adminSecret: string;
  orgId: number;
  userId: number;
};

export const bypassAuth: BypassAuth | null =
  import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === "true"
    ? {
        adminSecret: import.meta.env.VITE_ADMIN_SECRET
          ? import.meta.env.VITE_ADMIN_SECRET
          : (() => {
              throw new Error(
                "Missing admin secret to bypass authentication. Set VITE_ADMIN_SECRET environment variable",
              );
            })(),
        orgId: import.meta.env.VITE_ORG_ID
          ? Number.parseInt(import.meta.env.VITE_ORG_ID)
          : (() => {
              throw new Error(
                "Missing organization id to bypass authentication. Set VITE_ORG_ID environment variable",
              );
            })(),
        userId: import.meta.env.VITE_USER_ID
          ? Number.parseInt(import.meta.env.VITE_USER_ID)
          : (() => {
              throw new Error(
                "Missing user id to bypass authentication. Set VITE_USER_ID environment variable",
              );
            })(),
      }
    : null;
