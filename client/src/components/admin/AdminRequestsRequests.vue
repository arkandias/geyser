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
  | "type"
  | "hours";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminRequestFragment,
  AdminRequestFragmentDoc,
  AdminRequestsCourseFragmentDoc,
  AdminRequestsCourseTypeFragmentDoc,
  AdminRequestsDegreeFragmentDoc,
  AdminRequestsProgramFragmentDoc,
  AdminRequestsServiceFragmentDoc,
  AdminRequestsTeacherFragmentDoc,
  AdminRequestsTrackFragmentDoc,
  DeleteRequestsDocument,
  InsertRequestsDocument,
  RequestConstraint,
  type RequestInsertInput,
  RequestTypeEnum,
  RequestUpdateColumn,
  UpdateRequestsDocument,
  UpsertRequestsDocument,
} from "@/gql/graphql.ts";
import { requestTypeLabel } from "@/locales/helpers.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";
import { isRequestType, unique } from "@/utils";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminRequestFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = RequestInsertInput;

const {
  requestFragments,
  serviceFragments,
  teacherFragments,
  courseFragments,
  degreeFragments,
  programFragments,
  trackFragments,
  courseTypeFragments,
} = defineProps<{
  requestFragments: FragmentType<typeof AdminRequestFragmentDoc>[];
  serviceFragments: FragmentType<typeof AdminRequestsServiceFragmentDoc>[];
  teacherFragments: FragmentType<typeof AdminRequestsTeacherFragmentDoc>[];
  courseFragments: FragmentType<typeof AdminRequestsCourseFragmentDoc>[];
  degreeFragments: FragmentType<typeof AdminRequestsDegreeFragmentDoc>[];
  programFragments: FragmentType<typeof AdminRequestsProgramFragmentDoc>[];
  trackFragments: FragmentType<typeof AdminRequestsTrackFragmentDoc>[];
  courseTypeFragments: FragmentType<
    typeof AdminRequestsCourseTypeFragmentDoc
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
  type: {
    type: "string",
    info: `${RequestTypeEnum.Assignment} | ${RequestTypeEnum.Primary} | ${RequestTypeEnum.Secondary}`,
    format: (val: RequestTypeEnum) => requestTypeLabel(t, val),
    formType: "select",
  },
  hours: {
    type: "number",
    numberFormat: "decimal",
    formType: "inputNum",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminRequest on Request {
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
    type
    hours
  }

  fragment AdminRequestsService on Service {
    id
    year
    teacher {
      email
      displayname
    }
  }

  fragment AdminRequestsTeacher on Teacher {
    email
    displayname
  }

  fragment AdminRequestsCourse on Course {
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

  fragment AdminRequestsDegree on Degree {
    id
    name
    nameDisplay
  }

  fragment AdminRequestsProgram on Program {
    id
    name
    nameDisplay
  }

  fragment AdminRequestsTrack on Track {
    id
    name
    nameDisplay
  }

  fragment AdminRequestsCourseType on CourseType {
    id
    label
  }

  mutation InsertRequests($objects: [RequestInsertInput!]!) {
    insertData: insertRequest(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertRequests(
    $objects: [RequestInsertInput!]!
    $onConflict: RequestOnConflict
  ) {
    upsertData: insertRequest(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdateRequests($ids: [Int!]!, $changes: RequestSetInput!) {
    updateData: updateRequest(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeleteRequests($ids: [Int!]!) {
    deleteData: deleteRequest(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const requests = computed(() =>
  requestFragments.map((f) => useFragment(AdminRequestFragmentDoc, f)),
);
const services = computed(() =>
  serviceFragments.map((f) => useFragment(AdminRequestsServiceFragmentDoc, f)),
);
const teachers = computed(() =>
  teacherFragments.map((f) => useFragment(AdminRequestsTeacherFragmentDoc, f)),
);
const courses = computed(() =>
  courseFragments.map((f) => useFragment(AdminRequestsCourseFragmentDoc, f)),
);
const degrees = computed(() =>
  degreeFragments.map((f) => useFragment(AdminRequestsDegreeFragmentDoc, f)),
);
const programs = computed(() =>
  programFragments.map((f) => useFragment(AdminRequestsProgramFragmentDoc, f)),
);
const tracks = computed(() =>
  trackFragments.map((f) => useFragment(AdminRequestsTrackFragmentDoc, f)),
);
const courseTypes = computed(() =>
  courseTypeFragments.map((f) =>
    useFragment(AdminRequestsCourseTypeFragmentDoc, f),
  ),
);
const insertRequests = useMutation(InsertRequestsDocument);
const upsertRequests = useMutation(UpsertRequestsDocument);
const updateRequests = useMutation(UpdateRequestsDocument);
const deleteRequests = useMutation(DeleteRequestsDocument);

const importConstraint = RequestConstraint.RequestServiceIdCourseIdTypeKey;
const importUpdateColumns = [
  RequestUpdateColumn.ServiceId,
  RequestUpdateColumn.CourseId,
  RequestUpdateColumn.Type,
  RequestUpdateColumn.Hours,
];

const formatRow = (row: Row) =>
  `${requestTypeLabel(t, row.type)} — ` +
  `${row.year} — ${row.service.teacher.displayname} — ` +
  `${row.course.program.degree.name} — ${row.course.program.name} ` +
  (row.course.track ? `— ${row.course.track.name}` : "") +
  `— ${row.course.name} — ${row.course.semester} — ${row.course.type.label}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.year !== undefined) {
    object.year = flatRow.year;
  }

  // serviceId
  if (flatRow.teacherEmail !== undefined) {
    if (flatRow.year === undefined) {
      throw new Error(
        t("admin.requests.requests.form.error.updateTeacherWithoutYear"),
      );
    }
    const service = services.value.find(
      (s) =>
        s.year === flatRow.year && s.teacher.email === flatRow.teacherEmail,
    );
    if (service === undefined) {
      throw new Error(
        t("admin.requests.requests.form.error.serviceNotFound", flatRow),
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
        t("admin.requests.requests.form.error.updateCourseMissingFields"),
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
        t("admin.requests.requests.form.error.courseNotFound", flatRow),
      );
    }

    object.courseId = course.id;
  }

  if (flatRow.type !== undefined) {
    if (!isRequestType(flatRow.type)) {
      throw new Error(t("admin.requests.requests.form.error.invalidType"));
    }
    object.type = flatRow.type;
  }

  if (flatRow.hours !== undefined) {
    if (flatRow.hours === null || flatRow.hours < 0) {
      throw new Error(t("admin.requests.requests.form.error.hoursNegative"));
    }
    object.hours = flatRow.hours;
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
  type: Object.values(RequestTypeEnum).map((type) => requestTypeLabel(t, type)),
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
    name="requests"
    :id-key
    :row-descriptor
    :rows="requests"
    :format-row
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertRequests"
    :upsert-data="upsertRequests"
    :update-data="updateRequests"
    :delete-data="deleteRequests"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
