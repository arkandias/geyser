import {
  LocalStorage,
  Notify,
  type QuasarLanguage,
  type QuasarPluginOptions,
} from "quasar";
import quasarIconSet from "quasar/icon-set/material-symbols-sharp";
import quasarLangEn from "quasar/lang/en-US";
import quasarLangFr from "quasar/lang/fr";

import { DEFAULT_LOCALE } from "@/config/constants.ts";
import { LocaleEnum } from "@/gql/graphql.ts";

export const quasarLanguages: Record<LocaleEnum, QuasarLanguage> = {
  [LocaleEnum.Fr]: quasarLangFr,
  [LocaleEnum.En]: quasarLangEn,
} as const;

export const quasarOptions: Partial<QuasarPluginOptions> = {
  plugins: { LocalStorage, Notify },
  lang: quasarLanguages[DEFAULT_LOCALE],
  iconSet: quasarIconSet,
  config: { dark: "auto" },
};
