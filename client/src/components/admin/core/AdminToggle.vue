<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import type { Scalar } from "@/types/data.ts";

const modelValue = defineModel<Scalar>();
const selectedFields = defineModel<string[]>("selectedFields");

const { name, multipleSelection } = defineProps<{
  keyPrefix: string;
  name: string;
  multipleSelection?: boolean;
}>();

const { t } = useTypedI18n();

const disable = computed(
  () => multipleSelection && !(selectedFields.value?.includes(name) ?? true),
);
</script>

<template>
  <div class="q-mr-md">
    <QCheckbox v-if="multipleSelection" v-model="selectedFields" :val="name" />
    <QToggle
      v-model="modelValue"
      :label="t(`${keyPrefix}.column.${name}.label`)"
      :disable
      left-label
    />
  </div>
</template>

<style scoped lang="scss"></style>
