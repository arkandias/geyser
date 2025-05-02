import { devtoolsExchange } from "@urql/devtools";
import {
  type ClientOptions,
  cacheExchange,
  debugExchange,
  fetchExchange,
  mapExchange,
} from "@urql/vue";

import { graphqlURL } from "@/config/env.ts";
import type { AuthManager } from "@/services/auth.ts";

export const makeClientOptions = (authManager: AuthManager): ClientOptions => ({
  url: graphqlURL,
  exchanges: [
    devtoolsExchange,
    cacheExchange,
    debugExchange,
    mapExchange({
      async onOperation(operation) {
        await authManager.setup();
        return operation;
      },
    }),
    fetchExchange,
  ],
  fetchOptions: () => ({
    headers: authManager.getHeaders(),
  }),
});
