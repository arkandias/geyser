export const version = import.meta.env.DEV
  ? "dev"
  : (import.meta.env.VITE_BUILD_VERSION ?? null);

export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? null;

if (!import.meta.env.VITE_API_URL) {
  throw new Error("Missing VITE_API_URL environment variable");
}

export const apiUrl = new URL(import.meta.env.VITE_API_URL);

export const graphqlUrl = new URL(apiUrl.href.replace(/\/$/, "") + "/graphql");

export const bypassAuth =
  import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === "true";

export const adminSecret = import.meta.env.VITE_ADMIN_SECRET ?? null;

export const orgId = import.meta.env.VITE_ORG_ID
  ? Number.parseInt(import.meta.env.VITE_ORG_ID)
  : null;

export const userId = import.meta.env.VITE_USER_ID
  ? Number.parseInt(import.meta.env.VITE_USER_ID)
  : null;
