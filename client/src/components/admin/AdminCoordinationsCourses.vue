<script lang="ts">
export const adminCoordinationsCoursesColNames = [
  "year",
  "teacherEmail",
  "degreeName",
  "programName",
  "trackName",
  "termLabel",
  "courseName",
  "courseTypeLabel",
  "comment",
] as const;

export type AdminCoordinationsCoursesColNames =
  (typeof adminCoordinationsCoursesColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminCoordinationCourseFragment,
  AdminCoordinationCourseFragmentDoc,
  AdminCoordinationsCoursesCourseFragmentDoc,
  AdminCoordinationsCoursesCourseTypeFragmentDoc,
  AdminCoordinationsCoursesDegreeFragmentDoc,
  AdminCoordinationsCoursesProgramFragmentDoc,
  AdminCoordinationsCoursesTeacherFragmentDoc,
  AdminCoordinationsCoursesTermFragmentDoc,
  AdminCoordinationsCoursesTrackFragmentDoc,
  CoordinationConstraint,
  type CoordinationInsertInput,
  CoordinationUpdateColumn,
  DeleteCoordinationsCoursesDocument,
  InsertCoordinationsCoursesDocument,
  UpdateCoordinationsCoursesDocument,
  UpsertCoordinationsCoursesDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  AdminColumns,
  NullableParsedRow,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";
import { unique } from "@/utils";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminCoordinationCourseFragment;
type FlatRow = NullableParsedRow<typeof adminColumns>;
type InsertInput = CoordinationInsertInput;

const {
  coordinationFragments,
  teacherFragments,
  degreeFragments,
  programFragments,
  trackFragments,
  termFragments,
  courseFragments,
  courseTypeFragments,
} = defineProps<{
  fetching: boolean;
  coordinationFragments: FragmentType<
    typeof AdminCoordinationCourseFragmentDoc
  >[];
  teacherFragments: FragmentType<
    typeof AdminCoordinationsCoursesTeacherFragmentDoc
  >[];
  degreeFragments: FragmentType<
    typeof AdminCoordinationsCoursesDegreeFragmentDoc
  >[];
  programFragments: FragmentType<
    typeof AdminCoordinationsCoursesProgramFragmentDoc
  >[];
  trackFragments: FragmentType<
    typeof AdminCoordinationsCoursesTrackFragmentDoc
  >[];
  termFragments: FragmentType<
    typeof AdminCoordinationsCoursesTermFragmentDoc
  >[];
  courseFragments: FragmentType<
    typeof AdminCoordinationsCoursesCourseFragmentDoc
  >[];
  courseTypeFragments: FragmentType<
    typeof AdminCoordinationsCoursesCourseTypeFragmentDoc
  >[];
}>();

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();
const { years } = useYearsStore();

const adminColumns = {
  year: {
    type: "number",
    field: (row) => row.course?.year,
    formComponent: "select",
  },
  teacherEmail: {
    type: "string",
    field: (row) => row.teacher.email,
    format: (val: string) =>
      teachers.value.find((t) => t.email === val)?.displayname,
    formComponent: "select",
  },
  degreeName: {
    type: "string",
    field: (row) => row.course?.program.degree.name,
    formComponent: "select",
  },
  programName: {
    type: "string",
    field: (row) => row.course?.program.name,
    formComponent: "select",
  },
  trackName: {
    type: "string",
    field: (row) => row.course?.track?.name,
    formComponent: "select",
  },
  termLabel: {
    type: "string",
    field: (row) => row.course?.term.label,
    formComponent: "select",
  },
  courseName: {
    type: "string",
    field: (row) => row.course?.name,
    formComponent: "select",
  },
  courseTypeLabel: {
    type: "string",
    field: (row) => row.course?.type.label,
    formComponent: "select",
  },
  comment: {
    type: "string",
    nullable: true,
    formComponent: "inputText",
  },
} as const satisfies AdminColumns<AdminCoordinationsCoursesColNames, Row>;

graphql(`
  fragment AdminCoordinationCourse on Coordination {
    id
    teacher {
      email
    }
    course {
      year
      name
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
    }
    comment
  }

  fragment AdminCoordinationsCoursesTeacher on Teacher {
    id
    email
    displayname
  }

  fragment AdminCoordinationsCoursesDegree on Degree {
    name
  }

  fragment AdminCoordinationsCoursesProgram on Program {
    name
  }

  fragment AdminCoordinationsCoursesTrack on Track {
    name
  }

  fragment AdminCoordinationsCoursesTerm on Term {
    label
  }

  fragment AdminCoordinationsCoursesCourse on Course {
    id
    year
    name
    program {
      name
      degree {
        name
      }
    }
    track {
      name
      program {
        name
        degree {
          name
        }
      }
    }
    term {
      label
    }
    type {
      label
    }
  }

  fragment AdminCoordinationsCoursesCourseType on CourseType {
    label
  }

  mutation InsertCoordinationsCourses($objects: [CoordinationInsertInput!]!) {
    insertData: insertCoordination(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertCoordinationsCourses(
    $objects: [CoordinationInsertInput!]!
    $onConflict: CoordinationOnConflict
  ) {
    upsertData: insertCoordination(objects: $objects, onConflict: $onConflict) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateCoordinationsCourses(
    $ids: [Int!]!
    $changes: CoordinationSetInput!
  ) {
    updateData: updateCoordination(
      where: { id: { _in: $ids } }
      _set: $changes
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteCoordinationsCourses($ids: [Int!]!) {
    deleteData: deleteCoordination(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const coordinations = computed(() =>
  coordinationFragments
    .map((f) => useFragment(AdminCoordinationCourseFragmentDoc, f))
    .filter((c) => c.course),
);
const teachers = computed(() =>
  teacherFragments.map((f) =>
    useFragment(AdminCoordinationsCoursesTeacherFragmentDoc, f),
  ),
);
const degrees = computed(() =>
  degreeFragments.map((f) =>
    useFragment(AdminCoordinationsCoursesDegreeFragmentDoc, f),
  ),
);
const programs = computed(() =>
  programFragments.map((f) =>
    useFragment(AdminCoordinationsCoursesProgramFragmentDoc, f),
  ),
);
const tracks = computed(() =>
  trackFragments.map((f) =>
    useFragment(AdminCoordinationsCoursesTrackFragmentDoc, f),
  ),
);
const terms = computed(() =>
  termFragments.map((f) =>
    useFragment(AdminCoordinationsCoursesTermFragmentDoc, f),
  ),
);
const courses = computed(() =>
  courseFragments.map((f) =>
    useFragment(AdminCoordinationsCoursesCourseFragmentDoc, f),
  ),
);
const courseTypes = computed(() =>
  courseTypeFragments.map((f) =>
    useFragment(AdminCoordinationsCoursesCourseTypeFragmentDoc, f),
  ),
);
const insertCoordinationsCourses = useMutation(
  InsertCoordinationsCoursesDocument,
);
const upsertCoordinationsCourses = useMutation(
  UpsertCoordinationsCoursesDocument,
);
const updateCoordinationsCourses = useMutation(
  UpdateCoordinationsCoursesDocument,
);
const deleteCoordinationsCourses = useMutation(
  DeleteCoordinationsCoursesDocument,
);

const importConstraint =
  CoordinationConstraint.CoordinationOidTeacherIdCourseIdTrackIdProgramIdKey;
const importUpdateColumns = [
  CoordinationUpdateColumn.TeacherId,
  CoordinationUpdateColumn.ProgramId,
  CoordinationUpdateColumn.Comment,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  // teacherId
  if (flatRow.teacherEmail !== undefined) {
    const teacher = teachers.value.find(
      (t) => t.email === flatRow.teacherEmail,
    );
    if (teacher === undefined) {
      throw new Error(
        t("admin.coordinations.courses.form.error.teacherNotFound", flatRow),
      );
    }
    object.teacherId = teacher.id;
  }

  // courseId
  if (
    flatRow.degreeName !== undefined ||
    flatRow.programName !== undefined ||
    flatRow.trackName !== undefined ||
    flatRow.termLabel !== undefined ||
    flatRow.courseName !== undefined ||
    flatRow.courseTypeLabel !== undefined
  ) {
    if (
      flatRow.year === undefined ||
      flatRow.degreeName === undefined ||
      flatRow.programName === undefined ||
      flatRow.trackName === undefined ||
      flatRow.termLabel === undefined ||
      flatRow.courseName === undefined ||
      flatRow.courseTypeLabel === undefined
    ) {
      throw new Error(
        t("admin.coordinations.courses.form.error.updateCourseMissingFields"),
      );
    }
    const course = courses.value.find(
      (c) =>
        c.year === flatRow.year &&
        c.program.degree.name === flatRow.degreeName &&
        c.program.name === flatRow.programName &&
        (c.track?.name ?? null) === flatRow.trackName &&
        c.term.label === flatRow.termLabel &&
        c.name === flatRow.courseName &&
        c.type.label === flatRow.courseTypeLabel,
    );
    if (course === undefined) {
      throw new Error(
        t("admin.coordinations.courses.form.error.courseNotFound", flatRow),
      );
    }
    object.courseId = course.id;
  }

  if (flatRow.comment !== undefined) {
    object.comment = flatRow.comment;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    year: years.value.map((y) => y.value),
    teacherEmail: teachers.value.map((t) => ({
      value: t.email,
      label: t.displayname ?? "",
    })),
    degreeName: courses.value
      .filter((c) => c.year === formValues.value["year"])
      .map((c) => c.program.degree.name)
      .filter(unique),
    programName: courses.value
      .filter(
        (c) =>
          c.year === formValues.value["year"] &&
          c.program.degree.name === formValues.value["degreeName"],
      )
      .map((c) => c.program.name)
      .filter(unique),
    trackName: courses.value
      .filter(
        (c) =>
          c.year === formValues.value["year"] &&
          c.program.degree.name === formValues.value["degreeName"] &&
          c.program.name === formValues.value["programName"] &&
          c.track?.name,
      )
      .map((c) => c.track?.name)
      .filter(unique),
    termLabel: courses.value
      .filter(
        (c) =>
          c.year === formValues.value["year"] &&
          c.program.degree.name === formValues.value["degreeName"] &&
          c.program.name === formValues.value["programName"] &&
          (c.track?.name ?? null) === (formValues.value["trackName"] ?? null),
      )
      .map((c) => c.term.label)
      .filter(unique),
    courseName: courses.value
      .filter(
        (c) =>
          c.year === formValues.value["year"] &&
          c.program.degree.name === formValues.value["degreeName"] &&
          c.program.name === formValues.value["programName"] &&
          (c.track?.name ?? null) === (formValues.value["trackName"] ?? null) &&
          c.term.label === formValues.value["termLabel"],
      )
      .map((c) => c.name)
      .filter(unique),
    courseTypeLabel: courses.value
      .filter(
        (c) =>
          c.year === formValues.value["year"] &&
          c.program.degree.name === formValues.value["degreeName"] &&
          c.program.name === formValues.value["programName"] &&
          (c.track?.name ?? null) === (formValues.value["trackName"] ?? null) &&
          c.term.label === formValues.value["termLabel"] &&
          c.name === formValues.value["courseName"],
      )
      .map((c) => c.type.label)
      .filter(unique),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    degreeName: degrees.value.map((d) => d.name),
    programName: programs.value.map((p) => p.name).filter(unique),
    trackName: tracks.value.map((t) => t.name).filter(unique),
    termLabel: terms.value.map((t) => t.label),
    courseName: courses.value.map((c) => c.name).filter(unique),
    courseTypeLabel: courseTypes.value.map((ct) => ct.label),
  }),
);
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="coordinations"
    name="courses"
    :admin-columns
    :rows="coordinations"
    :fetching
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertCoordinationsCourses"
    :upsert-data="upsertCoordinationsCourses"
    :update-data="updateCoordinationsCourses"
    :delete-data="deleteCoordinationsCourses"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
