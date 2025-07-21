<script setup lang="ts">
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useCustomTextsStore } from "@/stores/useCustomTextsStore.ts";
import { capitalize, toLowerCase } from "@/utils";

import MarkdownContent from "@/components/core/MarkdownContent.vue";

defineProps<{ alert?: string }>();

const { currentPhase } = useCurrentPhaseStore();
const { getCustomText } = useCustomTextsStore();

const title = getCustomText("homeTitle");
const subtitle = getCustomText(
  `homeSubtitle${capitalize(toLowerCase(currentPhase.value))}`,
);
const message = getCustomText(
  `homeMessage${capitalize(toLowerCase(currentPhase.value))}`,
);
</script>

<template>
  <QPage id="home-page" class="column items-center">
    <QCard flat square class="text-center">
      <QCardSection class="text-h4">
        {{ alert || title }}
      </QCardSection>
      <QCardSection v-if="!alert">
        <p class="text-h5 text-center q-pa-md">{{ subtitle }}</p>
        <MarkdownContent
          v-if="message"
          :raw-text="message"
          class="text-justify"
        />
      </QCardSection>
    </QCard>
  </QPage>
</template>

<style scoped lang="scss">
.q-card {
  width: $page-home-width;
}
</style>
