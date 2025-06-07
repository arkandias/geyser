<script lang="ts">
export type ColName = "year" | "teacherEmail" | "hours" | "message";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminServiceFragment,
  AdminServiceFragmentDoc,
  AdminServicesTeacherFragmentDoc,
  DeleteServicesDocument,
  InsertServicesDocument,
  ServiceConstraint,
  type ServiceInsertInput,
  ServiceUpdateColumn,
  UpdateServicesDocument,
  UpsertServicesDocument,
} from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminServiceFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = ServiceInsertInput;

const { serviceFragments, teacherFragments } = defineProps<{
  serviceFragments: FragmentType<typeof AdminServiceFragmentDoc>[];
  teacherFragments: FragmentType<typeof AdminServicesTeacherFragmentDoc>[];
}>();

const { t } = useTypedI18n();
const { years } = useYearsStore();

const rowDescriptor = {
  year: {
    type: "number",
    formType: "select",
  },
  teacherEmail: {
    type: "string",
    format: (val: string) =>
      teachers.value.find((t) => t.email === val)?.displayname,
    formType: "select",
  },
  hours: {
    type: "number",
    numberFormat: "decimalFixed",
    formType: "inputNum",
  },
  message: {
    type: "string",
    nullable: true,
    format: (val: string) => (val ? "✓" : "✗"),
    formType: "input",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminService on Service {
    id
    year
    teacher {
      email
      displayname
    }
    hours
  }

  fragment AdminServicesTeacher on Teacher {
    id
    email
    displayname
  }

  mutation InsertServices($objects: [ServiceInsertInput!]!) {
    insertData: insertService(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertServices(
    $objects: [ServiceInsertInput!]!
    $onConflict: ServiceOnConflict
  ) {
    upsertData: insertService(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdateServices($ids: [Int!]!, $changes: ServiceSetInput!) {
    updateData: updateService(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeleteServices($ids: [Int!]!) {
    deleteData: deleteService(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const services = computed(() =>
  serviceFragments.map((f) => useFragment(AdminServiceFragmentDoc, f)),
);
const teachers = computed(() =>
  teacherFragments.map((f) => useFragment(AdminServicesTeacherFragmentDoc, f)),
);
const insertServices = useMutation(InsertServicesDocument);
const upsertServices = useMutation(UpsertServicesDocument);
const updateServices = useMutation(UpdateServicesDocument);
const deleteServices = useMutation(DeleteServicesDocument);

const importConstraint = ServiceConstraint.ServiceYearTeacherIdKey;
const importUpdateColumns = [
  ServiceUpdateColumn.Year,
  ServiceUpdateColumn.TeacherId,
  ServiceUpdateColumn.Hours,
];

const formatRow = (row: Row): string =>
  `${row.year} — ${row.teacher.displayname}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.year !== undefined) {
    object.year = flatRow.year;
  }

  // teacherId
  if (flatRow.teacherEmail !== undefined) {
    const teacher = teachers.value.find(
      (t) => t.email === flatRow.teacherEmail,
    );
    if (teacher === undefined) {
      throw new Error(
        t("admin.teachers.services.form.error.teacherNotFound", {
          email: flatRow.teacherEmail,
        }),
      );
    }
    object.teacherId = teacher.id;
  }

  if (flatRow.hours !== undefined) {
    if (flatRow.hours === null || flatRow.hours < 0) {
      throw new Error(t("admin.teachers.services.form.error.hoursNegative"));
    }
    object.hours = flatRow.hours;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed(() => ({
  year: years.value.map((y) => y.value),
  teacherEmail: teachers.value.map((t) => ({
    value: t.email,
    label: t.displayname,
  })),
}));

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="teachers"
    name="services"
    :row-descriptor
    :rows="services"
    :format-row
    :validate-flat-row
    :form-options
    :insert-data="insertServices"
    :upsert-data="upsertServices"
    :update-data="updateServices"
    :delete-data="deleteServices"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
