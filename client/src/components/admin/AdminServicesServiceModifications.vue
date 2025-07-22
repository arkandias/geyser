<script lang="ts">
export const adminServicesServiceModificationsColNames = [
  "year",
  "teacherEmail",
  "label",
  "hours",
] as const;

export type AdminServicesServiceModificationsColName =
  (typeof adminServicesServiceModificationsColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminServiceModificationFragment,
  AdminServiceModificationFragmentDoc,
  AdminServiceModificationsServiceFragmentDoc,
  AdminServiceModificationsTeacherFragmentDoc,
  DeleteServiceModificationsDocument,
  InsertServiceModificationsDocument,
  ServiceModificationConstraint,
  type ServiceModificationInsertInput,
  ServiceModificationUpdateColumn,
  UpdateServiceModificationsDocument,
  UpsertServiceModificationsDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  AdminColumns,
  NullableParsedRow,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminServiceModificationFragment;
type FlatRow = NullableParsedRow<typeof adminColumns>;
type InsertInput = ServiceModificationInsertInput;

const { serviceFragments, serviceModificationFragments, teacherFragments } =
  defineProps<{
    fetching: boolean;
    serviceFragments: FragmentType<
      typeof AdminServiceModificationsServiceFragmentDoc
    >[];
    serviceModificationFragments: FragmentType<
      typeof AdminServiceModificationFragmentDoc
    >[];
    teacherFragments: FragmentType<
      typeof AdminServiceModificationsTeacherFragmentDoc
    >[];
  }>();

const { t, n } = useTypedI18n();
const { organization } = useOrganizationStore();
const { years } = useYearsStore();

const adminColumns = {
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
    formComponent: "inputText",
  },
  hours: {
    type: "number",
    format: (val: number) => n(val, "decimalFixed"),
    formComponent: "inputNumber",
  },
} as const satisfies AdminColumns<
  AdminServicesServiceModificationsColName,
  Row
>;

graphql(`
  fragment AdminServiceModification on ServiceModification {
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

  fragment AdminServiceModificationsService on Service {
    id
    year
    teacher {
      email
      displayname
    }
  }

  fragment AdminServiceModificationsTeacher on Teacher {
    email
    displayname
  }

  mutation InsertServiceModifications(
    $objects: [ServiceModificationInsertInput!]!
  ) {
    insertData: insertServiceModification(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertServiceModifications(
    $objects: [ServiceModificationInsertInput!]!
    $onConflict: ServiceModificationOnConflict
  ) {
    upsertData: insertServiceModification(
      objects: $objects
      onConflict: $onConflict
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateServiceModifications(
    $ids: [Int!]!
    $changes: ServiceModificationSetInput!
  ) {
    updateData: updateServiceModification(
      where: { id: { _in: $ids } }
      _set: $changes
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteServiceModifications($ids: [Int!]!) {
    deleteData: deleteServiceModification(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const services = computed(() =>
  serviceFragments.map((f) =>
    useFragment(AdminServiceModificationsServiceFragmentDoc, f),
  ),
);
const serviceModifications = computed(() =>
  serviceModificationFragments.map((f) =>
    useFragment(AdminServiceModificationFragmentDoc, f),
  ),
);
const teachers = computed(() =>
  teacherFragments.map((f) =>
    useFragment(AdminServiceModificationsTeacherFragmentDoc, f),
  ),
);
const insertServiceModifications = useMutation(
  InsertServiceModificationsDocument,
);
const upsertServiceModifications = useMutation(
  UpsertServiceModificationsDocument,
);
const updateServiceModifications = useMutation(
  UpdateServiceModificationsDocument,
);
const deleteServiceModifications = useMutation(
  DeleteServiceModificationsDocument,
);

const importConstraint = ServiceModificationConstraint.ServiceModificationPkey;
const importUpdateColumns = [
  ServiceModificationUpdateColumn.ServiceId,
  ServiceModificationUpdateColumn.Label,
  ServiceModificationUpdateColumn.Hours,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  // serviceId
  if (flatRow.year !== undefined || flatRow.teacherEmail !== undefined) {
    if (flatRow.year === undefined || flatRow.teacherEmail === undefined) {
      throw new Error(
        t(
          "admin.services.serviceModifications.form.error.updateServiceMissingFields",
        ),
      );
    }
    object.serviceId = services.value.find(
      (s) =>
        s.year === flatRow.year && s.teacher.email === flatRow.teacherEmail,
    )?.id;
    if (object.serviceId === undefined) {
      throw new Error(
        t(
          "admin.services.serviceModifications.form.error.serviceNotFound",
          flatRow,
        ),
      );
    }
  }

  if (flatRow.label !== undefined) {
    object.label = flatRow.label;
  }

  if (flatRow.hours !== undefined) {
    if (flatRow.hours === null || flatRow.hours < 0) {
      throw new Error(
        t("admin.services.serviceModifications.form.error.hoursNegative"),
      );
    }
    object.hours = flatRow.hours;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    year: years.value.map((y) => y.value),
    teacherEmail: services.value
      .filter((s) => s.year === formValues.value["year"])
      .map((s) => ({
        value: s.teacher.email,
        label: s.teacher.displayname ?? "",
      })),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    teacherEmail: teachers.value.map((t) => ({
      value: t.email,
      label: t.displayname ?? "",
    })),
  }),
);
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="services"
    name="serviceModifications"
    :admin-columns
    :rows="serviceModifications"
    :fetching
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertServiceModifications"
    :upsert-data="upsertServiceModifications"
    :update-data="updateServiceModifications"
    :delete-data="deleteServiceModifications"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
