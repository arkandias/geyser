<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import type { Option, OptionWithSearch, Scalar } from "@/types/data.ts";
import { normalizeForSearch } from "@/utils";

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

const initOptions = computed<OptionWithSearch[]>(() =>
  options.map((opt) =>
    typeof opt === "object" && opt !== null
      ? {
          value: opt.value,
          label: opt.label,
          search: normalizeForSearch(opt.label),
        }
      : {
          value: opt,
          label: String(opt),
          search: normalizeForSearch(String(opt)),
        },
  ),
);

const filteredOptions = ref<OptionWithSearch[]>([]);
watch(
  initOptions,
  (value) => {
    filteredOptions.value = value;
  },
  { immediate: true },
);

const filter = (val: string, update: (x: () => void) => void) => {
  update(() => {
    filteredOptions.value = initOptions.value.filter((opt) =>
      opt.search.includes(normalizeForSearch(val)),
    );
  });
};
</script>

<template>
  <QSelect
    v-model="modelValue"
    :options="filteredOptions"
    :label="t(`${keyPrefix}.column.${name}.label`)"
    :disable
    :multiple
    :use-chips="multiple"
    emit-value
    map-options
    use-input
    input-debounce="0"
    clearable
    clear-icon="sym_s_close"
    square
    dense
    options-dense
    @filter="filter"
  >
    <template v-if="multipleSelection" #before>
      <QCheckbox v-model="selectedFields" :val="name" />
    </template>
  </QSelect>
</template>

<style scoped lang="scss"></style>
