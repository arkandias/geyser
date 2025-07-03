<script setup lang="ts">
import { useQuasar } from "quasar";
import { computed, ref, watch } from "vue";

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
import {
  getField,
  localeCompare,
  normalizeForSearch,
  priorityColor,
} from "@/utils";

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
    externalCourses {
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

const $q = useQuasar();
const { t, n } = useTypedI18n();
const perm = usePermissions();

// Options
const stickyHeader = ref(false);

// Badge color
const greaterThanOrEqualToModifiedService = (
  col: Column<ServiceRow>,
  row: ServiceRow,
) =>
  priorityColor(
    Number(row[col.name as keyof ServiceRow]) >= row.modifiedService,
  );
const nonPositive = (col: Column<ServiceRow>, row: ServiceRow) =>
  priorityColor(Number(row[col.name as keyof ServiceRow]) <= 0);

type ServiceRow = Omit<
  ServiceRowFragment,
  "hours" | "modifications" | "externalCourses" | "requests"
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
    const { hours, modifications, externalCourses, requests, ...rest } =
      useFragment(ServiceRowFragmentDoc, f);
    const totalModifications = modifications.reduce((t, m) => t + m.hours, 0);
    const totalExternalCourses = externalCourses.reduce(
      (t, c) => t + c.hours,
      0,
    );
    const { totalAssignment, totalPrimary, totalSecondary } = requests.reduce(
      (t, r) => ({
        totalAssignment:
          t.totalAssignment +
          (r.type === RequestTypeEnum.Assignment ? (r.hoursWeighted ?? 0) : 0),
        totalPrimary:
          t.totalPrimary +
          (r.type === RequestTypeEnum.Primary ? (r.hoursWeighted ?? 0) : 0),
        totalSecondary:
          t.totalSecondary +
          (r.type === RequestTypeEnum.Secondary ? (r.hoursWeighted ?? 0) : 0),
      }),
      {
        totalAssignment: 0,
        totalPrimary: 0,
        totalSecondary: 0,
      },
    );
    const modifiedService = hours - totalModifications - totalExternalCourses;
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
    label: t("courses.table.services.column.lastname.label"),
    tooltip: t("courses.table.services.column.lastname.tooltip"),
    align: "left",
    field: (row) => row.teacher.lastname,
    required: true,
    sortable: true,
    sort: localeCompare,
    visible: true,
    searchable: true,
  },
  {
    name: "firstname",
    label: t("courses.table.services.column.firstname.label"),
    tooltip: t("courses.table.services.column.firstname.tooltip"),
    align: "left",
    field: (row) => row.teacher.firstname,
    required: true,
    sortable: true,
    sort: localeCompare,
    visible: true,
    searchable: true,
  },
  {
    name: "alias",
    label: t("courses.table.services.column.alias.label"),
    tooltip: t("courses.table.services.column.alias.tooltip"),
    align: "left",
    field: (row) => row.teacher.alias,
    sortable: true,
    sort: localeCompare,
    visible: false,
    searchable: true,
  },
  {
    name: "message",
    label: t("courses.table.services.column.message.label"),
    tooltip: t("courses.table.services.column.message.tooltip"),
    align: "center",
    field: (row) => !!row.messages[0]?.content,
    format: (val: boolean) => (val ? "✓" : "✗"),
    sortable: true,
    visible: false,
    searchable: false,
  },
  {
    name: "modifiedService",
    label: t("courses.table.services.column.modifiedService.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.column.modifiedService.tooltip"),
    field: "modifiedService",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "totalAssignment",
    label: t("courses.table.services.column.totalAssignment.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.column.totalAssignment.tooltip"),
    field: "totalAssignment",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: perm.toViewAssignments,
    searchable: false,
    badgeColor: greaterThanOrEqualToModifiedService,
  },
  {
    name: "totalPrimary",
    label: t("courses.table.services.column.totalPrimary.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.column.totalPrimary.tooltip"),
    field: "totalPrimary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
    badgeColor: greaterThanOrEqualToModifiedService,
  },
  {
    name: "totalSecondary",
    label: t("courses.table.services.column.totalSecondary.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.column.totalSecondary.tooltip"),
    field: "totalSecondary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
    badgeColor: greaterThanOrEqualToModifiedService,
  },
  {
    name: "diffAssignment",
    label: t("courses.table.services.column.diffAssignment.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.column.diffAssignment.tooltip"),
    field: "diffAssignment",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
    badgeColor: nonPositive,
  },
  {
    name: "diffPrimary",
    label: t("courses.table.services.column.diffPrimary.label", {
      unit: t("unit.weightedHours"),
    }),
    tooltip: t("courses.table.services.column.diffPrimary.tooltip"),
    field: "diffPrimary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
    badgeColor: nonPositive,
  },
]);

// Columns order
// eslint-disable-next-line vue/no-ref-object-reactivity-loss
const defaultColumnsOrder = columns.value.map((col) => col.name);
const storedColumnsOrder = $q.localStorage.getItem(
  "table_services_columns_order",
);
const columnsOrder = ref(
  Array.isArray(storedColumnsOrder)
    ? [...defaultColumnsOrder].sort(
        (x, y) => storedColumnsOrder.indexOf(x) - storedColumnsOrder.indexOf(y),
      )
    : [...defaultColumnsOrder],
);
const isFirst = (name: string) => columnsOrder.value.indexOf(name) === 0;
const isLast = (name: string) =>
  columnsOrder.value.indexOf(name) === columnsOrder.value.length - 1;
const orderedColumns = computed<Column<ServiceRow>[]>(() =>
  columnsOrder.value
    .map((name) => columns.value.find((col) => col.name === name))
    .filter((col) => col !== undefined),
);
const move = (name: string, direction: number) => {
  const index = columnsOrder.value.findIndex((x) => x === name);
  const newIndex = index + direction;
  if (!columnsOrder.value[index] || !columnsOrder.value[newIndex]) {
    return;
  }
  [columnsOrder.value[index], columnsOrder.value[newIndex]] = [
    columnsOrder.value[newIndex],
    columnsOrder.value[index],
  ];
};
const up = (name: string) => {
  move(name, -1);
};
const down = (name: string) => {
  move(name, 1);
};
watch(columnsOrder, (value) => {
  $q.localStorage.set("table_services_columns_order", value);
});

// Column visibility
const defaultVisibleColumns =
  // eslint-disable-next-line vue/no-ref-object-reactivity-loss
  columns.value.filter((col) => col.visible).map((col) => col.name);
const storedVisibleColumns = $q.localStorage.getItem(
  "table_services_visible_columns",
);
const visibleColumns = ref(
  Array.isArray(storedVisibleColumns)
    ? // eslint-disable-next-line vue/no-ref-object-reactivity-loss
      columns.value
        .map((col) => col.name)
        .filter((name) => storedVisibleColumns.includes(name))
    : [...defaultVisibleColumns],
);
watch(visibleColumns, (value) => {
  $q.localStorage.set("table_services_visible_columns", value);
});

// Columns menu
const isMenuColumnsOpen = ref(false);
const isMenuColumnsTooltipVisible = ref(false);
const resetColumns = () => {
  columnsOrder.value = defaultColumnsOrder;
  visibleColumns.value = defaultVisibleColumns;
};

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

// Row styling
const tableRowClassFn = (row: ServiceRowFragment) =>
  row.teacher.visible ? "" : "non-visible";
</script>

<template>
  <QTable
    :title="t('courses.table.services.title')"
    :columns="orderedColumns"
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
            {{ t("courses.table.services.options.columns") }}
          </QTooltip>
          <QMenu
            v-model="isMenuColumnsOpen"
            square
            dense
            @show="isMenuColumnsTooltipVisible = false"
          >
            <QList>
              <QItem class="flex-center text-no-wrap">
                <QItemLabel header>
                  {{ t("courses.table.services.options.columns") }}
                </QItemLabel>
              </QItem>
              <QSeparator />
              <QItem v-for="col in orderedColumns" :key="col.name" dense>
                <QToggle
                  v-model="visibleColumns"
                  :val="col.name"
                  :label="col.label"
                  :disable="col.required"
                  dense
                />
                <QTooltip
                  v-if="col.tooltip"
                  anchor="center right"
                  self="center left"
                >
                  {{ col.tooltip }}
                </QTooltip>
                <QSpace />
                <QBtn
                  icon="sym_s_keyboard_arrow_up"
                  color="primary"
                  :disable="isFirst(col.name)"
                  flat
                  square
                  dense
                  @click="up(col.name)"
                />
                <QBtn
                  icon="sym_s_keyboard_arrow_down"
                  color="primary"
                  :disable="isLast(col.name)"
                  flat
                  square
                  dense
                  @click="down(col.name)"
                />
              </QItem>
              <QSeparator />
              <QItem clickable class="text-no-wrap" @click="resetColumns()">
                <QItemSection side>
                  <QIcon name="sym_s_restart_alt" color="primary" />
                </QItemSection>
                <QItemSection>
                  {{ t("courses.table.services.options.resetColumns") }}
                </QItemSection>
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
    <template #body-cell="props">
      <QTd :props>
        <QBadge
          v-if="props.col.badgeColor"
          :color="props.col.badgeColor(props.col, props.row)"
        >
          {{ props.value }}
        </QBadge>
        <template v-else>{{ props.value }}</template>
      </QTd>
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
