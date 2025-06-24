/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: "es2024",
    cssTarget: "es2023",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-core": ["vue", "vue-i18n", "vue-router"],
          "vendor-data": [
            "@geyser/shared",
            "@urql/exchange-auth",
            "@urql/vue",
            "axios",
            "dompurify",
            "graphql",
            "marked",
            "papaparse",
            "zod",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: [],
    port: 5173,
    strictPort: true,
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
    compression(),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@geyser/shared",
        replacement: fileURLToPath(new URL("../shared/src", import.meta.url)),
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
