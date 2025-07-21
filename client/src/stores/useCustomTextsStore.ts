import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { CUSTOM_TEXTS, type CustomTextKey } from "@/config/custom-texts.ts";

const customTexts = ref(
  CUSTOM_TEXTS.map(({ key }) => ({
    key,
    value: "",
  })),
);

export const useCustomTextsStore = () => {
  const { t } = useTypedI18n();

  const customTextsData = computed(() =>
    CUSTOM_TEXTS.map((text) => ({
      key: text.key,
      value: customTexts.value.find(({ key }) => key === text.key)?.value ?? "",
      defaultValue: t(text.defaultKey),
      markdown: text.markdown,
    })),
  );

  const getCustomText = (key: CustomTextKey) =>
    computed(() => {
      const text = customTextsData.value.find((text) => text.key === key);
      return text ? text.value || text.defaultValue : "";
    });

  const setCustomTexts = (
    newCustomTexts: { key: string; value?: string | null }[],
  ) => {
    customTexts.value.forEach((text) => {
      text.value =
        newCustomTexts.find((newText) => newText.key === text.key)?.value ?? "";
    });
  };

  return {
    customTextsData,
    getCustomText,
    setCustomTexts,
  };
};
