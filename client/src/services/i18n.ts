import { type UseI18nOptions, createI18n, useI18n } from "vue-i18n";

import { type AvailableLocale, DEFAULT_LOCALE } from "@/config/locales.ts";
import enUS from "@/locales/en";
import frFR from "@/locales/fr";

type MessageSchema = (typeof messages)[typeof DEFAULT_LOCALE];
type NumberSchema = typeof numberFormat;

export type TypedI18nSchema = {
  message: MessageSchema;
  number: NumberSchema;
};

const messages = {
  "fr-FR": frFR,
  "en-US": enUS,
} satisfies Record<AvailableLocale, unknown>;

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
  "fr-FR": numberFormat,
  "en-US": numberFormat,
} satisfies Record<AvailableLocale, typeof numberFormat>;

export const i18n = createI18n<[MessageSchema], AvailableLocale>({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
  numberFormats,
  warnHtmlMessage: false,
});

export const useCustomI18n = (
  options?: UseI18nOptions<TypedI18nSchema, AvailableLocale>,
) =>
  useI18n<TypedI18nSchema, AvailableLocale>({
    useScope: "global",
    ...options,
  });
