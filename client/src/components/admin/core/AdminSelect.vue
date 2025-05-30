<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import type { Option, Scalar } from "@/types/data.ts";

const modelValue = defineModel<Scalar | Scalar[]>();
const selectedFields = defineModel<string[]>("selectedFields");

const {
  name,
  options = [],
  multipleSelection,
} = defineProps<{
  keyPrefix: string;
  name: string;
  options?: Scalar[] | Option[];
  multiple?: boolean;
  multipleSelection?: boolean;
}>();

const { t } = useTypedI18n();

const disable = computed(
  () =>
    !options.length ||
    (multipleSelection && !(selectedFields.value?.includes(name) ?? true)),
);
</script>

<template>
  <QSelect
    v-model="modelValue"
    :options
    :label="t(`${keyPrefix}.column.${name}.label`)"
    :disable
    :multiple
    :use-chips="multiple"
    emit-value
    map-options
    clearable
    clear-icon="sym_s_close"
    square
    dense
    options-dense
  >
    <template v-if="multipleSelection" #before>
      <QCheckbox v-model="selectedFields" :val="name" />
    </template>
  </QSelect>
</template>

<style scoped lang="scss"></style>
