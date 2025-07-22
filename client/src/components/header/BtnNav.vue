<script setup lang="ts">
import { useRouter } from "vue-router";

import { buttonColor } from "@/utils";

defineProps<{
  name: string;
  icon: string;
  disable?: boolean;
  tooltip?: string;
}>();

const router = useRouter();
</script>

<template>
  <QBtn
    :icon
    :color="buttonColor(router.currentRoute.value.name === name)"
    :disable
    flat
    square
    @click="router.push({ name })"
  >
    <QTooltip v-if="tooltip">
      {{ tooltip }}
    </QTooltip>
  </QBtn>
</template>

<style scoped lang="scss"></style>
