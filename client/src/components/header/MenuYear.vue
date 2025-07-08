<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

import MenuBase from "@/components/header/MenuBase.vue";

const { t } = useTypedI18n();
const { years, activeYear, selectYear } = useYearsStore();

const options = computed(() =>
  years.value
    .map((year) => ({
      value: year.value,
      label: year.value.toString(),
    }))
    .sort((a, b) => b.value - a.value),
);

const selectedYear = ref<number | null>(null);
watch(
  activeYear,
  (value) => {
    selectedYear.value = value;
  },
  { immediate: true },
);

const update = async () => {
  await selectYear(selectedYear.value);
};
</script>

<template>
  <MenuBase
    id="year-button"
    :label="t('header.year.label')"
    icon="sym_s_calendar_month"
  >
    <QList id="year-menu">
      <QItem class="flex-center">
        <QItemLabel header>
          {{ t("header.year.label") }}
        </QItemLabel>
      </QItem>
      <QSeparator />
      <QItem class="q-pl-sm">
        <QOptionGroup
          v-model="selectedYear"
          :options
          type="radio"
          @update:model-value="update"
        />
      </QItem>
    </QList>
  </MenuBase>
</template>

<style scoped lang="scss"></style>
