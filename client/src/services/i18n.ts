import { type UseI18nOptions, createI18n, useI18n } from "vue-i18n";

import { DEFAULT_LOCALE } from "@/config/constants.ts";
import { LocaleEnum } from "@/gql/graphql.ts";
import en from "@/locales/en";
import fr from "@/locales/fr";

type MessageSchema = (typeof messages)[typeof DEFAULT_LOCALE];
type NumberSchema = typeof numberFormat;

export type TypedI18nSchema = {
  message: MessageSchema;
  number: NumberSchema;
};

const messages = {
  [LocaleEnum.Fr]: fr,
  [LocaleEnum.En]: en,
} satisfies Record<LocaleEnum, unknown>;

const numberFormat = {
  decimal: {
    style: "decimal",
    maximumFractionDigits: 2,
  },
  decimalFixed: {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
} as const;

const numberFormats = {
  [LocaleEnum.Fr]: numberFormat,
  [LocaleEnum.En]: numberFormat,
} satisfies Record<LocaleEnum, typeof numberFormat>;

export const i18n = createI18n<[MessageSchema], LocaleEnum>({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
  numberFormats,
  warnHtmlMessage: false,
});

export const useCustomI18n = (
  options?: UseI18nOptions<TypedI18nSchema, LocaleEnum>,
) =>
  useI18n<TypedI18nSchema, LocaleEnum>({
    useScope: "global",
    ...options,
  });
