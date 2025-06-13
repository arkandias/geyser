import { errorMessage } from "@geyser/shared";

export const version = import.meta.env.DEV
  ? "dev"
  : (import.meta.env.VITE_BUILD_VERSION ?? null);

export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? null;

const hostnameMatch = /^([^.]+)\.(.+\..+)$/.exec(window.location.hostname);

export const apiUrl = new URL(
  import.meta.env.VITE_API_URL ??
    (hostnameMatch
      ? `${window.location.protocol}//api.${hostnameMatch[2]}`
      : (() => {
          throw new Error(
            "Cannot determine API URL. Set VITE_API_URL environment variable or access via subdomain with at least 3 parts (e.g., org.example.com)",
          );
        })()),
);

try {
  if (apiUrl.protocol !== "http:" && apiUrl.protocol !== "https:") {
    throw new Error("Protocol must be HTTP or HTTPS");
  }
  if (import.meta.env.PROD && apiUrl.protocol !== "https:") {
    throw new Error("Production environment requires HTTPS");
  }
} catch (error) {
  throw new Error(`Invalid API URL: ${errorMessage(error)}`);
}

export const graphqlUrl = new URL(apiUrl.href.replace(/\/$/, "") + "/graphql");

export const organizationKey =
  import.meta.env.VITE_ORGANIZATION_KEY ??
  hostnameMatch?.[1] ??
  (() => {
    throw new Error(
      "Cannot determine organization key. Set VITE_ORGANIZATION_KEY environment variable or access via subdomain with at least 3 parts (e.g., org.example.com)",
    );
  })();

export const bypassAuth =
  import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === "true";
export const adminSecret = import.meta.env.VITE_ADMIN_SECRET ?? null;
export const orgId = import.meta.env.VITE_ORG_ID
  ? Number.parseInt(import.meta.env.VITE_ORG_ID)
  : null;
export const userId = import.meta.env.VITE_USER_ID
  ? Number.parseInt(import.meta.env.VITE_USER_ID)
  : null;
