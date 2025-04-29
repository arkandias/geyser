/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
  readonly VITE_BUILD_VERSION?: string;
  readonly VITE_GRAPHQL_URL?: string;
  readonly VITE_AUTH_URL?: string;
  readonly VITE_BYPASS_AUTH?: string;
  readonly VITE_HASURA_ADMIN_SECRET?: string;
  readonly VITE_HASURA_USER_ID?: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
