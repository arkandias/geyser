<script lang="ts">
export type ColName =
  | "year"
  | "degreeName"
  | "programName"
  | "trackName"
  | "name"
  | "nameShort"
  | "semester"
  | "typeLabel"
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
import { type ComputedRef, computed, ref } from "vue";

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
  SelectOptions,
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

const { t, n } = useTypedI18n();
const { years } = useYearsStore();

const rowDescriptor = {
  year: {
    type: "number",
    formComponent: "select",
  },
  degreeName: {
    type: "string",
    field: (row) => row.program.degree.name,
    format: (val: string) =>
      degrees.value.find((d) => d.name === val)?.nameDisplay,
    formComponent: "select",
  },
  programName: {
    type: "string",
    field: (row) => row.program.name,
    format: (val: string) =>
      programs.value.find((p) => p.name === val)?.nameDisplay,
    formComponent: "select",
  },
  trackName: {
    type: "string",
    nullable: true,
    field: (row) => row.track?.name,
    format: (val: string) =>
      tracks.value.find((t) => t.name === val)?.nameDisplay,
    formComponent: "select",
  },
  name: {
    type: "string",
    formComponent: "input",
  },
  nameShort: {
    type: "string",
    nullable: true,
    formComponent: "input",
  },
  semester: {
    type: "number",
    format: (val: number) => t("semester", { semester: val }),
    formComponent: "input",
  },
  typeLabel: {
    type: "string",
    field: (row) => row.type.label,
    formComponent: "select",
  },
  hours: {
    type: "number",
    format: (val: number) => n(val, "decimal"),
    formComponent: "input",
    inputType: "number",
  },
  hoursAdjusted: {
    type: "number",
    nullable: true,
    format: (val: number) => n(val, "decimal"),
    formComponent: "input",
    inputType: "number",
  },
  groups: {
    type: "number",
    format: (val: number) => n(val, "decimal"),
    formComponent: "input",
    inputType: "number",
  },
  groupsAdjusted: {
    type: "number",
    nullable: true,
    format: (val: number) => n(val, "decimal"),
    formComponent: "input",
    inputType: "number",
  },
  description: {
    type: "string",
    nullable: true,
    format: (val: string) => (val ? "✓" : "✗"),
    formComponent: "input",
    inputType: "textarea",
  },
  priorityRule: {
    type: "number",
    nullable: true,
    formComponent: "input",
    inputType: "number",
  },
  visible: {
    type: "boolean",
    format: (val: boolean) => (val ? "✓" : "✗"),
    formComponent: "toggle",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminCourse on Course {
    id
    year
    program {
      name
      nameDisplay
      degree {
        name
        nameDisplay
      }
    }
    track {
      name
      nameDisplay
    }
    name
    nameShort
    nameDisplay
    semester
    type {
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
    flatRow.degreeName !== undefined ||
    flatRow.programName !== undefined ||
    flatRow.trackName !== undefined
  ) {
    if (flatRow.degreeName !== undefined && flatRow.programName === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.updateDegreeWithoutProgram"),
      );
    }
    if (flatRow.programName !== undefined && flatRow.degreeName === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.updateProgramWithoutDegree"),
      );
    }
    const degree = degrees.value.find((d) => d.name === flatRow.degreeName);
    if (degree === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.degreeNotFound", flatRow),
      );
    }
    const program = degree.programs.find((p) => p.name === flatRow.programName);
    if (program === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.programNotFound", flatRow),
      );
    }
    object.programId = program.id;

    // trackId
    if (flatRow.trackName !== undefined) {
      if (flatRow.degreeName === undefined) {
        throw new Error(
          t("admin.courses.courses.form.error.updateTrackWithoutDegree"),
        );
      }
      if (flatRow.programName === undefined) {
        throw new Error(
          t("admin.courses.courses.form.error.updateTrackWithoutProgram"),
        );
      }
      if (flatRow.trackName === null) {
        object.trackId = null;
      } else {
        const track = program.tracks.find((t) => t.name === flatRow.trackName);
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
  if (flatRow.typeLabel !== undefined) {
    const type = courseTypes.value.find((ct) => ct.label === flatRow.typeLabel);
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
  degreeName: degrees.value.map((d) => d.name),
  programName:
    degrees.value
      .find((d) => d.name === formValues.value["degreeName"])
      ?.programs.map((p) => p.name) ?? [],
  trackName:
    degrees.value
      .find((d) => d.name === formValues.value["degreeName"])
      ?.programs.find((p) => p.name === formValues.value["programName"])
      ?.tracks.map((t) => t.name) ?? [],
  semester: [1, 2, 3, 4, 5, 6].map((s) => ({
    value: s,
    label: t("semester", { semester: s }),
  })),
  typeLabel: courseTypes.value.map((ct) => ct.label),
}));

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions: ComputedRef<
  SelectOptions<string, Row, typeof rowDescriptor>
> = computed(() => ({
  programName: programs.value.map((p) => p.name),
  track: tracks.value.map((t) => t.name),
}));
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="courses"
    name="courses"
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
