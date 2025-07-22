<script setup lang="ts">
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

const { organization } = useOrganizationStore();
</script>

<template>
  <div class="organization-info">
    <QSeparator vertical />
    <div class="organization-text">
      <div class="label">
        {{ organization.label }}
      </div>
      <div v-if="organization.sublabel" class="sublabel">
        {{ organization.sublabel }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.organization-info {
  display: flex;
  align-items: center;
  height: 34px;

  .organization-text {
    padding: 0 12px;
    line-height: 1.25;
    white-space: nowrap;

    .label {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .sublabel {
      font-size: 0.75rem;
      opacity: 0.75;
    }
  }
}
</style>
