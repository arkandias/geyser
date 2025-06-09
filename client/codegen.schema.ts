import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const apiUrl = process.env["VITE_API_URL"];
if (!apiUrl) {
  throw new Error("Missing VITE_API_URL environment variable");
}

const baseUrl = new URL(apiUrl);
const graphqlUrl = new URL("/graphql", baseUrl.origin);

const apiAdminSecret = process.env["API_ADMIN_SECRET"];
if (!apiAdminSecret) {
  throw new Error("Missing API_ADMIN_SECRET environment variable");
}

const config: CodegenConfig = {
  schema: {
    [graphqlUrl.href]: {
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
