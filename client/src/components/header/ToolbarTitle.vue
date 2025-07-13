<script setup lang="ts">
import { version } from "@/config/environment.ts";
</script>

<template>
  <QToolbarTitle shrink>
    <QAvatar icon="sym_s_spa" square size="xl" />
    Geyser
    <QBadge v-if="version" outline align="middle">
      {{ version }}
    </QBadge>
  </QToolbarTitle>
</template>

<style scoped lang="scss">
.q-toolbar__title {
  flex-shrink: 0;
}
</style>
