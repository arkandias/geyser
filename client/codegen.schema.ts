import dotenvx from "@dotenvx/dotenvx";
import type { CodegenConfig } from "@graphql-codegen/cli";

dotenvx.config({ path: ".env.development" });

const graphqlUrl = process.env["GRAPHQL_URL"];
if (!graphqlUrl) {
  throw new Error("Missing GRAPHQL_URL environment variable");
}

const apiAdminSecret = process.env["API_ADMIN_SECRET"];
if (!apiAdminSecret) {
  throw new Error("Missing API_ADMIN_SECRET environment variable");
}

const config: CodegenConfig = {
  schema: {
    [graphqlUrl]: {
      headers: {
        "X-Admin-Secret": apiAdminSecret,
      },
    },
  },
  generates: {
    "schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
