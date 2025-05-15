export const version = import.meta.env.DEV
  ? "dev"
  : (import.meta.env.VITE_BUILD_VERSION ?? null);

export const apiURL = import.meta.env.VITE_API_URL
  ? new URL(import.meta.env.VITE_API_URL)
  : new URL("/api", window.location.origin);

export const graphqlURL = import.meta.env.VITE_GRAPHQL_URL
  ? new URL(import.meta.env.VITE_GRAPHQL_URL)
  : new URL("/graphql", window.location.origin);
