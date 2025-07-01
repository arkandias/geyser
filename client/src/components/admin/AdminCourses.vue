<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminCoursesDocument } from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import AdminCoursesCourses from "@/components/admin/AdminCoursesCourses.vue";
import AdminCoursesDegrees from "@/components/admin/AdminCoursesDegrees.vue";
import AdminCoursesPrograms from "@/components/admin/AdminCoursesPrograms.vue";
import AdminCoursesTerms from "@/components/admin/AdminCoursesTerms.vue";
import AdminCoursesTracks from "@/components/admin/AdminCoursesTracks.vue";
import AdminCoursesTypes from "@/components/admin/AdminCoursesTypes.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

graphql(`
  query GetAdminCourses($oid: Int!) {
    degrees: degree(where: { oid: { _eq: $oid } }, orderBy: [{ name: ASC }]) {
      ...AdminDegree
      ...AdminProgramsDegree
      ...AdminTracksDegree
      ...AdminCoursesDegree
    }
    programs: program(
      where: { oid: { _eq: $oid } }
      orderBy: [{ degree: { name: ASC } }, { name: ASC }]
    ) {
      ...AdminProgram
      ...AdminTracksProgram
      ...AdminCoursesProgram
    }
    tracks: track(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { program: { degree: { name: ASC } } }
        { program: { name: ASC } }
        { name: ASC }
      ]
    ) {
      ...AdminTrack
      ...AdminCoursesTrack
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
      ...AdminCourse
    }
    terms: term(where: { oid: { _eq: $oid } }, orderBy: { label: ASC }) {
      ...AdminTerm
      ...AdminCoursesTerm
    }
    types: courseType(where: { oid: { _eq: $oid } }, orderBy: { label: ASC }) {
      ...AdminCourseType
      ...AdminCoursesType
    }
  }
`);

const { data, fetching } = useQuery({
  query: GetAdminCoursesDocument,
  variables: { oid: organization.id },
  context: {
    additionalTypenames: [
      "All",
      "Course",
      "CourseType",
      "Degree",
      "Program",
      "Track",
    ],
  },
});
const degrees = computed(() => data.value?.degrees ?? []);
const programs = computed(() => data.value?.programs ?? []);
const tracks = computed(() => data.value?.tracks ?? []);
const courses = computed(() => data.value?.courses ?? []);
const terms = computed(() => data.value?.terms ?? []);
const types = computed(() => data.value?.types ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection icon="sym_s_school" :label="t('admin.courses.degrees.label')">
      <AdminCoursesDegrees :fetching :degree-fragments="degrees" />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_account_tree"
      :label="t('admin.courses.programs.label')"
    >
      <AdminCoursesPrograms
        :fetching
        :degree-fragments="degrees"
        :program-fragments="programs"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_alt_route"
      :label="t('admin.courses.tracks.label')"
    >
      <AdminCoursesTracks
        :fetching
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_calendar_month"
      :label="t('admin.courses.terms.label')"
    >
      <AdminCoursesTerms :fetching :term-fragments="terms" />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_format_list_bulleted"
      :label="t('admin.courses.types.label')"
    >
      <AdminCoursesTypes :fetching :course-type-fragments="types" />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_menu_book"
      :label="t('admin.courses.courses.label')"
    >
      <AdminCoursesCourses
        :fetching
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
        :course-fragments="courses"
        :term-fragments="terms"
        :type-fragments="types"
      />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
