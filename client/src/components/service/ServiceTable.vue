<script setup lang="ts">
defineSlots<{ default(): unknown }>();
</script>

<template>
  <QMarkupTable separator="none" flat square dense>
    <slot />
  </QMarkupTable>
</template>

<style scoped lang="scss">
:slotted(td:last-child) {
  text-align: end;
}
:slotted(td:first-child) {
  text-align: start;
}
</style>
