<script lang="ts">
export type ColName =
  | "year"
  | "teacherEmail"
  | "degreeName"
  | "programName"
  | "trackName"
  | "courseName"
  | "courseSemester"
  | "courseType"
  | "seniority"
  | "isPriority"
  | "computed";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  AdminPrioritiesCourseFragmentDoc,
  AdminPrioritiesCourseTypeFragmentDoc,
  AdminPrioritiesDegreeFragmentDoc,
  AdminPrioritiesProgramFragmentDoc,
  AdminPrioritiesServiceFragmentDoc,
  AdminPrioritiesTeacherFragmentDoc,
  AdminPrioritiesTrackFragmentDoc,
  type AdminPriorityFragment,
  AdminPriorityFragmentDoc,
  DeletePrioritiesDocument,
  InsertPrioritiesDocument,
  PriorityConstraint,
  type PriorityInsertInput,
  PriorityUpdateColumn,
  UpdatePrioritiesDocument,
  UpsertPrioritiesDocument,
} from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";
import { unique } from "@/utils";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminPriorityFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = PriorityInsertInput;

const {
  priorityFragments,
  serviceFragments,
  teacherFragments,
  courseFragments,
  degreeFragments,
  programFragments,
  trackFragments,
  courseTypeFragments,
} = defineProps<{
  priorityFragments: FragmentType<typeof AdminPriorityFragmentDoc>[];
  serviceFragments: FragmentType<typeof AdminPrioritiesServiceFragmentDoc>[];
  teacherFragments: FragmentType<typeof AdminPrioritiesTeacherFragmentDoc>[];
  courseFragments: FragmentType<typeof AdminPrioritiesCourseFragmentDoc>[];
  degreeFragments: FragmentType<typeof AdminPrioritiesDegreeFragmentDoc>[];
  programFragments: FragmentType<typeof AdminPrioritiesProgramFragmentDoc>[];
  trackFragments: FragmentType<typeof AdminPrioritiesTrackFragmentDoc>[];
  courseTypeFragments: FragmentType<
    typeof AdminPrioritiesCourseTypeFragmentDoc
  >[];
}>();

const { t } = useTypedI18n();
const { years } = useYearsStore();

const idKey: keyof Row = "id";
const rowDescriptor = {
  year: {
    type: "number",
    formType: "select",
  },
  teacherEmail: {
    type: "string",
    field: (row) => row.service.teacher.email,
    format: (val: string) =>
      teachers.value.find((t) => t.email === val)?.displayname,
    formType: "select",
  },
  degreeName: {
    type: "string",
    field: (row) => row.course.program.degree.name,
    format: (val: string) =>
      degrees.value.find((d) => d.name === val)?.nameDisplay,
    formType: "select",
  },
  programName: {
    type: "string",
    field: (row) => row.course.program.name,
    format: (val: string) =>
      programs.value.find((p) => p.name === val)?.nameDisplay,
    formType: "select",
  },
  trackName: {
    type: "string",
    nullable: true,
    field: (row) => row.course.track?.name,
    format: (val: string) =>
      tracks.value.find((t) => t.name === val)?.nameDisplay,
    formType: "select",
  },
  courseName: {
    type: "string",
    field: (row) => row.course.name,
    format: (val: string) =>
      courses.value.find((c) => c.name === val)?.nameDisplay,
    formType: "select",
  },
  courseSemester: {
    type: "number",
    field: (row) => row.course.semester,
    format: (val: number) => t("semester", { semester: val }),
    formType: "select",
  },
  courseType: {
    type: "string",
    field: (row) => row.course.type.label,
    formType: "select",
  },
  seniority: {
    type: "number",
    numberFormat: "decimal",
    formType: "inputNum",
  },
  isPriority: {
    type: "boolean",
    nullable: true,
    formType: "toggle",
  },
  computed: {
    type: "boolean",
    formType: "toggle",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminPriority on Priority {
    id
    year
    service {
      teacher {
        email
        displayname
      }
    }
    course {
      name
      nameDisplay
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
      semester
      type {
        label
      }
    }
    seniority
    isPriority
    computed
  }

  fragment AdminPrioritiesService on Service {
    id
    year
    teacher {
      email
      displayname
    }
  }

  fragment AdminPrioritiesTeacher on Teacher {
    email
    displayname
  }

  fragment AdminPrioritiesCourse on Course {
    id
    year
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
    name
    nameDisplay
    semester
    type {
      label
    }
  }

  fragment AdminPrioritiesDegree on Degree {
    id
    name
    nameDisplay
  }

  fragment AdminPrioritiesProgram on Program {
    id
    name
    nameDisplay
  }

  fragment AdminPrioritiesTrack on Track {
    id
    name
    nameDisplay
  }

  fragment AdminPrioritiesCourseType on CourseType {
    id
    label
  }

  mutation InsertPriorities($objects: [PriorityInsertInput!]!) {
    insertData: insertPriority(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertPriorities(
    $objects: [PriorityInsertInput!]!
    $onConflict: PriorityOnConflict
  ) {
    upsertData: insertPriority(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdatePriorities($ids: [Int!]!, $changes: PrioritySetInput!) {
    updateData: updatePriority(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeletePriorities($ids: [Int!]!) {
    deleteData: deletePriority(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const priorities = computed(() =>
  priorityFragments.map((f) => useFragment(AdminPriorityFragmentDoc, f)),
);
const services = computed(() =>
  serviceFragments.map((f) =>
    useFragment(AdminPrioritiesServiceFragmentDoc, f),
  ),
);
const teachers = computed(() =>
  teacherFragments.map((f) =>
    useFragment(AdminPrioritiesTeacherFragmentDoc, f),
  ),
);
const courses = computed(() =>
  courseFragments.map((f) => useFragment(AdminPrioritiesCourseFragmentDoc, f)),
);
const degrees = computed(() =>
  degreeFragments.map((f) => useFragment(AdminPrioritiesDegreeFragmentDoc, f)),
);
const programs = computed(() =>
  programFragments.map((f) =>
    useFragment(AdminPrioritiesProgramFragmentDoc, f),
  ),
);
const tracks = computed(() =>
  trackFragments.map((f) => useFragment(AdminPrioritiesTrackFragmentDoc, f)),
);
const courseTypes = computed(() =>
  courseTypeFragments.map((f) =>
    useFragment(AdminPrioritiesCourseTypeFragmentDoc, f),
  ),
);
const insertPriorities = useMutation(InsertPrioritiesDocument);
const upsertPriorities = useMutation(UpsertPrioritiesDocument);
const updatePriorities = useMutation(UpdatePrioritiesDocument);
const deletePriorities = useMutation(DeletePrioritiesDocument);

const importConstraint = PriorityConstraint.PriorityServiceIdCourseIdKey;
const importUpdateColumns = [
  PriorityUpdateColumn.ServiceId,
  PriorityUpdateColumn.CourseId,
  PriorityUpdateColumn.Seniority,
  PriorityUpdateColumn.IsPriority,
  PriorityUpdateColumn.Computed,
];

const formatRow = (row: Row) =>
  `${row.year} — ${row.service.teacher.displayname} — ` +
  `${row.course.program.degree.name} — ${row.course.program.name} ` +
  (row.course.track ? `— ${row.course.track.name}` : "") +
  `— ${row.course.name} — ${row.course.semester} — ${row.course.type}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.year !== undefined) {
    object.year = flatRow.year;
  }

  // serviceId
  if (flatRow.teacherEmail !== undefined) {
    if (flatRow.year === undefined) {
      throw new Error(
        t("admin.requests.priorities.form.error.updateTeacherWithoutYear"),
      );
    }
    const service = services.value.find(
      (s) =>
        s.year === flatRow.year && s.teacher.email === flatRow.teacherEmail,
    );
    if (service === undefined) {
      throw new Error(
        t("admin.requests.priorities.form.error.serviceNotFound", flatRow),
      );
    }
    object.serviceId = service.id;
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
        t("admin.requests.priorities.form.error.updateCourseMissingFields"),
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
        t("admin.requests.priorities.form.error.courseNotFound", flatRow),
      );
    }

    object.courseId = course.id;
  }

  if (flatRow.seniority !== undefined) {
    object.seniority = flatRow.seniority;
  }

  if (flatRow.isPriority !== undefined) {
    object.isPriority = flatRow.isPriority;
  }

  if (flatRow.computed !== undefined) {
    object.computed = flatRow.computed;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed(() => ({
  year: years.value.map((y) => y.value),
  teacherEmail: services.value
    .filter((s) => s.year === formValues.value["year"])
    .map((s) => ({ value: s.teacher.email, label: s.teacher.displayname })),
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
    })),
  courseType: courses.value
    .filter(
      (c) =>
        c.program.degree.name === formValues.value["degreeName"] &&
        c.program.name === formValues.value["programName"] &&
        (c.track?.name ?? null) === (formValues.value["trackName"] ?? null) &&
        c.name === formValues.value["courseName"] &&
        c.semester === formValues.value["courseSemester"],
    )
    .map((c) => c.type.label),
}));

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed(() => ({
  teacherEmail: teachers.value.map((t) => t.email),
  degreeName: degrees.value.map((d) => d.name),
  programName: programs.value.map((p) => p.name),
  trackName: tracks.value.map((t) => t.name),
  courseName: courses.value.map((c) => c.name),
  courseSemester: [1, 2, 3, 4, 5, 6],
  courseType: courseTypes.value.map((ct) => ct.label),
}));
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="requests"
    name="priorities"
    :id-key
    :row-descriptor
    :rows="priorities"
    :format-row
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertPriorities"
    :upsert-data="upsertPriorities"
    :update-data="updatePriorities"
    :delete-data="deletePriorities"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
