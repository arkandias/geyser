<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminCoordinationsDocument } from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import AdminCoordinationsCourses from "@/components/admin/AdminCoordinationsCourses.vue";
import AdminCoordinationsPrograms from "@/components/admin/AdminCoordinationsPrograms.vue";
import AdminCoordinationsTracks from "@/components/admin/AdminCoordinationsTracks.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

graphql(`
  query GetAdminCoordinations($oid: Int!) {
    coordinations: coordination(
      where: { _and: [{ oid: { _eq: $oid } }] }
      orderBy: [
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { teacher: { lastname: ASC } }
        { teacher: { firstname: ASC } }
      ]
    ) {
      ...AdminCoordinationProgram
      ...AdminCoordinationTrack
      ...AdminCoordinationCourse
    }
    teachers: teacher(
      where: { oid: { _eq: $oid } }
      orderBy: [{ lastname: ASC }, { firstname: ASC }]
    ) {
      ...AdminCoordinationsProgramsTeacher
      ...AdminCoordinationsTracksTeacher
      ...AdminCoordinationsCoursesTeacher
    }
    degrees: degree(where: { oid: { _eq: $oid } }, orderBy: [{ name: ASC }]) {
      ...AdminCoordinationsProgramsDegree
      ...AdminCoordinationsTracksDegree
      ...AdminCoordinationsCoursesDegree
    }
    programs: program(
      where: { oid: { _eq: $oid } }
      orderBy: [{ degree: { name: ASC } }, { name: ASC }]
    ) {
      ...AdminCoordinationsProgramsProgram
      ...AdminCoordinationsTracksProgram
      ...AdminCoordinationsCoursesProgram
    }
    tracks: track(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { name: ASC }
      ]
    ) {
      ...AdminCoordinationsTracksTrack
      ...AdminCoordinationsCoursesTrack
    }
    terms: term(where: { oid: { _eq: $oid } }, orderBy: { label: ASC }) {
      ...AdminCoordinationsCoursesTerm
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
      ...AdminCoordinationsCoursesCourse
    }
    courseTypes: courseType(
      where: { oid: { _eq: $oid } }
      orderBy: { label: ASC }
    ) {
      ...AdminCoordinationsCoursesCourseType
    }
  }
`);

const { data, fetching } = useQuery({
  query: GetAdminCoordinationsDocument,
  variables: { oid: organization.id },
  context: {
    additionalTypenames: [
      "All",
      "Coordination",
      "Course",
      "CourseType",
      "Degree",
      "Program",
      "Teacher",
      "Term",
      "Track",
    ],
  },
});
const coordinations = computed(() => data.value?.coordinations ?? []);
const teachers = computed(() => data.value?.teachers ?? []);
const degrees = computed(() => data.value?.degrees ?? []);
const programs = computed(() => data.value?.programs ?? []);
const tracks = computed(() => data.value?.tracks ?? []);
const terms = computed(() => data.value?.terms ?? []);
const courses = computed(() => data.value?.courses ?? []);
const courseTypes = computed(() => data.value?.courseTypes ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection
      icon="sym_s_account_tree"
      :label="t('admin.coordinations.programs.label')"
    >
      <AdminCoordinationsPrograms
        :fetching
        :coordination-fragments="coordinations"
        :teacher-fragments="teachers"
        :degree-fragments="degrees"
        :program-fragments="programs"
      />
    </AdminSection>

    <QSeparator />
    <AdminSection
      icon="sym_s_alt_route"
      :label="t('admin.coordinations.tracks.label')"
    >
      <AdminCoordinationsTracks
        :fetching
        :coordination-fragments="coordinations"
        :teacher-fragments="teachers"
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
      />
    </AdminSection>

    <QSeparator />
    <AdminSection
      icon="sym_s_menu_book"
      :label="t('admin.coordinations.courses.label')"
    >
      <AdminCoordinationsCourses
        :fetching
        :coordination-fragments="coordinations"
        :teacher-fragments="teachers"
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
        :term-fragments="terms"
        :course-fragments="courses"
        :course-type-fragments="courseTypes"
      />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
