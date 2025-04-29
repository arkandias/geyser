// sort-imports-ignore
import { createApp } from "vue";
import { Quasar } from "quasar";
import urql from "@urql/vue";

import { getAuthHeader, initKeycloak } from "@/services/keycloak.ts";
import { quasarOptions } from "@/services/quasar.ts";
import { i18n } from "@/services/i18n.ts";
import { router } from "@/services/router.ts";
import { clientOptions, tmp } from "@/services/urql.ts";

import "quasar/src/css/index.sass";
import "@/css/main.scss";

import App from "@/App.vue";

if (import.meta.env.PROD) {
  console.debug = () => {
    // Intentionally empty to disable debug logging in production
  };
}

const claims = await initKeycloak();
console.log("claims", claims);

async function exchangeToken() {
  const url = "http://localhost/authz/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { ...getAuthHeader() },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    tmp.token = json.token;
    console.log("RESPONSE", json);
  } catch (error) {
    console.error("ERROR", error.message);
  }
}

await exchangeToken();

createApp(App, { uid: claims.email ?? null })
  .use(Quasar, quasarOptions)
  .use(i18n)
  .use(router)
  .use(urql, clientOptions)
  .mount("#app");
