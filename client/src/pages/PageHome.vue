<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { phaseMessage, phaseSubtitle } from "@/locales/helpers.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useCustomTextsStore } from "@/stores/useCustomTextsStore.ts";
import { capitalize, toLowerCase } from "@/utils/misc.ts";

defineProps<{ alert?: string }>();

const { t } = useTypedI18n();
const { currentPhase } = useCurrentPhaseStore();
const { getCustomText } = useCustomTextsStore();

const title = computed(
  () => getCustomText("homeTitle").value || t("home.title"),
);
const subtitle = computed(
  () =>
    getCustomText(`homeSubtitle${capitalize(toLowerCase(currentPhase.value))}`)
      .value || phaseSubtitle(t, currentPhase.value),
);
const message = computed(
  () =>
    getCustomText(`homeMessage${capitalize(toLowerCase(currentPhase.value))}`)
      .value || phaseMessage(t, currentPhase.value),
);
</script>

<template>
  <QPage class="column items-center">
    <QCard flat square class="text-center">
      <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
      <QCardSection class="text-h4 q-pa-xl" v-html="alert || title" />
      <QCardSection v-if="!alert" class="q-pt-none">
        <p class="text-subtitle2 text-center" v-html="subtitle" />
        <div v-if="message" class="text-body2 text-justify" v-html="message" />
      </QCardSection>
      <!-- eslint-enable vue/no-v-html vue/no-v-text-v-html-on-component -->
    </QCard>
  </QPage>
</template>

<style scoped lang="scss">
.q-card {
  width: $page-home-width;
}
</style>
