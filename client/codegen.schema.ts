import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });
dotenv.config({ path: ".env.development.local" });

const graphqlURL = process.env["VITE_GRAPHQL_URL"];
const hasuraAdminSecret = process.env["VITE_HASURA_ADMIN_SECRET"];

if (!graphqlURL) {
  throw new Error("Missing VITE_GRAPHQL_URL environment variable");
}
if (!hasuraAdminSecret) {
  throw new Error("Missing VITE_HASURA_ADMIN_SECRET environment variable");
}

const config: CodegenConfig = {
  schema: {
    [graphqlURL]: {
      headers: {
        "X-Hasura-Admin-Secret": hasuraAdminSecret,
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
