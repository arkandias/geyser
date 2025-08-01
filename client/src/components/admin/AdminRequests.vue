<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminRequestsDocument } from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import AdminRequestsPriorities from "@/components/admin/AdminRequestsPriorities.vue";
import AdminRequestsRequests from "@/components/admin/AdminRequestsRequests.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

graphql(`
  query GetAdminRequests($oid: Int!) {
    requests: request(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { year: DESC }
        { type: ASC }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
        { course: { program: { degree: { name: ASC } } } }
        { course: { program: { name: ASC } } }
        { course: { track: { name: ASC } } }
        { course: { term: { label: ASC } } }
        { course: { name: ASC } }
        { course: { type: { label: ASC } } }
      ]
    ) {
      ...AdminRequest
    }
    priorities: priority(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { year: DESC }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
        { course: { program: { degree: { name: ASC } } } }
        { course: { program: { name: ASC } } }
        { course: { track: { name: ASC } } }
        { course: { term: { label: ASC } } }
        { course: { name: ASC } }
        { course: { type: { label: ASC } } }
      ]
    ) {
      ...AdminPriority
    }
    services: service(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { year: DESC }
        { teacher: { lastname: ASC } }
        { teacher: { firstname: ASC } }
      ]
    ) {
      ...AdminRequestsService
      ...AdminPrioritiesService
    }
    teachers: teacher(
      where: { oid: { _eq: $oid } }
      orderBy: [{ lastname: ASC }, { firstname: ASC }]
    ) {
      ...AdminRequestsTeacher
      ...AdminPrioritiesTeacher
    }
    degrees: degree(where: { oid: { _eq: $oid } }, orderBy: [{ name: ASC }]) {
      ...AdminRequestsDegree
      ...AdminPrioritiesDegree
    }
    programs: program(
      where: { oid: { _eq: $oid } }
      orderBy: [{ degree: { name: ASC } }, { name: ASC }]
    ) {
      ...AdminRequestsProgram
      ...AdminPrioritiesProgram
    }
    tracks: track(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { name: ASC }
      ]
    ) {
      ...AdminRequestsTrack
      ...AdminPrioritiesTrack
    }
    courses: course(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { year: DESC }
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { track: { name: ASC } }
        { term: { label: ASC } }
        { name: ASC }
        { type: { label: ASC } }
      ]
    ) {
      ...AdminRequestsCourse
      ...AdminPrioritiesCourse
    }
    terms: term(where: { oid: { _eq: $oid } }, orderBy: { label: ASC }) {
      ...AdminRequestsTerm
      ...AdminPrioritiesTerm
    }
    courseTypes: courseType(
      where: { oid: { _eq: $oid } }
      orderBy: { label: ASC }
    ) {
      ...AdminRequestsCourseType
      ...AdminPrioritiesCourseType
    }
  }
`);

const { data, fetching } = useQuery({
  query: GetAdminRequestsDocument,
  variables: { oid: organization.id },
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
const terms = computed(() => data.value?.terms ?? []);
const courseTypes = computed(() => data.value?.courseTypes ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection
      icon="sym_s_assignment"
      :label="t('admin.requests.requests.label')"
    >
      <AdminRequestsRequests
        :fetching
        :request-fragments="requests"
        :service-fragments="services"
        :teacher-fragments="teachers"
        :course-fragments="courses"
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
        :term-fragments="terms"
        :course-type-fragments="courseTypes"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_assignment_late"
      :label="t('admin.requests.priorities.label')"
    >
      <AdminRequestsPriorities
        :fetching
        :priority-fragments="priorities"
        :service-fragments="services"
        :teacher-fragments="teachers"
        :course-fragments="courses"
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
        :term-fragments="terms"
        :course-type-fragments="courseTypes"
      />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
