import { devtoolsExchange } from "@urql/devtools";
import {
  type ClientOptions,
  cacheExchange,
  debugExchange,
  fetchExchange,
  mapExchange,
} from "@urql/vue";

import { graphqlURL } from "@/config/env.ts";
import { HASURA_ROLES, type HasuraRole } from "@/config/hasura-roles.ts";
import { RoleTypeEnum } from "@/gql/graphql.ts";
import { getAuthHeader, refreshToken } from "@/services/keycloak.ts";

const roleHeader: { "X-Hasura-Role"?: HasuraRole } = {};

export const tmp = { token: "" };

const roleToHeaderMap = {
  [RoleTypeEnum.Admin]: HASURA_ROLES.ADMIN,
  [RoleTypeEnum.Commissioner]: HASURA_ROLES.COMMISSIONER,
  [RoleTypeEnum.Teacher]: HASURA_ROLES.TEACHER,
} as const;

export const setRoleHeader = (role: RoleTypeEnum) => {
  roleHeader["X-Hasura-Role"] = "admin";
};

export const clientOptions: ClientOptions = {
  url: graphqlURL,
  exchanges: [
    devtoolsExchange,
    cacheExchange,
    debugExchange,
    // mapExchange({
    //   async onOperation(operation) {
    //     await refreshToken();
    //     return operation;
    //   },
    // }),
    fetchExchange,
  ],
  // fetchOptions: () => ({
  //   headers: {
  // ...roleHeader,
  // },
  // }),
};
