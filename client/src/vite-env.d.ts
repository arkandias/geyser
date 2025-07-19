/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_BUILD_VERSION?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_GRAPHQL_URL?: string;
  readonly VITE_MULTI_TENANT?: string;
  readonly VITE_BYPASS_AUTH?: string;
  readonly VITE_ADMIN_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
