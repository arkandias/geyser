export const AVAILABLE_LOCALES = ["fr-FR", "en-US"] as const;

export type AvailableLocale = (typeof AVAILABLE_LOCALES)[number];

export const isAvailableLocale = (
  locale: unknown,
): locale is AvailableLocale => {
  return (
    typeof locale === "string" &&
    AVAILABLE_LOCALES.includes(locale as AvailableLocale)
  );
};

export const DEFAULT_LOCALE: AvailableLocale = "fr-FR";

export const LOCALE_LABELS: Record<AvailableLocale, string> = {
  "fr-FR": "Français",
  "en-US": "English",
} as const;
