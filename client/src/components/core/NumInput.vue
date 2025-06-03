<script setup lang="ts">
import { inputToNumber } from "@/utils";

const modelValue = defineModel<number | null>();

defineProps<{
  label: string;
  disable?: boolean;
}>();

const onUpdate = (value: string | number | null) => {
  modelValue.value = inputToNumber(value);
};
</script>

<template>
  <QInput
    :model-value="modelValue"
    type="number"
    :label
    :disable
    square
    dense
    @update:model-value="onUpdate"
  />
</template>

<style scoped lang="scss"></style>
