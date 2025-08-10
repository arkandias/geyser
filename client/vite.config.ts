/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: "es2024",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // GraphQL operations first
          if (id.includes("/client/src/gql/")) {
            return "gql";
          }

          // Keep all other client src in main bundle
          if (id.includes("/client/src/")) {
            return null;
          }

          // Shared workspace code
          if (id.includes("/shared/dist/")) {
            return "shared";
          }

          // Node modules chunking
          if (id.includes("/node_modules/")) {
            // Vue ecosystem
            if (["vue", "@intlify"].some((pkg) => id.includes(pkg))) {
              return "vendor-vue";
            }

            // Quasar UI library
            if (id.includes("quasar")) {
              return "vendor-quasar";
            }

            // GraphQL ecosystem
            if (["@urql", "graphql", "wonka"].some((pkg) => id.includes(pkg))) {
              return "vendor-graphql";
            }

            // Everything else from node_modules
            return "vendor-misc";
          }

          // Build artifacts stay in main
          return null;
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls,
      },
    }),
    quasar({
      autoImportComponentCase: "pascal",
      sassVariables: fileURLToPath(
        new URL("./src/css/quasar.variables.scss", import.meta.url),
      ),
    }),
    compression({
      algorithms: ["gzip"],
    }),
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/css/global.variables.scss";',
      },
    },
  },
  // https://vitest.dev/config/
  test: {
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        url: "about:blank",
      },
    },
  },
}));
