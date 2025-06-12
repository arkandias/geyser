export const version = import.meta.env.DEV
  ? "dev"
  : (import.meta.env.VITE_BUILD_VERSION ?? null);

export const apiUrl =
  import.meta.env.VITE_API_URL ??
  `${window.location.protocol}//api.${window.location.hostname.replace(/^[^.]+\./, "")}`;

export const graphqlUrl = apiUrl.replace(/\/$/, "") + "/graphql";

export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? null;
