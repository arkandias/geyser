import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

let graphqlUrl: URL;
if (process.env["VITE_GRAPHQL_URL"]) {
  graphqlUrl = new URL(process.env["VITE_GRAPHQL_URL"]);
} else if (process.env["VITE_API_URL"]) {
  const apiUrl = new URL(process.env["VITE_API_URL"]);
  graphqlUrl = new URL("/graphql", apiUrl.origin);
} else {
  throw new Error("Either VITE_API_URL or VITE_GRAPHQL_URL must be set");
}

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
