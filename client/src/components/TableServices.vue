<script setup lang="ts">
import { computed, ref } from "vue";

import { usePermissions } from "@/composables/usePermissions.ts";
import { useQueryParam } from "@/composables/useQueryParam.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  RequestTypeEnum,
  type ServiceRowFragment,
  ServiceRowFragmentDoc,
} from "@/gql/graphql.ts";
import type { Column } from "@/types/column.ts";
import { getField, localeCompare, normalizeForSearch } from "@/utils";

const { serviceRowFragments } = defineProps<{
  serviceRowFragments: FragmentType<typeof ServiceRowFragmentDoc>[];
  fetching?: boolean;
}>();

graphql(`
  fragment ServiceRow on Service {
    id
    teacher {
      firstname
      lastname
      alias
      visible
    }
    hours
    modifications {
      hours
    }
    requests {
      type
      hoursWeighted
    }
    messages {
      content
    }
  }
`);

const { t, n } = useTypedI18n();
const perm = usePermissions();

type ServiceRow = Omit<
  ServiceRowFragment,
  "hours" | "modifications" | "requests"
> & {
  modifiedService: number;
  totalAssignment: number;
  totalPrimary: number;
  totalSecondary: number;
  diffAssignment: number;
  diffPrimary: number;
  diffSecondary: number;
};

const services = computed<ServiceRow[]>(() =>
  serviceRowFragments.map((f) => {
    const { hours, modifications, requests, ...rest } = useFragment(
      ServiceRowFragmentDoc,
      f,
    );
    const totalModifications = modifications.reduce((t, m) => t + m.hours, 0);
    const { totalAssignment, totalPrimary, totalSecondary } = requests.reduce(
      (t, r) => ({
        totalAssignment:
          t.totalAssignment +
          (r.type === RequestTypeEnum.Assignment ? (r.hoursWeighted ?? 0) : 0),
        totalPrimary:
          t.totalAssignment +
          (r.type === RequestTypeEnum.Primary ? (r.hoursWeighted ?? 0) : 0),
        totalSecondary:
          t.totalAssignment +
          (r.type === RequestTypeEnum.Secondary ? (r.hoursWeighted ?? 0) : 0),
      }),
      {
        totalAssignment: 0,
        totalPrimary: 0,
        totalSecondary: 0,
      },
    );
    const modifiedService = hours - totalModifications;
    return {
      ...rest,
      modifiedService,
      totalAssignment,
      totalPrimary,
      totalSecondary,
      diffAssignment: modifiedService - totalAssignment,
      diffPrimary: modifiedService - totalPrimary,
      diffSecondary: modifiedService - totalSecondary,
    };
  }),
);

const noResultsLabel = computed(() =>
  services.value.length
    ? t("courses.table.services.noResults")
    : t("courses.table.services.noData"),
);

// Row selection
const { getValue: selectedService, toggleValue: toggleService } = useQueryParam(
  "serviceId",
  true,
);
const selectedRow = computed(() => [{ id: selectedService.value }]);
const selectRow = async (_: Event, row: ServiceRowFragment) => {
  await toggleService(row.id);
};

// Columns definition
const columns = computed<Column<ServiceRow>[]>(() => [
  {
    name: "lastname",
    label: t("courses.table.services.columns.lastname.label"),
    tooltip: t("courses.table.services.columns.lastname.tooltip"),
    align: "left",
    field: (row) => row.teacher.lastname,
    sort: localeCompare,
    sortable: true,
    visible: true,
    searchable: true,
  },
  {
    name: "firstname",
    label: t("courses.table.services.columns.firstname.label"),
    tooltip: t("courses.table.services.columns.firstname.tooltip"),
    align: "left",
    field: (row) => row.teacher.firstname,
    sort: localeCompare,
    sortable: true,
    visible: true,
    searchable: true,
  },
  {
    name: "alias",
    label: t("courses.table.services.columns.alias.label"),
    tooltip: t("courses.table.services.columns.alias.tooltip"),
    align: "left",
    field: (row) => row.teacher.alias,
    sort: localeCompare,
    sortable: true,
    visible: false,
    searchable: true,
  },
  {
    name: "message",
    label: t("courses.table.services.columns.message.label"),
    tooltip: t("courses.table.services.columns.message.tooltip"),
    align: "center",
    field: (row) => !!row.messages[0]?.content,
    format: (val: boolean) => (val ? "✓" : "✗"),
    sortable: true,
    visible: false,
    searchable: false,
  },
  {
    name: "modifiedService",
    label: t("courses.table.services.columns.modifiedService.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.columns.modifiedService.tooltip"),
    field: "modifiedService",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "totalAssignment",
    label: t("courses.table.services.columns.totalAssignment.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.columns.totalAssignment.tooltip"),
    field: "totalAssignment",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: perm.toViewAssignments,
    searchable: false,
  },
  {
    name: "diffAssignment",
    label: t("courses.table.services.columns.diffAssignment.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.columns.diffAssignment.tooltip"),
    field: "diffAssignment",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
  },
  {
    name: "totalPrimary",
    label: t("courses.table.services.columns.totalPrimary.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.columns.totalPrimary.tooltip"),
    field: "totalPrimary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "diffPrimary",
    label: t("courses.table.services.columns.diffPrimary.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.columns.diffPrimary.tooltip"),
    field: "diffPrimary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
  },
  {
    name: "totalSecondary",
    label: t("courses.table.services.columns.totalSecondary.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.columns.totalSecondary.tooltip"),
    field: "totalSecondary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
  },
]);
const visibleColumns = ref(
  // eslint-disable-next-line vue/no-ref-object-reactivity-loss
  columns.value.filter((col) => col.visible).map((col) => col.name),
);
const isMenuColumnsOpen = ref(false);
const isMenuColumnsTooltipVisible = ref(false);

// Search filter
const search = ref<string | null>(null);
const filterObj = computed(() => ({
  search: normalizeForSearch(search.value ?? ""),
  searchColumns: columns.value.filter((col) => col.searchable),
}));
const filterMethod = (
  rows: readonly ServiceRow[],
  terms: typeof filterObj.value,
): readonly ServiceRow[] =>
  rows.filter((row) =>
    terms.searchColumns.some((col) =>
      normalizeForSearch(String(getField(row, col.field))).includes(
        terms.search,
      ),
    ),
  );

// Options
const stickyHeader = ref(false);

// Row styling
const tableRowClassFn = (row: ServiceRowFragment) =>
  row.teacher.visible ? "" : "non-visible";
</script>

<template>
  <QTable
    :title="t('courses.table.services.title')"
    :columns
    :visible-columns
    :rows="services"
    :selected="selectedRow"
    :loading="fetching"
    :pagination="{ rowsPerPage: 100 }"
    :rows-per-page-options="[0, 10, 20, 50, 100]"
    :filter="filterObj"
    :filter-method
    :table-row-class-fn
    :loading-label="t('courses.table.services.loading')"
    :no-results-label
    flat
    square
    dense
    virtual-scroll
    :class="{ 'sticky-header-table': stickyHeader }"
    @row-click="selectRow"
  >
    <template #top-right>
      <div class="row q-gutter-md">
        <QInput
          v-model="search"
          :placeholder="t('courses.table.services.filters.search')"
          clearable
          clear-icon="sym_s_close"
          square
          dense
        />
        <QToggle v-model="stickyHeader" icon="sym_s_scrollable_header" dense>
          <QTooltip>
            {{ t("courses.table.services.options.stickyHeader") }}
          </QTooltip>
        </QToggle>
        <QBtn
          icon="sym_s_view_column"
          :color="isMenuColumnsOpen ? 'primary' : 'grey'"
          flat
          square
          dense
        >
          <QTooltip v-model="isMenuColumnsTooltipVisible">
            {{ t("courses.table.services.options.visibleColumns") }}
          </QTooltip>
          <QMenu
            v-model="isMenuColumnsOpen"
            auto-close
            square
            dense
            @show="isMenuColumnsTooltipVisible = false"
          >
            <QList dense>
              <QItem v-for="col in columns" :key="col.name" dense>
                <QToggle
                  v-model="visibleColumns"
                  :val="col.name"
                  :label="col.label"
                  dense
                />
                <QTooltip
                  v-if="col.tooltip"
                  anchor="center right"
                  self="center left"
                >
                  {{ col.tooltip }}
                </QTooltip>
              </QItem>
            </QList>
          </QMenu>
        </QBtn>
      </div>
    </template>
    <template #header-cell="scope">
      <QTh :props="scope">
        {{ scope.col.label }}
        <QTooltip
          v-if="scope.col.tooltip"
          :delay="TOOLTIP_DELAY"
          anchor="top middle"
          self="center middle"
        >
          {{ scope.col.tooltip }}
        </QTooltip>
      </QTh>
    </template>
  </QTable>
</template>

<style scoped lang="scss">
.q-input {
  width: 120px;
}
:deep(.non-visible) {
  background-color: rgba($negative, 0.1);
}
</style>
