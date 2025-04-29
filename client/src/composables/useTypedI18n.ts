import { type UseI18nOptions, useI18n } from "vue-i18n";

import type { AvailableLocale } from "@/config/locales.ts";
import type { TypedI18nSchema } from "@/services/i18n.ts";

export const useTypedI18n = (
  options?: UseI18nOptions<TypedI18nSchema, AvailableLocale>,
) =>
  useI18n<TypedI18nSchema, AvailableLocale>({
    useScope: "global",
    ...options,
  });
