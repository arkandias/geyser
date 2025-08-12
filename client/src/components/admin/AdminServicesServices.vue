<script lang="ts">
export const adminServicesServicesColNames = [
  "year",
  "teacherEmail",
  "positionLabel",
  "hours",
] as const;

export type AdminServicesServicesColName =
  (typeof adminServicesServicesColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminServiceFragment,
  AdminServiceFragmentDoc,
  AdminServicesPositionFragmentDoc,
  AdminServicesTeacherFragmentDoc,
  DeleteServicesDocument,
  InsertServicesDocument,
  ServiceConstraint,
  type ServiceInsertInput,
  ServiceUpdateColumn,
  UpdateServicesDocument,
  UpsertServicesDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  AdminColumns,
  ParsedRow,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminServiceFragment;
type FlatRow = Partial<ParsedRow<typeof adminColumns>>;
type InsertInput = ServiceInsertInput;

const { serviceFragments, teacherFragments, positionFragments } = defineProps<{
  fetching: boolean;
  serviceFragments: FragmentType<typeof AdminServiceFragmentDoc>[];
  teacherFragments: FragmentType<typeof AdminServicesTeacherFragmentDoc>[];
  positionFragments: FragmentType<typeof AdminServicesPositionFragmentDoc>[];
}>();

const { t, n } = useTypedI18n();
const { organization } = useOrganizationStore();
const { years } = useYearsStore();

const adminColumns = {
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
  positionLabel: {
    type: "string",
    nullable: true,
    field: (row) => row.position?.label,
    formComponent: "select",
  },
  hours: {
    type: "number",
    nullable: true,
    format: (val: number) => n(val, "decimalFixed"),
    formComponent: "input",
    inputType: "number",
  },
} as const satisfies AdminColumns<AdminServicesServicesColName, Row>;

graphql(`
  fragment AdminService on Service {
    id
    year
    teacher {
      email
    }
    position {
      label
    }
    hours
  }

  fragment AdminServicesTeacher on Teacher {
    id
    email
    displayname
    position {
      id
      baseServiceHours
    }
    baseServiceHours
  }

  fragment AdminServicesPosition on Position {
    id
    label
  }

  mutation InsertServices($objects: [ServiceInsertInput!]!) {
    insertData: insertService(objects: $objects) {
      returning {
        oid
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
        oid
        id
      }
    }
  }

  mutation UpdateServices($ids: [Int!]!, $changes: ServiceSetInput!) {
    updateData: updateService(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteServices($ids: [Int!]!) {
    deleteData: deleteService(where: { id: { _in: $ids } }) {
      returning {
        oid
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
const positions = computed(() =>
  positionFragments.map((f) =>
    useFragment(AdminServicesPositionFragmentDoc, f),
  ),
);
const insertServices = useMutation(InsertServicesDocument);
const upsertServices = useMutation(UpsertServicesDocument);
const updateServices = useMutation(UpdateServicesDocument);
const deleteServices = useMutation(DeleteServicesDocument);

const importConstraint = ServiceConstraint.ServiceOidYearTeacherIdKey;
const importUpdateColumns = [
  ServiceUpdateColumn.Year,
  ServiceUpdateColumn.TeacherId,
  ServiceUpdateColumn.Hours,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

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
        t("admin.services.services.form.error.teacherNotFound", flatRow),
      );
    }
    object.teacherId = teacher.id;
  }

  // positionId
  if (flatRow.positionLabel !== undefined) {
    if (flatRow.positionLabel === null) {
      const teacher = teachers.value.find(
        (t) => t.email === flatRow.teacherEmail,
      );
      object.positionId = teacher?.position?.id ?? null;
    } else {
      const position = flatRow.positionLabel
        ? positions.value.find((p) => p.label === flatRow.positionLabel)
        : null;
      if (position === undefined) {
        throw new Error(
          t("admin.services.services.form.error.positionNotFound", flatRow),
        );
      }
      object.positionId = position?.id ?? null;
    }
  }

  // hours
  if (flatRow.hours !== undefined) {
    if (flatRow.hours !== null && flatRow.hours < 0) {
      throw new Error(t("admin.services.services.form.error.hoursNegative"));
    }
    if (flatRow.hours !== null) {
      object.hours = flatRow.hours;
    } else {
      const teacher = teachers.value.find(
        (t) => t.email === flatRow.teacherEmail,
      );
      object.hours =
        teacher?.baseServiceHours ?? teacher?.position?.baseServiceHours ?? 0;
    }
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
    positionLabel: positions.value.map((p) => p.label),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="services"
    name="services"
    :admin-columns
    :rows="services"
    :fetching
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
