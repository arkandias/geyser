import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const graphqlUrl = process.env["VITE_GRAPHQL_URL"];
const graphqlAdminSecret = process.env["GRAPHQL_ADMIN_SECRET"];

if (!graphqlUrl) {
  throw new Error("Missing VITE_GRAPHQL_URL environment variable");
}
if (!graphqlAdminSecret) {
  throw new Error("Missing GRAPHQL_ADMIN_SECRET environment variable");
}

const config: CodegenConfig = {
  schema: {
    [graphqlUrl]: {
      headers: {
        "X-Admin-Secret": graphqlAdminSecret,
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
