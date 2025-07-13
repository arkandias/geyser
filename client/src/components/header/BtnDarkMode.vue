<script setup lang="ts">
import { useDarkMode } from "@/composables/useDarkMode.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";

const { t } = useTypedI18n();
const { isDarkModeActive, toggleDarkMode } = useDarkMode();
</script>

<template>
  <QBtn
    id="dark-mode-button"
    :icon="isDarkModeActive ? 'sym_s_dark_mode' : 'sym_s_light_mode'"
    flat
    square
    @click="toggleDarkMode()"
  >
    <QTooltip>
      {{ t("header.darkMode.label") }}
    </QTooltip>
  </QBtn>
</template>

<style scoped lang="scss"></style>
