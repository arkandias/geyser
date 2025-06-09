<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed, watch } from "vue";

import { usePermissions } from "@/composables/usePermissions.ts";
import { useQueryParam } from "@/composables/useQueryParam.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import {
  GetCourseDetailsDocument,
  GetCourseRowsDocument,
  GetServiceRowsDocument,
} from "@/gql/graphql.ts";
import {
  hSplitterRatio,
  useLeftPanelStore,
  vSplitterRatio,
} from "@/stores/useLeftPanelStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

import TableCourses from "@/components/TableCourses.vue";
import TableServices from "@/components/TableServices.vue";
import CourseDetails from "@/components/course/CourseDetails.vue";

graphql(`
  query GetCourseRows($year: Int!) {
    courses: course(
      where: {
        _and: [
          { year: { _eq: $year } }
          { hoursEffective: { _gt: 0 } }
          { groupsEffective: { _gt: 0 } }
        ]
      }
      orderBy: [
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { track: { name: ASC } }
        { semester: ASC }
        { name: ASC }
        { type: { label: ASC } }
      ]
    ) {
      ...CourseRow
    }
  }

  query GetServiceRows($year: Int!) {
    services: service(
      where: { year: { _eq: $year } }
      orderBy: [{ teacher: { lastname: ASC } }, { teacher: { firstname: ASC } }]
    ) {
      ...ServiceRow
      ...TableCoursesService
    }
  }

  query GetCourseDetails($oid: Int!, $courseId: Int!) {
    course: courseByPk(oid: $oid, id: $courseId) {
      ...CourseDetails
    }
  }
`);

const { t } = useTypedI18n();
const { activeYear, isCurrentYearActive } = useYearsStore();
const { closeLeftPanel, isLeftPanelOpen, openLeftPanel } = useLeftPanelStore();
const perm = usePermissions();

// Course rows
const getCourseRows = useQuery({
  query: GetCourseRowsDocument,
  variables: () => ({ year: activeYear.value ?? -1 }),
  pause: () => activeYear.value === null,
  context: { additionalTypenames: ["All", "Priority", "Request"] },
});
const fetchingCourseRows = computed(() => getCourseRows.fetching.value);
const courseRows = computed(() => getCourseRows.data.value?.courses ?? []);

// Service rows
const getServiceRows = useQuery({
  query: GetServiceRowsDocument,
  variables: () => ({
    year: activeYear.value ?? -1,
  }),
  pause: () => activeYear.value === null,
  context: {
    additionalTypenames: [
      "All",
      "Priority",
      "Request",
      "Service",
      "ServiceModification",
    ],
  },
});
const fetchingServiceRows = computed(() => getServiceRows.fetching.value);
const serviceRows = computed(() => getServiceRows.data.value?.services ?? []);

// Selected course details
const { getValue: selectedCourse } = useQueryParam("courseId", true);
const getCourseDetails = useQuery({
  query: GetCourseDetailsDocument,
  variables: () => ({ courseId: selectedCourse.value ?? -1 }),
  pause: () => selectedCourse.value === null,
  context: {
    additionalTypenames: [
      "All",
      "Coordination",
      "Course",
      "Priority",
      "Request",
    ],
  },
});
const courseDetails = computed(() =>
  selectedCourse.value === null
    ? null
    : (getCourseDetails.data.value?.course ?? null),
);

// Toggle left panel based on user's permissions
watch(
  () => perm.toViewAllServices,
  (value) => {
    if (value) {
      openLeftPanel();
    } else {
      closeLeftPanel();
    }
  },
  { immediate: true },
);

const warningMessage = computed(() =>
  activeYear.value === null
    ? t("courses.warning.noActiveYear")
    : !isCurrentYearActive.value
      ? t("courses.warning.archive", { year: activeYear.value })
      : "",
);
</script>

<template>
  <QPage>
    <QCard v-if="warningMessage" id="warning-header" class="text-body1">
      {{ warningMessage }}
    </QCard>
    <QSplitter
      id="first-splitter"
      v-model="vSplitterRatio"
      :limits="[0, 100]"
      :disable="!isLeftPanelOpen"
    >
      <template #before>
        <TableServices
          :service-row-fragments="serviceRows"
          :fetching="fetchingServiceRows"
        />
      </template>
      <template #after>
        <QSplitter
          id="second-splitter"
          v-model="hSplitterRatio"
          horizontal
          :limits="[0, 100]"
        >
          <template #before>
            <TableCourses
              :course-row-fragments="courseRows"
              :fetching="fetchingCourseRows"
              :service-fragments="serviceRows"
            />
          </template>
          <template #after>
            <CourseDetails :data-fragment="courseDetails" />
          </template>
        </QSplitter>
      </template>
    </QSplitter>
  </QPage>
</template>

<style scoped lang="scss">
#warning-header {
  height: $warning-height;
  text-align: center;
  background-color: $accent;
  color: black;
}
.q-splitter :deep(.q-splitter__separator) {
  background-color: $primary;
}
.dev .q-splitter :deep(.q-splitter__separator) {
  background-color: $secondary;
}

// Adjust splitters height to window's height
// and set tables height for sticky headers
#first-splitter,
#first-splitter :deep(.sticky-header-table) {
  height: calc(100vh - $header-height);
}
#warning-header + #first-splitter,
#warning-header + #first-splitter :deep(.sticky-header-table) {
  height: calc(100vh - $header-height - $warning-height);
}
#first-splitter #second-splitter :deep(.sticky-header-table) {
  height: calc((100vh - $header-height) * v-bind("hSplitterRatio") / 100);
}
/* prettier-ignore */
#warning-header + #first-splitter #second-splitter :deep(.sticky-header-table) {
  height: calc((100vh - $header-height - $warning-height) * v-bind('hSplitterRatio') / 100);
}

// sticky header tables
:deep(.sticky-header-table) {
  thead tr:first-child th {
    background-color: #ffffff;
    top: 0;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }
  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }
  /* prevent scrolling behind sticky top row on focus */
  tbody {
    /* height of all previous header rows */
    scroll-margin-top: 48px;
  }
}
/* background color in dark mode */
.body--dark :deep(.sticky-header-table) thead tr:first-child th {
  background-color: $dark;
}
</style>
