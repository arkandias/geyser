import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const graphqlUrl = process.env["VITE_GRAPHQL_URL"];
if (!graphqlUrl) {
  throw new Error("Missing VITE_GRAPHQL_URL environment variable");
}

const apiAdminSecret = process.env["VITE_ADMIN_SECRET"];
if (!apiAdminSecret) {
  throw new Error("Missing VITE_ADMIN_SECRET environment variable");
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
