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

import { graphqlURL } from "@/config/env.ts";
import { RoleTypeEnum } from "@/gql/graphql.ts";
import type { AuthManager } from "@/services/auth.ts";

const roleToHeaderMap = {
  [RoleTypeEnum.Admin]: "admin",
  [RoleTypeEnum.Commissioner]: "commissioner",
  [RoleTypeEnum.Teacher]: "teacher",
} as const;

const authInit =
  (authManager: AuthManager) =>
  (utils: AuthUtilities): Promise<AuthConfig> =>
    Promise.resolve({
      addAuthToOperation(operation: Operation): Operation {
        const role = authManager.getActiveRole();
        if (role) {
          utils.appendHeaders(operation, {
            "X-Hasura-Role": roleToHeaderMap[role],
          });
        }
        return operation;
      },
      didAuthError(error: CombinedError): boolean {
        return error.graphQLErrors.some((e) => {
          switch (e.extensions["code"]) {
            case "invalid-headers":
            case "invalid-jwt":
            case "jwt-invalid-claims":
            case "jwt-missing-role-claims":
            case "access-denied":
              return true;

            default:
              return false;
          }
        });
      },
      async refreshAuth(): Promise<void> {
        await authManager.refresh();
      },
      willAuthError(): boolean {
        return authManager.shouldRefresh();
      },
    });

export const makeClientOptions = (authManager: AuthManager): ClientOptions => ({
  url: graphqlURL,
  exchanges: [
    devtoolsExchange,
    cacheExchange,
    debugExchange,
    authExchange(authInit(authManager)),
    fetchExchange,
  ],
});
