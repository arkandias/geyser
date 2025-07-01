<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminCourseFragment,
  AdminCourseFragmentDoc,
  AdminCoursesDegreeFragmentDoc,
  AdminCoursesProgramFragmentDoc,
  AdminCoursesTermFragmentDoc,
  AdminCoursesTrackFragmentDoc,
  AdminCoursesTypeFragmentDoc,
  CourseConstraint,
  type CourseInsertInput,
  CourseUpdateColumn,
  DeleteCoursesDocument,
  InsertCoursesDocument,
  UpdateCoursesDocument,
  UpsertCoursesDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";

import type { AdminCoursesCoursesColName } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminCourseFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = CourseInsertInput;

const {
  degreeFragments,
  programFragments,
  trackFragments,
  termFragments,
  courseFragments,
  typeFragments,
} = defineProps<{
  fetching: boolean;
  degreeFragments: FragmentType<typeof AdminCoursesDegreeFragmentDoc>[];
  programFragments: FragmentType<typeof AdminCoursesProgramFragmentDoc>[];
  trackFragments: FragmentType<typeof AdminCoursesTrackFragmentDoc>[];
  termFragments: FragmentType<typeof AdminCoursesTermFragmentDoc>[];
  courseFragments: FragmentType<typeof AdminCourseFragmentDoc>[];
  typeFragments: FragmentType<typeof AdminCoursesTypeFragmentDoc>[];
}>();

const { t, n } = useTypedI18n();
const { organization } = useOrganizationStore();
const { years } = useYearsStore();

const rowDescriptor = {
  year: {
    type: "number",
    formComponent: "select",
  },
  degreeName: {
    type: "string",
    field: (row) => row.program.degree.name,
    formComponent: "select",
  },
  programName: {
    type: "string",
    field: (row) => row.program.name,
    formComponent: "select",
  },
  trackName: {
    type: "string",
    nullable: true,
    field: (row) => row.track?.name,
    formComponent: "select",
  },
  termLabel: {
    type: "string",
    field: (row) => row.term.label,
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
    format: (val: number | null) => (val === null ? "" : n(val, "decimal")),
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
    format: (val: number | null) => (val === null ? "" : n(val, "decimal")),
    formComponent: "input",
    inputType: "number",
  },
  description: {
    type: "string",
    nullable: true,
    format: (val: string | null) => (val ? "✓" : "✗"),
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
} as const satisfies RowDescriptorExtra<AdminCoursesCoursesColName, Row>;

graphql(`
  fragment AdminCourse on Course {
    id
    year
    name
    nameShort
    program {
      name
      degree {
        name
      }
    }
    track {
      name
    }
    term {
      label
    }
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
    name
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
    name
  }

  fragment AdminCoursesTrack on Track {
    name
  }

  fragment AdminCoursesTerm on Term {
    id
    label
  }

  fragment AdminCoursesType on CourseType {
    id
    label
  }

  mutation InsertCourses($objects: [CourseInsertInput!]!) {
    insertData: insertCourse(objects: $objects) {
      returning {
        oid
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
        oid
        id
      }
    }
  }

  mutation UpdateCourses($ids: [Int!]!, $changes: CourseSetInput!) {
    updateData: updateCourse(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteCourses($ids: [Int!]!) {
    deleteData: deleteCourse(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const courses = computed(() =>
  courseFragments.map((f) => useFragment(AdminCourseFragmentDoc, f)),
);
const degrees = computed(() =>
  degreeFragments.map((f) => useFragment(AdminCoursesDegreeFragmentDoc, f)),
);
const programs = computed(() =>
  programFragments.map((f) => useFragment(AdminCoursesProgramFragmentDoc, f)),
);
const tracks = computed(() =>
  trackFragments.map((f) => useFragment(AdminCoursesTrackFragmentDoc, f)),
);
const terms = computed(() =>
  termFragments.map((f) => useFragment(AdminCoursesTermFragmentDoc, f)),
);
const types = computed(() =>
  typeFragments.map((f) => useFragment(AdminCoursesTypeFragmentDoc, f)),
);
const insertCourses = useMutation(InsertCoursesDocument);
const upsertCourses = useMutation(UpsertCoursesDocument);
const updateCourses = useMutation(UpdateCoursesDocument);
const deleteCourses = useMutation(DeleteCoursesDocument);

const importConstraint =
  CourseConstraint.CourseOidYearProgramIdTrackIdTermIdNameTypeIdKey;
const importUpdateColumns = [
  CourseUpdateColumn.Oid,
  CourseUpdateColumn.Year,
  CourseUpdateColumn.ProgramId,
  CourseUpdateColumn.TrackId,
  CourseUpdateColumn.TermId,
  CourseUpdateColumn.Name,
  CourseUpdateColumn.NameShort,
  CourseUpdateColumn.TypeId,
  CourseUpdateColumn.Hours,
  CourseUpdateColumn.HoursAdjusted,
  CourseUpdateColumn.Groups,
  CourseUpdateColumn.GroupsAdjusted,
  CourseUpdateColumn.Description,
  CourseUpdateColumn.PriorityRule,
  CourseUpdateColumn.Visible,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

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

  // termId
  if (flatRow.termLabel !== undefined) {
    const term = terms.value.find((t) => t.label === flatRow.termLabel);
    if (term === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.termNotFound", flatRow),
      );
    }
    object.termId = term.id;
  }

  if (flatRow.name !== undefined) {
    object.name = flatRow.name;
  }

  if (flatRow.nameShort !== undefined) {
    object.nameShort = flatRow.nameShort;
  }

  // typeId
  if (flatRow.typeLabel !== undefined) {
    const type = types.value.find((t) => t.label === flatRow.typeLabel);
    if (type === undefined) {
      throw new Error(
        t("admin.courses.courses.form.error.typeNotFound", flatRow),
      );
    }
    object.typeId = type.id;
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
const formOptions = computed<SelectOptions<string, Row, typeof rowDescriptor>>(
  () => ({
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
    termLabel: terms.value.map((t) => t.label),
    typeLabel: types.value.map((t) => t.label),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed<
  SelectOptions<string, Row, typeof rowDescriptor>
>(() => ({
  programName: programs.value.map((p) => p.name),
  trackName: tracks.value.map((t) => t.name),
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
    :fetching
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
