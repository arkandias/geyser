<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminCoordinationCourseFragment,
  AdminCoordinationCourseFragmentDoc,
  AdminCoordinationsCoursesCourseFragmentDoc,
  AdminCoordinationsCoursesDegreeFragmentDoc,
  AdminCoordinationsCoursesProgramFragmentDoc,
  AdminCoordinationsCoursesTeacherFragmentDoc,
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
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";
import { unique, uniqueValue } from "@/utils";

import type { AdminCoordinationsCoursesColNames } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminCoordinationCourseFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = CoordinationInsertInput;

const {
  coordinationFragments,
  teacherFragments,
  degreeFragments,
  programFragments,
  trackFragments,
  courseFragments,
} = defineProps<{
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
  courseFragments: FragmentType<
    typeof AdminCoordinationsCoursesCourseFragmentDoc
  >[];
}>();

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();
const { years } = useYearsStore();

const rowDescriptor = {
  year: {
    type: "number",
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
  courseName: {
    type: "string",
    field: (row) => row.course?.name,
    formComponent: "select",
  },
  courseSemester: {
    type: "number",
    field: (row) => row.course?.semester,
    format: (val: number) => t("semester", { semester: val }),
    formComponent: "select",
  },
  courseType: {
    type: "string",
    field: (row) => row.course?.type.label,
    formComponent: "select",
  },
  comment: {
    type: "string",
    formComponent: "input",
  },
} as const satisfies RowDescriptorExtra<AdminCoordinationsCoursesColNames, Row>;

graphql(`
  fragment AdminCoordinationCourse on Coordination {
    id
    teacher {
      email
    }
    course {
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
      semester
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
    semester
    type {
      label
    }
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
const courses = computed(() =>
  courseFragments.map((f) =>
    useFragment(AdminCoordinationsCoursesCourseFragmentDoc, f),
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
  CoordinationUpdateColumn.Oid,
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
        t("admin.coordinations.courses.form.error.teacherNotFound", {
          email: flatRow.teacherEmail,
        }),
      );
    }
    object.teacherId = teacher.id;
  }

  // courseId
  if (
    flatRow.degreeName !== undefined ||
    flatRow.programName !== undefined ||
    flatRow.trackName !== undefined ||
    flatRow.courseName !== undefined ||
    flatRow.courseSemester !== undefined ||
    flatRow.courseType !== undefined
  ) {
    if (
      flatRow.year === undefined ||
      flatRow.degreeName === undefined ||
      flatRow.programName === undefined ||
      flatRow.trackName === undefined ||
      flatRow.courseName === undefined ||
      flatRow.courseSemester === undefined ||
      flatRow.courseType === undefined
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
        c.name === flatRow.courseName &&
        c.semester === flatRow.courseSemester &&
        c.type.label === flatRow.courseType,
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
const formOptions = computed<SelectOptions<string, Row, typeof rowDescriptor>>(
  () => ({
    year: years.value.map((y) => y.value),
    teacherEmail: teachers.value.map((t) => ({
      value: t.email,
      label: t.displayname ?? "",
    })),
    degreeName: courses.value.map((c) => c.program.degree.name).filter(unique),
    programName: courses.value
      .filter((c) => c.program.degree.name === formValues.value["degreeName"])
      .map((c) => c.program.name)
      .filter(unique),
    trackName: courses.value
      .filter(
        (c) =>
          c.program.degree.name === formValues.value["degreeName"] &&
          c.program.name === formValues.value["programName"] &&
          c.track?.name,
      )
      .map((c) => c.track?.name)
      .filter(unique),
    courseName: courses.value
      .filter(
        (c) =>
          c.program.degree.name === formValues.value["degreeName"] &&
          c.program.name === formValues.value["programName"] &&
          (c.track?.name ?? null) === (formValues.value["trackName"] ?? null),
      )
      .map((c) => c.name)
      .filter(unique),
    courseSemester: courses.value
      .filter(
        (c) =>
          c.program.degree.name === formValues.value["degreeName"] &&
          c.program.name === formValues.value["programName"] &&
          (c.track?.name ?? null) === (formValues.value["trackName"] ?? null) &&
          c.name === formValues.value["courseName"],
      )
      .map((c) => ({
        value: c.semester,
        label: t("semester", { semester: c.semester }),
      }))
      .filter(uniqueValue("value")),
    courseType: courses.value
      .filter(
        (c) =>
          c.program.degree.name === formValues.value["degreeName"] &&
          c.program.name === formValues.value["programName"] &&
          (c.track?.name ?? null) === (formValues.value["trackName"] ?? null) &&
          c.name === formValues.value["courseName"] &&
          c.semester === formValues.value["courseSemester"],
      )
      .map((c) => c.type.label)
      .filter(unique),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed<
  SelectOptions<string, Row, typeof rowDescriptor>
>(() => ({
  degreeName: degrees.value.map((d) => d.name),
  programName: programs.value.map((p) => p.name),
  trackName: tracks.value.map((t) => t.name),
  courseName: courses.value.map((c) => c.name),
}));
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="coordinations"
    name="courses"
    :row-descriptor
    :rows="coordinations"
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
