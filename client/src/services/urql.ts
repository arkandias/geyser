import { devtoolsExchange } from "@urql/devtools";
import {
  type ClientOptions,
  cacheExchange,
  debugExchange,
  fetchExchange,
} from "@urql/vue";

import { graphqlURL } from "@/config/env.ts";
import { RoleTypeEnum } from "@/gql/graphql.ts";

const roleHeader: { "X-Hasura-Role"?: string } = {};

const roleToHeaderMap = {
  [RoleTypeEnum.Admin]: "admin",
  [RoleTypeEnum.Commissioner]: "commissioner",
  [RoleTypeEnum.Teacher]: "teacher",
} as const;

export const setRoleHeader = (role: RoleTypeEnum) => {
  roleHeader["X-Hasura-Role"] = roleToHeaderMap[role];
};

export const clientOptions: ClientOptions = {
  url: graphqlURL,
  exchanges: [
    devtoolsExchange,
    cacheExchange,
    debugExchange,
    // mapExchange({
    //   async onOperation(operation) {
    //     await authManager.setup();
    //     return operation;
    //   },
    // }),
    fetchExchange,
  ],
  fetchOptions: () => ({
    headers: { ...roleHeader },
    credentials: "include",
  }),
};
