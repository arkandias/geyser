import { devtoolsExchange } from "@urql/devtools";
import {
  type AuthConfig,
  type AuthUtilities,
  authExchange,
} from "@urql/exchange-auth";
import {
  type ClientOptions,
  type CombinedError,
  type Operation,
  cacheExchange,
  debugExchange,
  fetchExchange,
} from "@urql/vue";

import { graphqlUrl } from "@/config/environment.ts";
import type { AuthManager } from "@/services/auth.ts";

const authInit =
  (authManager: AuthManager) =>
  (utils: AuthUtilities): Promise<AuthConfig> =>
    Promise.resolve({
      addAuthToOperation(operation: Operation): Operation {
        return utils.appendHeaders(operation, authManager.headers);
      },
      didAuthError(error: CombinedError): boolean {
        const response = error.response as unknown;
        return (
          !!response &&
          typeof response === "object" &&
          "status" in response &&
          response.status === 401
        );
      },
      async refreshAuth(): Promise<void> {
        await authManager.refresh();
      },
      willAuthError(): boolean {
        return authManager.shouldRefresh();
      },
    });

export const makeClientOptions = (authManager: AuthManager): ClientOptions => ({
  url: graphqlUrl,
  exchanges: [
    devtoolsExchange,
    cacheExchange,
    debugExchange,
    authExchange(authInit(authManager)),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include",
  },
});
