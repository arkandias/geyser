/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

const getPackageName = (path: string) => {
  // Get the last node_modules segments
  const segments = path.split("/node_modules/");
  const lastSegment = segments[segments.length - 1];
  if (!lastSegment) {
    return null;
  }

  // Handle scoped packages like @vue/runtime-core
  if (lastSegment.startsWith("@")) {
    const parts = lastSegment.split("/");
    return `${parts[0]}/${parts[1]}`;
  }

  // Handle regular packages like "vue", "quasar"
  return lastSegment.split("/")[0];
};

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: "es2024",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const packageName = getPackageName(id);

          // === Source Code ===
          if (!packageName) {
            // GraphQL operations
            if (id.includes("/client/src/gql/")) {
              return "gql";
            }

            // Client package (without gql)
            if (id.includes("/client/")) {
              return null;
            }

            // Shared package
            if (id.includes("/shared/dist/")) {
              return "shared";
            }

            // Build artifacts
            return null;
          }

          // === Vendor Packages ===

          // Vue ecosystem
          if (
            packageName === "vue" ||
            packageName.startsWith("@vue/") ||
            packageName === "vue-router" ||
            packageName === "vue-i18n" ||
            packageName.startsWith("@intlify/")
          ) {
            return "vendor-vue";
          }

          // Quasar
          if (packageName === "quasar") {
            return "vendor-quasar";
          }

          // GraphQL ecosystem
          if (
            packageName === "graphql" ||
            packageName.startsWith("@urql/") ||
            packageName === "wonka" ||
            packageName.startsWith("@0no-co/")
          ) {
            return "vendor-graphql";
          }

          // Other packages
          return "vendor-misc";
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
