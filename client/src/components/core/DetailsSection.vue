<script setup lang="ts">
import { TOOLTIP_DELAY } from "@/config/constants.ts";

const edition = defineModel<boolean>();
defineProps<{
  title: string;
  editable?: boolean;
  editionTooltip?: string;
}>();
defineSlots<{ default(): unknown }>();
</script>

<template>
  <QCardSection>
    <div class="text-subtitle1 text-uppercase">
      {{ title }}
      <QBtn
        v-if="editable"
        icon="sym_s_edit"
        color="primary"
        size="sm"
        flat
        square
        dense
        @click="edition = !edition"
      >
        <QTooltip v-if="editionTooltip" :delay="TOOLTIP_DELAY">
          {{ editionTooltip }}
        </QTooltip>
      </QBtn>
    </div>
    <slot />
  </QCardSection>
</template>

<style scoped lang="scss"></style>
