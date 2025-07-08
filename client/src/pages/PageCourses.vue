<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed, watch } from "vue";

import { usePermissions } from "@/composables/usePermissions.ts";
import { useQueryParam } from "@/composables/useQueryParam.ts";
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
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import { bgColor } from "@/utils";

import TableCourses from "@/components/TableCourses.vue";
import TableServices from "@/components/TableServices.vue";
import CourseDetails from "@/components/course/CourseDetails.vue";

graphql(`
  query GetCourseRows($oid: Int!, $year: Int!) {
    courses: course(
      where: {
        _and: [
          { oid: { _eq: $oid } }
          { year: { _eq: $year } }
          { hoursEffective: { _gt: 0 } }
          { groupsEffective: { _gt: 0 } }
        ]
      }
      orderBy: [
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { track: { name: ASC } }
        { term: { label: ASC } }
        { name: ASC }
        { type: { label: ASC } }
      ]
    ) {
      ...CourseRow
    }
  }

  query GetServiceRows($oid: Int!, $year: Int!, $where: ServiceBoolExp!) {
    services: service(
      where: {
        _and: [{ oid: { _eq: $oid } }, { year: { _eq: $year } }, $where]
      }
      orderBy: [{ teacher: { lastname: ASC } }, { teacher: { firstname: ASC } }]
    ) {
      ...ServiceRow
      ...TableCoursesService
    }
  }

  query GetCourseDetails($oid: Int!, $id: Int!) {
    course: courseByPk(oid: $oid, id: $id) {
      ...CourseDetails
    }
  }
`);

const { closeLeftPanel, isLeftPanelOpen, openLeftPanel } = useLeftPanelStore();
const { organization } = useOrganizationStore();
const { profile } = useProfileStore();
const { activeYear } = useYearsStore();
const perm = usePermissions();

// Course rows
const getCourseRows = useQuery({
  query: GetCourseRowsDocument,
  variables: () => ({
    oid: organization.id,
    year: activeYear.value ?? -1,
  }),
  pause: () => activeYear.value === null,
  context: { additionalTypenames: ["All", "Priority", "Request"] },
});
const fetchingCourseRows = computed(() => getCourseRows.fetching.value);
const courseRows = computed(() => getCourseRows.data.value?.courses ?? []);

// Service rows
const getServiceRows = useQuery({
  query: GetServiceRowsDocument,
  variables: () => ({
    oid: organization.id,
    year: activeYear.value ?? -1,
    where: perm.toViewAllServices
      ? {}
      : { teacher: { id: { _eq: profile.id } } },
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
  variables: () => ({
    oid: organization.id,
    id: selectedCourse.value ?? -1,
  }),
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
</script>

<template>
  <QPage id="courses-page">
    <QSplitter
      id="first-splitter"
      v-model="vSplitterRatio"
      :limits="[0, 100]"
      :disable="!isLeftPanelOpen"
      :separator-class="bgColor"
      before-class="table-services"
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
          :separator-class="bgColor"
          before-class="table-courses"
          after-class="course-details"
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
// Adjust splitters height to window's height and set tables height for sticky headers
#first-splitter,
#first-splitter :deep(.sticky-header-table) {
  height: calc(100vh - $main-toolbar-height);
}
body:has(#warning-toolbar) #first-splitter,
body:has(#warning-toolbar) #first-splitter :deep(.sticky-header-table) {
  height: calc(100vh - $main-toolbar-height - $warning-toolbar-height);
}
#first-splitter #second-splitter :deep(.sticky-header-table) {
  height: calc((100vh - $main-toolbar-height) * v-bind("hSplitterRatio") / 100);
}
/* prettier-ignore */
body:has(#warning-toolbar) #first-splitter #second-splitter :deep(.sticky-header-table) {
  height: calc((100vh - $main-toolbar-height - $warning-toolbar-height) * v-bind('hSplitterRatio') / 100);
}

// Sticky header tables
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
