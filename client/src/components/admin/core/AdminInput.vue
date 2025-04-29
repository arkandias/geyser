<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { inputToNumber } from "@/utils/misc.ts";

const modelValue = defineModel<string | number | null>();
const selectedFields = defineModel<string[]>("selectedFields");

const { keyPrefix, name, numeric, multipleSelection } = defineProps<{
  keyPrefix: string;
  name: string;
  numeric?: boolean;
  multipleSelection?: boolean;
}>();

const { t } = useTypedI18n();

const label = computed(
  () =>
    t(`${keyPrefix}.column.${name}.tooltip`) ||
    t(`${keyPrefix}.column.${name}.label`),
);

const disable = computed(
  () => multipleSelection && !(selectedFields.value?.includes(name) ?? true),
);

const onUpdate = (value: string | number | null) => {
  modelValue.value = numeric
    ? inputToNumber(value)
    : value !== null
      ? String(value)
      : null;
};
</script>

<template>
  <QInput
    :model-value="modelValue"
    :type="numeric ? 'number' : 'text'"
    :label
    :disable
    clearable
    clear-icon="sym_s_close"
    square
    dense
    @update:model-value="onUpdate"
  >
    <template v-if="multipleSelection" #before>
      <QCheckbox v-model="selectedFields" :val="name" />
    </template>
  </QInput>
</template>

<style scoped lang="scss"></style>
