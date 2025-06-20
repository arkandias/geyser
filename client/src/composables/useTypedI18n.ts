import { type UseI18nOptions, useI18n } from "vue-i18n";

import type { LocaleEnum } from "@/gql/graphql.ts";
import type { TypedI18nSchema } from "@/services/i18n.ts";

export const useTypedI18n = (
  options?: UseI18nOptions<TypedI18nSchema, LocaleEnum>,
) =>
  useI18n<TypedI18nSchema, LocaleEnum>({
    useScope: "global",
    ...options,
  });
