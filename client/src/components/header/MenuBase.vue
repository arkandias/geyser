<script setup lang="ts">
import { ref } from "vue";

import { buttonColor } from "@/utils/colors.ts";

defineProps<{
  label: string;
  icon: string;
}>();
defineSlots<{ default(): unknown }>();

const isOpen = ref(false);
const showTooltip = ref(false);
</script>

<template>
  <QBtn :icon :color="buttonColor(isOpen)" flat square>
    <QTooltip v-model="showTooltip">
      {{ label }}
    </QTooltip>
    <QMenu v-model="isOpen" square @show="showTooltip = false">
      <slot />
    </QMenu>
  </QBtn>
</template>

<style scoped lang="scss"></style>
