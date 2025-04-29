<script setup lang="ts">
import { computed, ref } from "vue";

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
  TableCoursesVServiceFragmentDoc,
} from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type { Column } from "@/types/column.ts";
import {
  compare,
  getField,
  localeCompare,
  normalizeForSearch,
  uniqueValue,
} from "@/utils/misc.ts";

import PageService from "@/pages/PageService.vue";

const { courseRowFragments, vServiceFragments } = defineProps<{
  courseRowFragments: FragmentType<typeof CourseRowFragmentDoc>[];
  vServiceFragments: FragmentType<typeof TableCoursesVServiceFragmentDoc>[];
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
    semester
    type {
      label
      coefficient
    }
    hoursPerGroup: hoursEffective
    numberOfGroups: groupsEffective
    requests {
      serviceId
      type
      hours
      isPriority
    }
  }

  fragment TableCoursesVService on VService {
    id
    teacher: vTeacher {
      displayname
    }
  }
`);

const { t, n } = useTypedI18n();
const { activeYear } = useYearsStore();
const perm = usePermissions();
const { downloadAssignments } = useDownloadAssignments();

// Service selection
const { getValue: selectedService, setValue: selectService } = useQueryParam(
  "serviceId",
  true,
);
const services = computed(() =>
  vServiceFragments.map((f) => useFragment(TableCoursesVServiceFragmentDoc, f)),
);
const teacher = computed(
  () =>
    services.value.find((s) => s.id === selectedService.value)?.teacher ?? null,
);

const title = computed(
  () => teacher.value?.displayname ?? t("courses.table.courses.title"),
);

// Options
const stickyHeader = ref(false);
const weightedHours = ref(false);
const unit = computed(() =>
  weightedHours.value ? t("unit.weightedHours") : t("unit.hours"),
);

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
    return {
      ...row,
      totalAssignment:
        teacherRequests.find((r) => r.type === RequestTypeEnum.Assignment)
          ?.hours ?? 0,
      totalPrimary:
        teacherRequests.find((r) => r.type === RequestTypeEnum.Primary)
          ?.hours ?? 0,
      totalSecondary:
        teacherRequests.find((r) => r.type === RequestTypeEnum.Secondary)
          ?.hours ?? 0,
      diffAssignment: null,
      diffPrimary: null,
      diffPrimaryPriority: null,
    };
  }),
);

const noResultsLabel = computed(() =>
  courses.value.length
    ? t("courses.table.courses.noResults")
    : t("courses.table.courses.noData"),
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
    label: t("courses.table.courses.columns.degreeProgram.label"),
    tooltip: t("courses.table.courses.columns.degreeProgram.tooltip"),
    align: "left",
    field: (row) => `${row.program.degree.name} ${row.program.name}`,
    sort: localeCompare,
    sortable: true,
    visible: true,
    searchable: true,
  },
  {
    name: "track",
    label: t("courses.table.courses.columns.track.label"),
    tooltip: t("courses.table.courses.columns.track.tooltip"),
    align: "left",
    field: (row) => row.track?.name,
    sort: localeCompare,
    sortable: true,
    visible: true,
    searchable: true,
  },
  {
    name: "name",
    label: t("courses.table.courses.columns.name.label"),
    tooltip: t("courses.table.courses.columns.name.tooltip"),
    align: "left",
    field: "name",
    format: (val: string) => (val.length > 40 ? val.slice(0, 40) + "…" : val),
    sort: localeCompare,
    sortable: true,
    visible: true,
    searchable: true,
  },
  {
    name: "semester",
    label: t("courses.table.courses.columns.semester.label"),
    tooltip: t("courses.table.courses.columns.semester.tooltip"),
    align: "left",
    field: "semester",
    format: (val: number) => t("semester", { semester: val }),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "type",
    label: t("courses.table.courses.columns.type.label"),
    tooltip: t("courses.table.courses.columns.type.tooltip"),
    align: "left",
    field: (row) => row.type.label,
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "hours",
    label: t("courses.table.courses.columns.hours.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.columns.hours.tooltip"),
    align: "left",
    field: "hours",
    format: (val: number) => n(val, "decimal"),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "groups",
    label: t("courses.table.courses.columns.groups.label"),
    tooltip: t("courses.table.courses.columns.groups.tooltip"),
    align: "left",
    field: "groups",
    format: (val: number) => n(val, "decimal"),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "totalAssignment",
    label: t("courses.table.courses.columns.totalAssignment.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.columns.totalAssignment.tooltip"),
    field: "totalAssignment",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: perm.toViewAssignments,
    searchable: false,
  },
  {
    name: "diffAssignment",
    label: t("courses.table.courses.columns.diffAssignment.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.columns.diffAssignment.tooltip"),
    field: "diffAssignment",
    format: (val: number | null) =>
      val === null ? "–" : n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
  },
  {
    name: "totalPrimary",
    label: t("courses.table.courses.columns.totalPrimary.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.columns.totalPrimary.tooltip"),
    field: "totalPrimary",
    format: (val: number) => n(val, "decimalFixed"),
    sortable: true,
    visible: true,
    searchable: false,
  },
  {
    name: "diffPrimary",
    label: t("courses.table.courses.columns.diffPrimary.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.columns.diffPrimary.tooltip"),
    field: "diffPrimary",
    format: (val: number | null) =>
      val === null ? "–" : n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
  },
  {
    name: "diffPrimaryPriority",
    label: t("courses.table.courses.columns.diffPrimaryPriority.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.columns.diffPrimaryPriority.tooltip"),
    field: "diffPrimaryPriority",
    format: (val: number | null) =>
      val === null ? "–" : n(val, "decimalFixed"),
    sortable: true,
    visible: false,
    searchable: false,
  },
  {
    name: "totalSecondary",
    label: t("courses.table.courses.columns.totalSecondary.label", {
      unit: unit.value,
    }),
    tooltip: t("courses.table.courses.columns.totalSecondary.tooltip"),
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

// Semesters
const semesters = ref<number[]>([]);
const semesterOptions = computed(() =>
  courses.value
    .map((c) => ({
      value: c.semester,
      label: t("semester", { semester: c.semester }),
    }))
    .filter(uniqueValue("value"))
    .sort(compare("label")),
);

// Course types
const courseTypes = ref<string[]>([]);
const courseTypeOptions = computed(() =>
  courses.value
    .map((c) => c.type)
    .filter(uniqueValue("label"))
    .sort(compare("label")),
);

// Search
const search = ref<string | null>(null);

// Filter attributes
const filterObj = computed(() => ({
  serviceId: selectedService.value ?? null,
  programs: degreePrograms.value,
  semesters: semesters.value,
  courseTypes: courseTypes.value,
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
        (terms.semesters.length === 0 ||
          terms.semesters.includes(row.semester)) &&
        (terms.courseTypes.length === 0 ||
          terms.courseTypes.some((ct) => ct === row.type.label)) &&
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
    :columns
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
          v-model="semesters"
          :options="semesterOptions"
          :disable="!!teacher"
          :label="t('courses.table.courses.filters.semester')"
          emit-value
          map-options
          multiple
          use-chips
          square
          dense
          options-dense
        />
        <QSelect
          v-model="courseTypes"
          :options="courseTypeOptions"
          :disable="!!teacher"
          :label="t('courses.table.courses.filters.type')"
          emit-value
          map-options
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
            {{ t("courses.table.courses.options.visibleColumns") }}
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
                  anchor="center left"
                  self="center right"
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
