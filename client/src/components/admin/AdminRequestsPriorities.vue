<script lang="ts">
export type ColName =
  | "year"
  | "uid"
  | "degree"
  | "program"
  | "track"
  | "course"
  | "semester"
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
  uid: {
    type: "string",
    field: (row) => row.service.uid,
    format: (val: string) =>
      teachers.value.find((t) => t.uid === val)?.displayname,
    formType: "select",
  },
  degree: {
    type: "string",
    field: (row) => row.course.program.degree.name,
    format: (val: string) =>
      degrees.value.find((d) => d.name === val)?.nameDisplay,
    formType: "select",
  },
  program: {
    type: "string",
    field: (row) => row.course.program.name,
    format: (val: string) =>
      programs.value.find((p) => p.name === val)?.nameDisplay,
    formType: "select",
  },
  track: {
    type: "string",
    nullable: true,
    field: (row) => row.course.track?.name,
    format: (val: string) =>
      tracks.value.find((t) => t.name === val)?.nameDisplay,
    formType: "select",
  },
  course: {
    type: "string",
    field: (row) => row.course.name,
    format: (val: string) =>
      courses.value.find((c) => c.name === val)?.nameDisplay,
    formType: "select",
  },
  semester: {
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
    year: yearValue
    service {
      id
      uid
    }
    course {
      id
      program {
        id
        name
        nameDisplay
        degree {
          id
          name
          nameDisplay
        }
      }
      track {
        id
        name
      }
      name
      nameDisplay
      semester
      type {
        id
        label
      }
    }
    seniority
    isPriority
    computed
  }

  fragment AdminPrioritiesService on Service {
    id
    year: yearValue
    teacher {
      uid
      displayname
    }
  }

  fragment AdminPrioritiesTeacher on Teacher {
    uid
    displayname
  }

  fragment AdminPrioritiesCourse on Course {
    id
    year: yearValue
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
  `${row.year} — ${row.service.uid} — ${row.course.name}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.year !== undefined) {
    object.year = flatRow.year;
  }

  // serviceId
  if (flatRow.uid !== undefined) {
    if (flatRow.year === undefined) {
      throw new Error(
        t("admin.requests.priorities.form.error.updateUidWithoutYear"),
      );
    }

    const service = services.value.find(
      (s) => s.year === flatRow.year && s.teacher.uid === flatRow.uid,
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
    flatRow.degree !== undefined ||
    flatRow.program !== undefined ||
    flatRow.track !== undefined ||
    flatRow.course !== undefined ||
    flatRow.semester !== undefined ||
    flatRow.courseType !== undefined
  ) {
    if (
      flatRow.year === undefined ||
      flatRow.degree === undefined ||
      flatRow.program === undefined ||
      flatRow.track === undefined ||
      flatRow.course === undefined ||
      flatRow.semester === undefined ||
      flatRow.courseType === undefined
    ) {
      throw new Error(
        t("admin.requests.priorities.form.error.updateCourseMissingFields"),
      );
    }

    const course = courses.value.find(
      (c) =>
        c.year === flatRow.year &&
        c.program.degree.name === flatRow.degree &&
        c.program.name === flatRow.program &&
        (c.track?.name ?? null) === flatRow.track &&
        c.name === flatRow.course &&
        c.semester === flatRow.semester &&
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
  uid: services.value
    .filter((s) => s.year === formValues.value["year"])
    .map((s) => ({ value: s.teacher.uid, label: s.teacher.displayname })),
  degree: courses.value.map((c) => c.program.degree.name).filter(unique),
  program: courses.value
    .filter((c) => c.program.degree.name === formValues.value["degree"])
    .map((c) => c.program.name)
    .filter(unique),
  track: courses.value
    .filter(
      (c) =>
        c.program.degree.name === formValues.value["degree"] &&
        c.program.name === formValues.value["program"] &&
        c.track?.name,
    )
    .map((c) => c.track?.name)
    .filter(unique),
  course: courses.value
    .filter(
      (c) =>
        c.program.degree.name === formValues.value["degree"] &&
        c.program.name === formValues.value["program"] &&
        (c.track?.name ?? null) === (formValues.value["track"] ?? null),
    )
    .map((c) => c.name)
    .filter(unique),
  semester: courses.value
    .filter(
      (c) =>
        c.program.degree.name === formValues.value["degree"] &&
        c.program.name === formValues.value["program"] &&
        (c.track?.name ?? null) === (formValues.value["track"] ?? null) &&
        c.name === formValues.value["course"],
    )
    .map((c) => ({
      value: c.semester,
      label: t("semester", { semester: c.semester }),
    })),
  courseType: courses.value
    .filter(
      (c) =>
        c.program.degree.name === formValues.value["degree"] &&
        c.program.name === formValues.value["program"] &&
        (c.track?.name ?? null) === (formValues.value["track"] ?? null) &&
        c.name === formValues.value["course"] &&
        c.semester === formValues.value["semester"],
    )
    .map((c) => c.type.label),
}));

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed(() => ({
  uid: teachers.value.map((t) => t.uid),
  degree: degrees.value.map((d) => d.name),
  program: programs.value.map((p) => p.name),
  track: tracks.value.map((t) => t.name),
  course: courses.value.map((c) => c.name),
  semester: [1, 2, 3, 4, 5, 6],
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
