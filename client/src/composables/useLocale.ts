import { useQuasar } from "quasar";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { quasarLanguages } from "@/services/quasar.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { isLocale } from "@/utils";

export const useLocale = () => {
  const { locale } = useTypedI18n();
  const $q = useQuasar();
  const { organization } = useOrganizationStore();

  locale.value = organization.locale;
  $q.lang.set(quasarLanguages[organization.locale]);

  const setLocale = (newLocale: string) => {
    if (isLocale(newLocale)) {
      locale.value = newLocale;
      $q.lang.set(quasarLanguages[newLocale]);
    }
  };

  return {
    setLocale,
  };
};
