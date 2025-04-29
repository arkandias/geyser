import {
  LocalStorage,
  Notify,
  type QuasarLanguage,
  type QuasarPluginOptions,
} from "quasar";
import quasarIconSet from "quasar/icon-set/material-symbols-sharp";
import quasarLangEn from "quasar/lang/en-US";
import quasarLangFr from "quasar/lang/fr";

import type { AvailableLocale } from "@/config/locales.ts";

export const quasarLanguages: Record<AvailableLocale, QuasarLanguage> = {
  "fr-FR": quasarLangFr,
  "en-US": quasarLangEn,
} as const;

export const quasarOptions: Partial<QuasarPluginOptions> = {
  plugins: { LocalStorage, Notify },
  lang: quasarLangFr,
  iconSet: quasarIconSet,
  config: { dark: "auto" },
};
