<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminRequestsDocument } from "@/gql/graphql.ts";

import AdminRequestsPriorities from "@/components/admin/AdminRequestsPriorities.vue";
import AdminRequestsRequests from "@/components/admin/AdminRequestsRequests.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();

graphql(`
  query GetAdminRequests {
    requests: request(
      orderBy: [
        { year: DESC }
        { type: ASC }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
        { course: { program: { degree: { name: ASC } } } }
        { course: { program: { name: ASC } } }
        { course: { track: { name: ASC } } }
        { course: { name: ASC } }
        { course: { semester: ASC } }
        { course: { type: { label: ASC } } }
      ]
    ) {
      ...AdminRequest
    }
    priorities: priority(
      orderBy: [
        { year: DESC }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
        { course: { program: { degree: { name: ASC } } } }
        { course: { program: { name: ASC } } }
        { course: { track: { name: ASC } } }
        { course: { name: ASC } }
        { course: { semester: ASC } }
        { course: { type: { label: ASC } } }
      ]
    ) {
      ...AdminPriority
    }
    services: service(
      orderBy: [
        { year: DESC }
        { teacher: { lastname: ASC } }
        { teacher: { firstname: ASC } }
      ]
    ) {
      ...AdminRequestsService
      ...AdminPrioritiesService
    }
    teachers: teacher(orderBy: [{ lastname: ASC }, { firstname: ASC }]) {
      ...AdminRequestsTeacher
      ...AdminPrioritiesTeacher
    }
    courses: course(
      orderBy: [
        { year: DESC }
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { track: { name: ASC } }
        { name: ASC }
        { semester: ASC }
        { type: { label: ASC } }
      ]
    ) {
      ...AdminRequestsCourse
      ...AdminPrioritiesCourse
    }
    degrees: degree(orderBy: [{ name: ASC }]) {
      ...AdminRequestsDegree
      ...AdminPrioritiesDegree
    }
    programs: program(orderBy: [{ degree: { name: ASC } }, { name: ASC }]) {
      ...AdminRequestsProgram
      ...AdminPrioritiesProgram
    }
    tracks: track(
      orderBy: [
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { name: ASC }
      ]
    ) {
      ...AdminRequestsTrack
      ...AdminPrioritiesTrack
    }
    courseTypes: courseType(orderBy: { label: ASC }) {
      ...AdminRequestsCourseType
      ...AdminPrioritiesCourseType
    }
  }
`);

const { data } = useQuery({
  query: GetAdminRequestsDocument,
  variables: {},
  context: {
    additionalTypenames: ["All", "Course", "Priority", "Request", "Service"],
  },
});
const requests = computed(() => data.value?.requests ?? []);
const priorities = computed(() => data.value?.priorities ?? []);
const services = computed(() => data.value?.services ?? []);
const teachers = computed(() => data.value?.teachers ?? []);
const courses = computed(() => data.value?.courses ?? []);
const degrees = computed(() => data.value?.degrees ?? []);
const programs = computed(() => data.value?.programs ?? []);
const tracks = computed(() => data.value?.tracks ?? []);
const courseTypes = computed(() => data.value?.courseTypes ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection
      icon="sym_s_assignment"
      :label="t('admin.requests.requests.label')"
    >
      <AdminRequestsRequests
        :request-fragments="requests"
        :service-fragments="services"
        :teacher-fragments="teachers"
        :course-fragments="courses"
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
        :course-type-fragments="courseTypes"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_assignment_late"
      :label="t('admin.requests.priorities.label')"
    >
      <AdminRequestsPriorities
        :priority-fragments="priorities"
        :service-fragments="services"
        :teacher-fragments="teachers"
        :course-fragments="courses"
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
        :course-type-fragments="courseTypes"
      />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
