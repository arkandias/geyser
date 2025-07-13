<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminExternalCourseFragment,
  AdminExternalCourseFragmentDoc,
  AdminExternalCoursesServiceFragmentDoc,
  AdminExternalCoursesTeacherFragmentDoc,
  DeleteExternalCoursesDocument,
  ExternalCourseConstraint,
  type ExternalCourseInsertInput,
  ExternalCourseUpdateColumn,
  InsertExternalCoursesDocument,
  UpdateExternalCoursesDocument,
  UpsertExternalCoursesDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";

import type { AdminServicesExternalCoursesColName } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminExternalCourseFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = ExternalCourseInsertInput;

const { externalCourseFragments, serviceFragments, teacherFragments } =
  defineProps<{
    fetching: boolean;
    externalCourseFragments: FragmentType<
      typeof AdminExternalCourseFragmentDoc
    >[];
    serviceFragments: FragmentType<
      typeof AdminExternalCoursesServiceFragmentDoc
    >[];
    teacherFragments: FragmentType<
      typeof AdminExternalCoursesTeacherFragmentDoc
    >[];
  }>();

const { t, n } = useTypedI18n();
const { organization } = useOrganizationStore();
const { years } = useYearsStore();

const rowDescriptor = {
  year: {
    type: "number",
    field: (row) => row.service.year,
    formComponent: "select",
  },
  teacherEmail: {
    type: "string",
    field: (row) => row.service.teacher.email,
    format: (val: string) =>
      teachers.value.find((t) => t.email === val)?.displayname,
    formComponent: "select",
  },
  label: {
    type: "string",
    field: (row) => row.label,
    formComponent: "input",
  },
  hours: {
    type: "number",
    format: (val: number) => n(val, "decimalFixed"),
    formComponent: "input",
    inputType: "number",
  },
} as const satisfies RowDescriptorExtra<
  AdminServicesExternalCoursesColName,
  Row
>;

graphql(`
  fragment AdminExternalCourse on ExternalCourse {
    id
    service {
      year
      teacher {
        email
      }
    }
    label
    hours
  }

  fragment AdminExternalCoursesService on Service {
    id
    year
    teacher {
      email
    }
  }

  fragment AdminExternalCoursesTeacher on Teacher {
    email
    displayname
  }

  mutation InsertExternalCourses($objects: [ExternalCourseInsertInput!]!) {
    insertData: insertExternalCourse(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertExternalCourses(
    $objects: [ExternalCourseInsertInput!]!
    $onConflict: ExternalCourseOnConflict
  ) {
    upsertData: insertExternalCourse(
      objects: $objects
      onConflict: $onConflict
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateExternalCourses(
    $ids: [Int!]!
    $changes: ExternalCourseSetInput!
  ) {
    updateData: updateExternalCourse(
      where: { id: { _in: $ids } }
      _set: $changes
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteExternalCourses($ids: [Int!]!) {
    deleteData: deleteExternalCourse(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const services = computed(() =>
  serviceFragments.map((f) =>
    useFragment(AdminExternalCoursesServiceFragmentDoc, f),
  ),
);
const externalCourses = computed(() =>
  externalCourseFragments.map((f) =>
    useFragment(AdminExternalCourseFragmentDoc, f),
  ),
);
const teachers = computed(() =>
  teacherFragments.map((f) =>
    useFragment(AdminExternalCoursesTeacherFragmentDoc, f),
  ),
);
const insertExternalCourses = useMutation(InsertExternalCoursesDocument);
const upsertExternalCourses = useMutation(UpsertExternalCoursesDocument);
const updateExternalCourses = useMutation(UpdateExternalCoursesDocument);
const deleteExternalCourses = useMutation(DeleteExternalCoursesDocument);

const importConstraint = ExternalCourseConstraint.ExternalCoursePkey;
const importUpdateColumns = [
  ExternalCourseUpdateColumn.Oid,
  ExternalCourseUpdateColumn.ServiceId,
  ExternalCourseUpdateColumn.Label,
  ExternalCourseUpdateColumn.Hours,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  // serviceId
  if (flatRow.year !== undefined || flatRow.teacherEmail !== undefined) {
    if (flatRow.teacherEmail === undefined) {
      throw new Error(
        t("admin.services.externalCourses.form.error.updateYearWithoutTeacher"),
      );
    }
    if (flatRow.year === undefined) {
      throw new Error(
        t("admin.services.externalCourses.form.error.updateTeacherWithoutYear"),
      );
    }
    object.serviceId = services.value.find(
      (s) =>
        s.year === flatRow.year && s.teacher.email === flatRow.teacherEmail,
    )?.id;
    if (object.serviceId === undefined) {
      throw new Error(
        t("admin.services.externalCourses.form.error.serviceNotFound", flatRow),
      );
    }
  }

  if (flatRow.label !== undefined) {
    object.label = flatRow.label;
  }

  if (flatRow.hours !== undefined) {
    if (flatRow.hours === null || flatRow.hours < 0) {
      throw new Error(
        t("admin.services.externalCourses.form.error.hoursNegative"),
      );
    }
    object.hours = flatRow.hours;
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
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="services"
    name="externalCourses"
    :row-descriptor
    :rows="externalCourses"
    :fetching
    :validate-flat-row
    :form-options
    :insert-data="insertExternalCourses"
    :upsert-data="upsertExternalCourses"
    :update-data="updateExternalCourses"
    :delete-data="deleteExternalCourses"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
