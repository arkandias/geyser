<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed, ref, watch } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetServicesDocument } from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import { normalizeForSearch } from "@/utils/misc.ts";

const id = defineModel<number | null>();

graphql(`
  query GetServices($year: Int!) {
    services: service(
      where: { year: { _eq: $year } }
      orderBy: [{ teacher: { displayname: ASC } }]
    ) {
      id
      teacher {
        displayname
      }
    }
  }
`);

const { t } = useTypedI18n();
const { activeYear } = useYearsStore();

const { data } = useQuery({
  query: GetServicesDocument,
  variables: () => ({ year: activeYear.value ?? 0 }),
  pause: () => activeYear.value === null,
  context: { additionalTypenames: ["All", "Service"] },
});

const options = ref<{ value: number; label: string; search: string }[]>([]);
const optionsInit = computed(
  () =>
    data.value?.services.map((s) => ({
      value: s.id,
      label: s.teacher.displayname ?? "",
      search: normalizeForSearch(s.teacher.displayname ?? ""),
    })) ?? [],
);
watch(
  optionsInit,
  (value) => {
    options.value = value;
  },
  { immediate: true },
);

const filter = (val: string, update: (x: () => void) => void) => {
  update(() => {
    options.value = optionsInit.value.filter((t) =>
      t.search.includes(normalizeForSearch(val)),
    );
  });
};
</script>

<template>
  <QSelect
    v-model="id"
    :options
    :label="t('selectService.label')"
    emit-value
    map-options
    use-input
    fill-input
    hide-selected
    input-debounce="0"
    hide-dropdown-icon
    @filter="filter"
  />
</template>

<style scoped lang="scss"></style>
