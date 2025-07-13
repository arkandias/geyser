<script setup lang="ts">
import { useTutorial } from "@/composables/useTutorial.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";

const { t } = useTypedI18n();
const { startTour } = useTutorial();
</script>

<template>
  <QBtn id="tutorial-button" icon="sym_s_help" flat square @click="startTour()">
    <QTooltip>
      {{ t("header.tutorial.label") }}
    </QTooltip>
  </QBtn>
</template>

<style scoped lang="scss"></style>
