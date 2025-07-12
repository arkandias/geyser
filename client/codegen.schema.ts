import dotenvx from "@dotenvx/dotenvx";
import type { CodegenConfig } from "@graphql-codegen/cli";

dotenvx.config({ path: ".env.development" });

const apiAdminSecret = process.env["VITE_ADMIN_SECRET"];
if (!apiAdminSecret) {
  throw new Error("Missing VITE_ADMIN_SECRET environment variable");
}

const config: CodegenConfig = {
  schema: {
    "http://localhost:3000/graphql": {
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
