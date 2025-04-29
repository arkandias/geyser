import { useQuasar } from "quasar";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type AvailableLocale, isAvailableLocale } from "@/config/locales.ts";
import { quasarLanguages } from "@/services/quasar.ts";

export const useLocale = () => {
  const { locale } = useTypedI18n();
  const $q = useQuasar();

  const storedLocale = $q.localStorage.getItem("lang");
  if (isAvailableLocale(storedLocale)) {
    locale.value = storedLocale;
    $q.lang.set(quasarLanguages[storedLocale]);
  } else {
    const browserLocale = $q.lang.getLocale();
    if (isAvailableLocale(browserLocale)) {
      locale.value = browserLocale;
      $q.lang.set(quasarLanguages[browserLocale]);
    }
  }

  const setLocale = (newLocale: AvailableLocale) => {
    locale.value = newLocale;
    $q.lang.set(quasarLanguages[newLocale]);
    $q.localStorage.set("lang", newLocale);
  };

  return {
    setLocale,
  };
};
