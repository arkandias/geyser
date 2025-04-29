<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
}>();
defineSlots<{ default(): unknown }>();
</script>

<template>
  <QExpansionItem :icon :label header-class="text-primary">
    <QCard flat square>
      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </QExpansionItem>
</template>

<style scoped lang="scss"></style>
