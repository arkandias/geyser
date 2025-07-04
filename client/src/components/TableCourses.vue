<script setup lang="ts">
import { useQuasar } from "quasar";
import { computed, ref, watch } from "vue";

import { useDownloadAssignments } from "@/composables/useDownloadAssignments.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useQueryParam } from "@/composables/useQueryParam.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type CourseRowFragment,
  CourseRowFragmentDoc,
  RequestTypeEnum,
  TableCoursesServiceFragmentDoc,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type { Column } from "@/types/column.ts";
import {
  compare,
  getField,
  localeCompare,
  normalizeForSearch,
  unique,
  uniqueValue,
} from "@/utils";

import PageService from "@/pages/PageService.vue";

const { courseRowFragments, serviceFragments } = defineProps<{
  courseRowFragments: FragmentType<typeof CourseRowFragmentDoc>[];
  serviceFragments: FragmentType<typeof TableCoursesServiceFragmentDoc>[];
  fetching?: boolean;
}>();

graphql(`
  fragment CourseRow on Course {
    id
    name: nameDisplay
    visible
    program {
      degree {
        name: nameDisplay
        visible
      }
      id
      name: nameDisplay
      visible
    }
    track {
      name: nameDisplay
      visible
    }
    term {
      label
    }
    type {
      label
      coefficient
    }
    numberOfGroups: groupsEffective
    hoursPerGroup: hoursEffective
    hoursTotal: hoursEffectiveTotal
    requests {
      serviceId
      type
      hours
      isPriority
    }
  }

  fragment TableCoursesService on Service {
    id
    teacher {
      displayname
    }
  }
`);

const $q = useQuasar();
const { t, n } = useTypedI18n();
const { downloadAssignments } = useDownloadAssignments();
const { organization } = useOrganizationStore();
const { activeYear } = useYearsStore();
const perm = usePermissions();

// Service selection
const { getValue: selectedService, setValue: selectService } = useQueryParam(
  "serviceId",
  true,
);
const services = computed(() =>
  serviceFragments.map((f) => useFragment(TableCoursesServiceFragmentDoc, f)),
);
const teacher = computed(
  () =>
    services.value.find((s) => s.id === selectedService.value)?.teacher ?? null,
);

// Table
const title = computed(
  () => teacher.value?.displayname ?? t("courses.table.courses.title"),
);
const noResultsLabel = computed(() =>
  courses.value.length
    ? t("courses.table.courses.noResults")
    : t("courses.table.courses.noData"),
);

// Options
const stickyHeader = ref(false);
const weightedHours = ref(false);
const unit = computed(() =>
  weightedHours.value ? t("unit.weightedHours") : t("unit.hours"),
);

// Rows definition
type CourseRow = Omit<CourseRowFragment, "hoursPerGroup" | "numberOfGroups"> & {
  hours: number;
  groups: number;
  totalAssignment: number;
  totalPrimary: number;
  totalSecondary: number;
  diffAssignment: number | null;
  diffPrimary: number | null;
  diffPrimaryPriority: number | null;
};
const courses = computed<CourseRow[]>(() =>
  courseRowFragments.map((f) => {
    const { hoursPerGroup, numberOfGroups, requests, ...rest } = useFragment(
      CourseRowFragmentDoc,
      f,
    );
    const totalHours = (hoursPerGroup ?? 0) * (numberOfGroups ?? 0);
    const { totalAssignment, totalPrimary, totalSecondary, totalPriority } =
      requests.reduce(
        (t, r) => ({
          totalAssignment:
            t.totalAssignment +
            (r.type === RequestTypeEnum.Assignment ? r.hours : 0),
          totalPrimary:
            t.totalPrimary + (r.type === RequestTypeEnum.Primary ? r.hours : 0),
          totalSecondary:
            t.totalSecondary +
            (r.type === RequestTypeEnum.Secondary ? r.hours : 0),
          totalPriority:
            t.totalPriority +
            (r.type === RequestTypeEnum.Primary && r.isPriority ? r.hours : 0),
        }),
        {
          totalAssignment: 0,
          totalPrimary: 0,
          totalSecondary: 0,
          totalPriority: 0,
        },
      );
    const weight = weightedHours.value ? rest.type.coefficient : 1;
    return {
      ...rest,
      hours: (hoursPerGroup ?? 0) * weight,
      groups: numberOfGroups ?? 0,
      requests,
      totalAssignment: totalAssignment * weight,
      diffAssignment: (totalHours - totalAssignment) * weight,
      totalPrimary: totalPrimary * weight,
      diffPrimary: (totalHours - totalPrimary) * weight,
      diffPrimaryPriority: (totalHours - totalPriority) * weight,
      totalSecondary: totalSecondary * weight,
    };
  }),
);
const teacherCourses = computed<CourseRow[]>(() =>
  courses.value.map((row) => {
    const teacherRequests = row.requests.filter(
      (r) => r.serviceId === selectedService.value,
    );
    const weight = weightedHours.value ? row.type.coefficient : 1;
    return {
      ...row,
      totalAssignment:
        (teacherRequests.find((r) => r.type === RequestTypeEnum.Assignment)
          ?.hours ?? 0) * weight,
      totalPrimary:
        (teacherRequests.find((r) => r.type === RequestTypeEnum.Primary)
          ?.hours ?? 0) * weight,
      totalSecondary:
        (teacherRequests.find((r) => r.type === RequestTypeEnum.Secondary)
          ?.hours ?? 0) * weight,
      diffAssignment: null,
      diffPrimary: null,
      diffPrimaryPriority: null,
    };
  }),
);

// Row selection
const { getValue: selectedCourse, toggleValue: toggleCourse } = useQueryParam(
  "courseId",
  true,
);
const selectedRow = computed(() => [{ id: selectedCourse.value }]);
const selectRow = async (_: Event, row: CourseRow) => {
  await toggleCourse(row.id);
};

// Columns definition
const columns = computed<Column<CourseRow>[]>(() => [
  {
    name: "degreeProgram",
    label: t("courses.table.courses.column.degreeProgram.label"),
    tooltip: t("courses.table.courses.column.degreeProgram.tooltip"),
    align: "left",
    field: (row) => `${row.program.degree.name} ${row.program.name}`,
    required: true,
    sortable: true,
    sort: localeCompare,
    visible: true,
    searchable: true,
  },
  {
    name: "track",
    label: t("courses.table.courses.column.track.label"),
    tooltip: t("courses.table.courses.column.track.tooltip"),
    align: "left",
    field: (row) => row.track?.name,
    required: true,
    sortable: true,
    sort: localeCompare,
    visible: true,
    searchable: true,
  },
  {
    name: "term",
    label: t("courses.table.courses.column.term.label"),
    tooltip: t("courses.table.courses.column.term.tooltip"),
    align: "left",
    field: (row) => row.term.label,
    required: true,
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "name",
    label: t("courses.table.courses.column.name.label"),
    tooltip: t("courses.table.courses.column.name.tooltip"),
    align: "left",
    field: "name",
    format: (val: string) => (val.length > 40 ? val.slice(0, 40) + "…" : val),
    required: true,
    sortable: true,
    sort: localeCompare,
    visible: true,
    searchable: true,
  },
  {
    name: "type",
    label: t("courses.table.courses.column.type.label"),
    tooltip: t("courses.table.courses.column.type.tooltip"),
    align: "left",
    field: (row) => row.type.label,
    required: true,
    sortable: true,
    sort: localeCompare,
    visible: true,
    searchable: false,
  },
  {
    name: "groups",
    label: t("courses.table.courses.column.groups.label"),
    tooltip: t("courses.table.courses.column.groups.tooltip"),
    align: "left",
    field: "groups",
    format: (val: number) => n(val, "decimal"),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "hours",
    label: t("courses.table.courses.column.hours.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.column.hours.tooltip"),
    align: "left",
    field: "hours",
    format: (val: number) => n(val, "decimal"),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "totalAssignment",
    label: t("courses.table.courses.column.totalAssignment.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.column.totalAssignment.tooltip"),
    field: "totalAssignment",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: perm.toViewAssignments,
    searchable: false,
    badge: true,
  },
  {
    name: "totalPrimary",
    label: t("courses.table.courses.column.totalPrimary.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.column.totalPrimary.tooltip"),
    field: "totalPrimary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
    badge: true,
  },
  {
    name: "totalSecondary",
    label: t("courses.table.courses.column.totalSecondary.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.column.totalSecondary.tooltip"),
    field: "totalSecondary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
    badge: true,
  },
  {
    name: "diffAssignment",
    label: t("courses.table.courses.column.diffAssignment.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.column.diffAssignment.tooltip"),
    field: "diffAssignment",
    format: (val: number | null) =>
      val === null ? "–" : n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
    badge: true,
  },
  {
    name: "diffPrimary",
    label: t("courses.table.courses.column.diffPrimary.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.column.diffPrimary.tooltip"),
    field: "diffPrimary",
    format: (val: number | null) =>
      val === null ? "–" : n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
    badge: true,
  },
  {
    name: "diffPrimaryPriority",
    label: t("courses.table.courses.column.diffPrimaryPriority.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.column.diffPrimaryPriority.tooltip"),
    field: "diffPrimaryPriority",
    format: (val: number | null) =>
      val === null ? "–" : n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
    badge: true,
  },
]);

// Columns order
// eslint-disable-next-line vue/no-ref-object-reactivity-loss
const defaultColumnsOrder = columns.value.map((col) => col.name);
const storedColumnsOrder = $q.localStorage.getItem(
  "table_courses_columns_order",
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
const orderedColumns = computed<Column<CourseRow>[]>(() =>
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
  $q.localStorage.set("table_courses_columns_order", value);
});

// Column visibility
const defaultVisibleColumns =
  // eslint-disable-next-line vue/no-ref-object-reactivity-loss
  columns.value.filter((col) => col.visible).map((col) => col.name);
const storedVisibleColumns = $q.localStorage.getItem(
  "table_courses_visible_columns",
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
  $q.localStorage.set("table_courses_visible_columns", value);
});

// Columns menu
const isMenuColumnsOpen = ref(false);
const isMenuColumnsTooltipVisible = ref(false);
const resetColumns = () => {
  columnsOrder.value = defaultColumnsOrder;
  visibleColumns.value = defaultVisibleColumns;
};

// Filters
// Programs
const degreePrograms = ref<number[]>([]);
const degreeProgramOptions = computed(() =>
  courses.value
    .map((c) => ({
      value: c.program.id,
      label: `${c.program.degree.name} ${c.program.name}`,
    }))
    .filter(uniqueValue("value"))
    .sort(compare("label")),
);

// Terms
const terms = ref<string[]>([]);
const termOptions = computed(() =>
  courses.value
    .map((c) => c.term.label)
    .filter(unique)
    .sort(localeCompare),
);

// Types
const types = ref<string[]>([]);
const typeOptions = computed(() =>
  courses.value
    .map((c) => c.type.label)
    .filter(unique)
    .sort(localeCompare),
);

// Search
const search = ref<string | null>(null);

// Filter attributes
const filterObj = computed(() => ({
  serviceId: selectedService.value ?? null,
  programs: degreePrograms.value,
  terms: terms.value,
  types: types.value,
  search: normalizeForSearch(search.value ?? ""),
  searchColumns: columns.value.filter((col) => col.searchable),
}));
const filterMethod = (
  rows: readonly CourseRow[],
  terms: typeof filterObj.value,
): readonly CourseRow[] =>
  rows.filter((row) =>
    terms.serviceId
      ? row.requests.some((r) => r.serviceId === terms.serviceId)
      : (terms.programs.length === 0 ||
          terms.programs.some((p) => p === row.program.id)) &&
        (terms.terms.length === 0 ||
          terms.terms.some((t) => t === row.term.label)) &&
        (terms.types.length === 0 ||
          terms.types.some((t) => t === row.type.label)) &&
        terms.searchColumns.some((col) =>
          normalizeForSearch(String(getField(row, col.field))).includes(
            terms.search,
          ),
        ),
  );

// Row styling
const isAssigned = computed(
  () => (row: CourseRow) =>
    selectedService.value !== null &&
    row.requests.some(
      (r) =>
        r.serviceId === selectedService.value &&
        r.type === RequestTypeEnum.Assignment,
    ),
);
const isVisible = (row: CourseRow) =>
  row.visible &&
  row.program.degree.visible &&
  row.program.visible &&
  (row.track?.visible ?? true);
const tableRowClassFn = computed(
  () => (row: CourseRow) =>
    isAssigned.value(row) ? "assigned" : !isVisible(row) ? "non-visible" : "",
);

// Teacher buttons
const showTeacherDetails = ref(false);
const downloadTeacherAssignments = async () => {
  if (
    activeYear.value === null ||
    selectedService.value === null ||
    !teacher.value
  ) {
    return;
  }
  await downloadAssignments(
    {
      oid: organization.id,
      year: activeYear.value,
      where: { serviceId: { _eq: selectedService.value } },
    },
    `${activeYear.value} ${teacher.value.displayname}`,
  );
};
</script>

<template>
  <QDialog v-model="showTeacherDetails" square>
    <QLayout view="hHh lpR fFf" container>
      <QPageContainer>
        <PageService />
      </QPageContainer>
    </QLayout>
  </QDialog>

  <QTable
    :columns="orderedColumns"
    :visible-columns
    :rows="teacher ? teacherCourses : courses"
    :selected="selectedRow"
    :loading="fetching"
    :pagination="{ rowsPerPage: 100 }"
    :rows-per-page-options="[0, 10, 20, 50, 100]"
    :filter="filterObj"
    :filter-method
    :table-row-class-fn
    :loading-label="t('courses.table.courses.loading')"
    :no-results-label
    flat
    square
    dense
    virtual-scroll
    :class="{ 'sticky-header-table': stickyHeader }"
    @row-click="selectRow"
  >
    <template #top>
      <div class="q-table__title">
        {{ title }}
        <QBtn
          v-if="teacher"
          icon="sym_s_id_card"
          color="primary"
          size="sm"
          flat
          square
          dense
          @click="showTeacherDetails = true"
        >
          <QTooltip :delay="TOOLTIP_DELAY">
            {{ t("courses.table.courses.options.teacher.viewDetails") }}
          </QTooltip>
        </QBtn>
        <QBtn
          v-if="teacher && perm.toViewAssignments"
          icon="sym_s_download"
          color="primary"
          size="sm"
          flat
          square
          dense
          @click="downloadTeacherAssignments()"
        >
          <QTooltip :delay="TOOLTIP_DELAY">
            {{ t("courses.table.courses.options.teacher.downloadAssignments") }}
          </QTooltip>
        </QBtn>
        <QBtn
          v-if="teacher"
          icon="sym_s_close"
          color="primary"
          size="sm"
          flat
          square
          dense
          @click="selectService()"
        >
          <QTooltip :delay="TOOLTIP_DELAY">
            {{ t("courses.table.courses.options.teacher.deselect") }}
          </QTooltip>
        </QBtn>
      </div>
      <QSpace />
      <div class="row q-gutter-md">
        <QSelect
          v-model="degreePrograms"
          :options="degreeProgramOptions"
          :disable="!!teacher"
          :label="t('courses.table.courses.filters.degreeProgram')"
          emit-value
          map-options
          multiple
          use-chips
          square
          dense
          options-dense
        />
        <QSelect
          v-model="terms"
          :options="termOptions"
          :disable="!!teacher"
          :label="t('courses.table.courses.filters.term')"
          emit-value
          map-options
          multiple
          use-chips
          square
          dense
          options-dense
        />
        <QSelect
          v-model="types"
          :options="typeOptions"
          :disable="!!teacher"
          :label="t('courses.table.courses.filters.type')"
          multiple
          use-chips
          square
          dense
          options-dense
        />
        <QInput
          v-model="search"
          :disable="!!teacher"
          :placeholder="t('courses.table.courses.filters.search')"
          clearable
          clear-icon="sym_s_close"
          square
          dense
        />
        <QToggle v-model="weightedHours" icon="sym_s_function" dense>
          <QTooltip>
            {{ t("courses.table.courses.options.weightedHours") }}
          </QTooltip>
        </QToggle>
        <QToggle v-model="stickyHeader" icon="sym_s_scrollable_header" dense>
          <QTooltip>
            {{ t("courses.table.courses.options.stickyHeader") }}
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
            {{ t("courses.table.courses.options.columns") }}
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
                  {{ t("courses.table.courses.options.columns") }}
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
                  anchor="center left"
                  self="center right"
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
                  {{ t("courses.table.courses.options.resetColumns") }}
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
        <QBadge v-if="props.col.badge" color="primary">
          {{ props.value }}
        </QBadge>
        <template v-else>{{ props.value }}</template>
      </QTd>
    </template>
  </QTable>
</template>

<style scoped lang="scss">
.q-layout-container {
  width: $page-service-width;
}
.body--dark .page-service-layout {
  background-color: $dark;
}
.q-select {
  min-width: 120px;
}
.q-input {
  width: 120px;
}
:deep(.non-visible) {
  background-color: rgba($negative, 0.1);
}
:deep(.assigned) {
  background-color: rgba($positive, 0.1);
}
</style>
