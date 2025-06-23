import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import {
  CUSTOM_TEXT_KEYS,
  CUSTOM_TEXT_MARKDOWN_KEYS,
  type CustomTextKey,
} from "@/config/custom-text-keys.ts";
import { camelToDot } from "@/utils";

const customTexts = ref(
  Object.fromEntries(CUSTOM_TEXT_KEYS.map((key) => [key, null])) as Record<
    CustomTextKey,
    string | null
  >,
);

export const useCustomTextsStore = () => {
  const { t } = useTypedI18n();

  const customTextsData = computed(() =>
    CUSTOM_TEXT_KEYS.map((key) => ({
      key,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-template-expression
      text: customTexts.value[key] ?? t(`${camelToDot(key)}`),
      isDefault: customTexts.value[key] === null,
      markdown: CUSTOM_TEXT_MARKDOWN_KEYS.includes(key),
    })),
  );

  const getCustomText = computed(
    () => (key: CustomTextKey) =>
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-template-expression
      customTexts.value[key] ?? t(`${camelToDot(key)}`),
  );

  const setCustomTexts = (
    newCustomTexts: { key: string; value?: string | null }[],
  ) => {
    CUSTOM_TEXT_KEYS.forEach((key) => {
      customTexts.value[key] =
        newCustomTexts.find((text) => text.key === key)?.value ?? null;
    });
  };

  return {
    customTextsData,
    getCustomText,
    setCustomTexts,
  };
};
