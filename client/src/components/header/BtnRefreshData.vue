<script setup lang="ts">
import { useRefreshData } from "@/composables/useRefreshData.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";

const { t } = useTypedI18n();
const { isRefreshing, refreshData } = useRefreshData();
</script>

<template>
  <QBtn
    id="refresh-button"
    icon="sym_s_refresh"
    :loading="isRefreshing"
    flat
    square
    @click="refreshData()"
  >
    <QTooltip>
      {{ t("header.refreshData.label") }}
    </QTooltip>
  </QBtn>
</template>

<style scoped lang="scss"></style>
