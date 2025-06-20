<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed, ref, watch } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetServicesDocument } from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type { OptionWithSearch } from "@/types/data.ts";
import { normalizeForSearch } from "@/utils";

const id = defineModel<number | null>();

graphql(`
  query GetServices($oid: Int!, $year: Int!) {
    services: service(
      where: { _and: [{ oid: { _eq: $oid } }, { year: { _eq: $year } }] }
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
const { organization } = useOrganizationStore();
const { activeYear } = useYearsStore();

const { data } = useQuery({
  query: GetServicesDocument,
  variables: () => ({ oid: organization.id, year: activeYear.value ?? 0 }),
  pause: () => activeYear.value === null,
  context: { additionalTypenames: ["All", "Service"] },
});

const options = ref<OptionWithSearch<number>[]>([]);
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
    options.value = optionsInit.value.filter((opt) =>
      opt.search.includes(normalizeForSearch(val)),
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
