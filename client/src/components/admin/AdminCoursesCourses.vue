<script lang="ts">
export type ColName =
  | "year"
  | "degree"
  | "program"
  | "track"
  | "name"
  | "nameShort"
  | "semester"
  | "type"
  | "hours"
  | "hoursAdjusted"
  | "groups"
  | "groupsAdjusted"
  | "description"
  | "priorityRule"
  | "visible";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminCourseFragment,
  AdminCourseFragmentDoc,
  AdminCoursesCourseTypeFragmentDoc,
  AdminCoursesDegreeFragmentDoc,
  AdminCoursesProgramFragmentDoc,
  AdminCoursesTrackFragmentDoc,
  CourseConstraint,
  type CourseInsertInput,
  CourseUpdateColumn,
  DeleteCoursesDocument,
  InsertCoursesDocument,
  UpdateCoursesDocument,
  UpsertCoursesDocument,
} from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminCourseFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = CourseInsertInput;

const {
  degreeFragments,
  programFragments,
  trackFragments,
  courseFragments,
  courseTypeFragments,
} = defineProps<{
  degreeFragments: FragmentType<typeof AdminCoursesDegreeFragmentDoc>[];
  programFragments: FragmentType<typeof AdminCoursesProgramFragmentDoc>[];
  trackFragments: FragmentType<typeof AdminCoursesTrackFragmentDoc>[];
  courseFragments: FragmentType<typeof AdminCourseFragmentDoc>[];
  courseTypeFragments: FragmentType<typeof AdminCoursesCourseTypeFragmentDoc>[];
}>();

const { t } = useTypedI18n();
const { years } = useYearsStore();

const idKey: keyof Row = "id";
const rowDescriptor = {
  year: {
    type: "number",
    formType: "select",
  },
  degree: {
    type: "string",
    field: (row) => row.program.degree.name,
    format: (val: string) =>
      degrees.value.find((d) => d.name === val)?.nameDisplay,
    formType: "select",
  },
  program: {
    type: "string",
    field: (row) => row.program.name,
    format: (val: string) =>
      programs.value.find((p) => p.name === val)?.nameDisplay,
    formType: "select",
  },
  track: {
    type: "string",
    nullable: true,
    field: (row) => row.track?.name,
    format: (val: string) =>
      tracks.value.find((t) => t.name === val)?.nameDisplay,
    formType: "select",
  },
  name: {
    type: "string",
    formType: "input",
  },
  nameShort: {
    type: "string",
    nullable: true,
    formType: "input",
  },
  semester: {
    type: "number",
    format: (val: number) => t("semester", { semester: val }),
    formType: "input",
  },
  type: {
    type: "string",
    field: (row) => row.type.label,
    formType: "select",
  },
  hours: {
    type: "number",
    numberFormat: "decimal",
    formType: "inputNum",
  },
  hoursAdjusted: {
    type: "number",
    nullable: true,
    numberFormat: "decimal",
    formType: "inputNum",
  },
  groups: {
    type: "number",
    numberFormat: "decimal",
    formType: "inputNum",
  },
  groupsAdjusted: {
    type: "number",
    nullable: true,
    numberFormat: "decimal",
    formType: "inputNum",
  },
  description: {
    type: "string",
    nullable: true,
    format: (val: string) => (val ? "✓" : "✗"),
    formType: "input",
  },
  priorityRule: {
    type: "number",
    nullable: true,
    formType: "inputNum",
  },
  visible: {
    type: "boolean",
    formType: "toggle",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminCourse on Course {
    id
    year
    program {
      id
      name
      nameDisplay
      degree {
        name
        nameDisplay
      }
    }
    track {
      id
      name
      nameDisplay
    }
    name
    nameShort
    nameDisplay
    semester
    type {
      id
      label
    }
    hours
    hoursAdjusted
    groups
    groupsAdjusted
    description
    priorityRule
    visible
  }

  fragment AdminCoursesDegree on Degree {
    id
    name
    nameDisplay
    programs {
      id
      name
      tracks {
        id
        name
      }
    }
  }

  fragment AdminCoursesProgram on Program {
    id
    name
    nameDisplay
  }

  fragment AdminCoursesTrack on Track {
    id
    name
    nameDisplay
  }

  fragment AdminCoursesCourseType on CourseType {
    id
    label
  }

  mutation InsertCourses($objects: [CourseInsertInput!]!) {
    insertData: insertCourse(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertCourses(
    $objects: [CourseInsertInput!]!
    $onConflict: CourseOnConflict
  ) {
    upsertData: insertCourse(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdateCourses($ids: [Int!]!, $changes: CourseSetInput!) {
    updateData: updateCourse(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeleteCourses($ids: [Int!]!) {
    deleteData: deleteCourse(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const degrees = computed(() =>
  degreeFragments.map((f) => useFragment(AdminCoursesDegreeFragmentDoc, f)),
);
const programs = computed(() =>
  programFragments.map((f) => useFragment(AdminCoursesProgramFragmentDoc, f)),
);
const tracks = computed(() =>
  trackFragments.map((f) => useFragment(AdminCoursesTrackFragmentDoc, f)),
);
const courses = computed(() =>
  courseFragments.map((f) => useFragment(AdminCourseFragmentDoc, f)),
);
const courseTypes = computed(() =>
  courseTypeFragments.map((f) =>
    useFragment(AdminCoursesCourseTypeFragmentDoc, f),
  ),
);
const insertCourses = useMutation(InsertCoursesDocument);
const upsertCourses = useMutation(UpsertCoursesDocument);
const updateCourses = useMutation(UpdateCoursesDocument);
const deleteCourses = useMutation(DeleteCoursesDocument);

const importConstraint =
  CourseConstraint.CourseYearProgramIdTrackIdNameSemesterTypeIdKey;
const importUpdateColumns = [
  CourseUpdateColumn.Year,
  CourseUpdateColumn.ProgramId,
  CourseUpdateColumn.TrackId,
  CourseUpdateColumn.Name,
  CourseUpdateColumn.NameShort,
  CourseUpdateColumn.Semester,
  CourseUpdateColumn.TypeId,
  CourseUpdateColumn.Hours,
  CourseUpdateColumn.HoursAdjusted,
  CourseUpdateColumn.Groups,
  CourseUpdateColumn.GroupsAdjusted,
  CourseUpdateColumn.Description,
  CourseUpdateColumn.PriorityRule,
  CourseUpdateColumn.Visible,
];

const formatRow = (row: Row) =>
  `${row.nameDisplay} (${row.program.degree.nameDisplay}` +
  ` — ${row.program.nameDisplay}` +
  (row.track ? ` — ${row.track.nameDisplay})` : `)`);

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.year !== undefined) {
    object.year = flatRow.year;
  }

  // programId
  if (
    flatRow.degree !== undefined ||
    flatRow.program !== undefined ||
    flatRow.track !== undefined
  ) {
    if (flatRow.degree !== undefined && flatRow.program === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.updateDegreeWithoutProgram"),
      );
    }
    if (flatRow.program !== undefined && flatRow.degree === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.updateProgramWithoutDegree"),
      );
    }
    const degree = degrees.value.find((d) => d.name === flatRow.degree);
    if (degree === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.degreeNotFound", flatRow),
      );
    }
    const program = degree.programs.find((p) => p.name === flatRow.program);
    if (program === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.programNotFound", flatRow),
      );
    }
    object.programId = program.id;

    // trackId
    if (flatRow.track !== undefined) {
      if (flatRow.degree === undefined) {
        throw new Error(
          t("admin.courses.courses.form.error.updateTrackWithoutDegree"),
        );
      }
      if (flatRow.program === undefined) {
        throw new Error(
          t("admin.courses.courses.form.error.updateTrackWithoutProgram"),
        );
      }
      if (flatRow.track === null) {
        object.trackId = null;
      } else {
        const track = program.tracks.find((t) => t.name === flatRow.track);
        if (track === undefined) {
          throw new Error(
            t("admin.courses.courses.form.error.trackNotFound", flatRow),
          );
        }
        object.trackId = track.id;
      }
    }
  }

  if (flatRow.nameShort !== undefined) {
    object.nameShort = flatRow.nameShort;
  }

  if (flatRow.semester !== undefined) {
    object.semester = flatRow.semester;
  }

  // typeId
  if (flatRow.type !== undefined) {
    const type = courseTypes.value.find((ct) => ct.label === flatRow.type);
    if (type === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.courseTypeNotFound", flatRow),
      );
    }
    object.typeId = type.id;
  }

  if (flatRow.name !== undefined) {
    object.name = flatRow.name;
  }

  if (flatRow.hours !== undefined) {
    if (flatRow.hours === null || flatRow.hours < 0) {
      throw new Error(t("admin.courses.courses.form.error.hoursNegative"));
    }
    object.hours = flatRow.hours;
  }

  if (flatRow.hoursAdjusted !== undefined) {
    if (flatRow.hoursAdjusted !== null && flatRow.hoursAdjusted < 0) {
      throw new Error(
        t("admin.courses.courses.form.error.hoursAdjustedNegative"),
      );
    }
    object.hoursAdjusted = flatRow.hoursAdjusted;
  }

  if (flatRow.groups !== undefined) {
    if (flatRow.groups === null || flatRow.groups < 0) {
      throw new Error(t("admin.courses.courses.form.error.groupsNegative"));
    }
    object.groups = flatRow.groups;
  }

  if (flatRow.groupsAdjusted !== undefined) {
    if (flatRow.groupsAdjusted !== null && flatRow.groupsAdjusted < 0) {
      throw new Error(
        t("admin.courses.courses.form.error.groupsAdjustedNegative"),
      );
    }
    object.groupsAdjusted = flatRow.groupsAdjusted;
  }

  if (flatRow.description !== undefined) {
    object.description = flatRow.description;
  }

  if (flatRow.priorityRule !== undefined) {
    if (
      flatRow.priorityRule !== null &&
      (flatRow.priorityRule < 0 || !Number.isInteger(flatRow.priorityRule))
    ) {
      throw new Error(t("admin.courses.courses.form.error.priorityRule"));
    }
    object.priorityRule = flatRow.priorityRule;
  }

  if (flatRow.visible !== undefined) {
    object.visible = flatRow.visible;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed(() => ({
  year: years.value.map((y) => y.value),
  degree: degrees.value.map((d) => d.name),
  program:
    degrees.value
      .find((d) => d.name === formValues.value["degree"])
      ?.programs.map((p) => p.name) ?? [],
  track:
    degrees.value
      .find((d) => d.name === formValues.value["degree"])
      ?.programs.find((p) => p.name === formValues.value["program"])
      ?.tracks.map((t) => t.name) ?? [],
  semester: [1, 2, 3, 4, 5, 6].map((s) => ({
    value: s,
    label: t("semester", { semester: s }),
  })),
  type: courseTypes.value.map((ct) => ct.label),
}));
const filterOptions = computed(() => ({
  program: programs.value.map((p) => p.name),
  track: tracks.value.map((t) => t.name),
}));
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    section="courses"
    name="courses"
    :id-key
    :row-descriptor
    :rows="courses"
    :format-row
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertCourses"
    :upsert-data="upsertCourses"
    :update-data="updateCourses"
    :delete-data="deleteCourses"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
