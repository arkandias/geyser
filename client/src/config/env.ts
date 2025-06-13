export const version = import.meta.env.DEV
  ? "dev"
  : (import.meta.env.VITE_BUILD_VERSION ?? null);

export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? null;

const hostname =
  import.meta.env.MODE === "test"
    ? "geyser.example.com"
    : window.location.hostname;
const protocol =
  import.meta.env.MODE === "test" ? "https:" : window.location.protocol;
const hostnameMatch = /^([^.]+)\.(.+\..+)$/.exec(hostname);

export const apiUrl = new URL(
  import.meta.env.VITE_API_URL ??
    (hostnameMatch
      ? `${protocol}//api.${hostnameMatch[2]}`
      : (() => {
          throw new Error(
            "Cannot determine API URL. Set VITE_API_URL environment variable or access via subdomain with at least 3 parts (e.g., org.example.com)",
          );
        })()),
);

if (apiUrl.protocol !== "http:" && apiUrl.protocol !== "https:") {
  throw new Error("Invalid API URL: Protocol must be HTTP or HTTPS");
}
if (import.meta.env.PROD && apiUrl.protocol !== "https:") {
  throw new Error("Invalid API URL: Production environment requires HTTPS");
}

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
