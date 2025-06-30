import { useQuasar } from "quasar";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { quasarLanguages } from "@/services/quasar.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { isLocale } from "@/utils";

export const useLocale = () => {
  const $q = useQuasar();
  const { locale } = useTypedI18n();
  const { organization } = useOrganizationStore();

  const storedLocale = $q.localStorage.getItem("locale");
  if (isLocale(storedLocale)) {
    locale.value = storedLocale;
    $q.lang.set(quasarLanguages[storedLocale]);
  } else {
    locale.value = organization.locale;
    $q.lang.set(quasarLanguages[organization.locale]);
  }

  const setLocale = (newLocale: string) => {
    if (isLocale(newLocale)) {
      locale.value = newLocale;
      $q.localStorage.set("locale", newLocale);
      $q.lang.set(quasarLanguages[newLocale]);
    }
  };

  return {
    setLocale,
  };
};
