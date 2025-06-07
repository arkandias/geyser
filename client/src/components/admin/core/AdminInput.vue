<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { inputToNumber } from "@/utils";

const modelValue = defineModel<string | number | null>();
const selectedFields = defineModel<string[]>("selectedFields");

const { keyPrefix, name, type, multipleSelection } = defineProps<{
  keyPrefix: string;
  name: string;
  type?: "text" | "textarea" | "number";
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
  modelValue.value =
    type === "number"
      ? inputToNumber(value)
      : value !== null
        ? String(value)
        : null;
};
</script>

<template>
  <QInput
    :model-value="modelValue"
    :type
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
