<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "marked";
import { computed } from "vue";

const { rawText } = defineProps<{
  rawText: string;
  disable?: boolean;
}>();

const markedAndSanitizedText = computed(() =>
  DOMPurify.sanitize(marked.parse(rawText, { async: false })),
);
</script>

<template>
  <div v-if="disable">{{ rawText }}</div>
  <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
  <div v-else v-html="markedAndSanitizedText" />
</template>

<style scoped lang="scss">
:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
  margin: 0.5em 0;
  line-height: 1.3;
  font-weight: 600;
}

:deep(h1) {
  font-size: 1.5rem;
}

:deep(h2) {
  font-size: 1.3rem;
}

:deep(h3) {
  font-size: 1.2rem;
}

:deep(h4) {
  font-size: 1.1rem;
}

:deep(h5) {
  font-size: 1rem;
}

:deep(h6) {
  font-size: 0.9rem;
}
</style>
