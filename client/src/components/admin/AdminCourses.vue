<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminCoursesDocument } from "@/gql/graphql.ts";

import AdminCoursesCourseTypes from "@/components/admin/AdminCoursesCourseTypes.vue";
import AdminCoursesCourses from "@/components/admin/AdminCoursesCourses.vue";
import AdminCoursesDegrees from "@/components/admin/AdminCoursesDegrees.vue";
import AdminCoursesPrograms from "@/components/admin/AdminCoursesPrograms.vue";
import AdminCoursesTracks from "@/components/admin/AdminCoursesTracks.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();

graphql(`
  query GetAdminCourses {
    degrees: degree(orderBy: [{ name: ASC }]) {
      ...AdminDegree
      ...AdminProgramsDegree
      ...AdminTracksDegree
      ...AdminCoursesDegree
    }
    programs: program(orderBy: [{ degree: { name: ASC } }, { name: ASC }]) {
      ...AdminProgram
      ...AdminTracksProgram
      ...AdminCoursesProgram
    }
    tracks: track(
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
      ...AdminCourse
    }
    types: courseType(orderBy: { label: ASC }) {
      ...AdminCourseType
      ...AdminCoursesCourseType
    }
  }
`);

const { data } = useQuery({
  query: GetAdminCoursesDocument,
  variables: {},
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
const types = computed(() => data.value?.types ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection icon="sym_s_school" :label="t('admin.courses.degrees.label')">
      <AdminCoursesDegrees :degree-fragments="degrees" />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_account_tree"
      :label="t('admin.courses.programs.label')"
    >
      <AdminCoursesPrograms
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
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_menu_book"
      :label="t('admin.courses.courses.label')"
    >
      <AdminCoursesCourses
        :degree-fragments="degrees"
        :program-fragments="programs"
        :track-fragments="tracks"
        :course-fragments="courses"
        :course-type-fragments="types"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_format_list_bulleted"
      :label="t('admin.courses.courseTypes.label')"
    >
      <AdminCoursesCourseTypes :course-type-fragments="types" />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
