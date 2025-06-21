// sort-imports-ignore
import { createApp } from "vue";
import { Quasar } from "quasar";
import urql from "@urql/vue";

import { AuthManager } from "@/services/auth.ts";
import { quasarOptions } from "@/services/quasar.ts";
import { i18n } from "@/services/i18n.ts";
import { router } from "@/services/router.ts";
import { makeClientOptions } from "@/services/urql.ts";

import "@quasar/extras/material-symbols-sharp/material-symbols-sharp.css";
import "@quasar/extras/roboto-font/roboto-font.css";
import "quasar/src/css/index.sass";
import "@/css/main.scss";

import App from "@/App.vue";

if (import.meta.env.PROD) {
  console.debug = () => {
    // Intentionally empty to disable debug logging in production
  };
}

const authManager = new AuthManager();
await authManager.init();

const clientOptions = makeClientOptions(authManager);

createApp(App, { authManager })
  .use(Quasar, quasarOptions)
  .use(i18n)
  .use(router)
  .use(urql, clientOptions)
  .mount("#app");
