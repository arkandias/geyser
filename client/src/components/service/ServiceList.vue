<script setup lang="ts">
defineSlots<{ default(): unknown }>();
</script>

<template>
  <QList class="text-left">
    <slot />
  </QList>
</template>

<style scoped lang="scss"></style>
