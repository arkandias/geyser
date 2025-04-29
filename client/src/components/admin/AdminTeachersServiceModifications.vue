<script lang="ts">
export type ColName = "year" | "uid" | "type" | "hours";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminServiceModificationFragment,
  AdminServiceModificationFragmentDoc,
  AdminServiceModificationsServiceFragmentDoc,
  AdminServiceModificationsServiceModificationTypeFragmentDoc,
  AdminServiceModificationsTeacherFragmentDoc,
  DeleteServiceModificationsDocument,
  InsertServiceModificationsDocument,
  ServiceModificationConstraint,
  type ServiceModificationInsertInput,
  ServiceModificationUpdateColumn,
  UpdateServiceModificationsDocument,
  UpsertServiceModificationsDocument,
} from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type { NullableParsedRow, RowDescriptorExtra } from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminServiceModificationFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = ServiceModificationInsertInput;

const {
  serviceFragments,
  serviceModificationFragments,
  serviceModificationTypeFragments,
  teacherFragments,
} = defineProps<{
  serviceFragments: FragmentType<
    typeof AdminServiceModificationsServiceFragmentDoc
  >[];
  serviceModificationFragments: FragmentType<
    typeof AdminServiceModificationFragmentDoc
  >[];
  serviceModificationTypeFragments: FragmentType<
    typeof AdminServiceModificationsServiceModificationTypeFragmentDoc
  >[];
  teacherFragments: FragmentType<
    typeof AdminServiceModificationsTeacherFragmentDoc
  >[];
}>();

const { t } = useTypedI18n();
const { years } = useYearsStore();

const idKey: keyof Row = "id";
const rowDescriptor = {
  year: {
    type: "number",
    field: (row) => row.service.year,
    formType: "select",
  },
  uid: {
    type: "string",
    field: (row) => row.service.uid,
    format: (val: string) =>
      teachers.value.find((t) => t.uid === val)?.displayname,
    formType: "select",
  },
  type: {
    type: "string",
    field: (row) => row.type.label,
    formType: "select",
  },
  hours: {
    type: "number",
    numberFormat: "decimalFixed",
    formType: "inputNum",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminServiceModification on ServiceModification {
    id
    service {
      year
      uid
    }
    type {
      id
      label
    }
    hours
  }

  fragment AdminServiceModificationsServiceModificationType on ServiceModificationType {
    id
    label
  }

  fragment AdminServiceModificationsService on Service {
    id
    year
    uid
  }

  fragment AdminServiceModificationsTeacher on Teacher {
    uid
    displayname
  }

  mutation InsertServiceModifications(
    $objects: [ServiceModificationInsertInput!]!
  ) {
    insertData: insertServiceModification(objects: $objects) {
      returning {
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
        id
      }
    }
  }

  mutation DeleteServiceModifications($ids: [Int!]!) {
    deleteData: deleteServiceModification(where: { id: { _in: $ids } }) {
      returning {
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
const serviceModificationTypes = computed(() =>
  serviceModificationTypeFragments.map((f) =>
    useFragment(AdminServiceModificationsServiceModificationTypeFragmentDoc, f),
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
  ServiceModificationUpdateColumn.TypeId,
  ServiceModificationUpdateColumn.Hours,
];

const formatRow = (row: Row): string =>
  `${row.service.year} — ${row.service.uid} — ${row.type.label}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  // serviceId
  if (flatRow.year !== undefined || flatRow.uid !== undefined) {
    if (flatRow.uid === undefined) {
      throw new Error(
        t(
          "admin.teachers.serviceModifications.form.error.updateYearWithoutTeacher",
        ),
      );
    }
    if (flatRow.year === undefined) {
      throw new Error(
        t(
          "admin.teachers.serviceModifications.form.error.updateTeacherWithoutYear",
        ),
      );
    }
    object.serviceId = services.value.find(
      (s) => s.year === flatRow.year && s.uid === flatRow.uid,
    )?.id;
    if (object.serviceId === undefined) {
      throw new Error(
        t(
          "admin.teachers.serviceModifications.form.error.serviceNotFound",
          flatRow,
        ),
      );
    }
  }

  // typeId
  if (flatRow.type !== undefined) {
    object.typeId = serviceModificationTypes.value.find(
      (smt) => smt.label === flatRow.type,
    )?.id;
    if (object.typeId === undefined) {
      throw new Error(
        t(
          "admin.teachers.serviceModifications.form.error.typeNotFound",
          flatRow,
        ),
      );
    }
  }

  if (flatRow.hours !== undefined) {
    if (flatRow.hours === null || flatRow.hours < 0) {
      throw new Error(
        t("admin.teachers.serviceModifications.form.error.hoursNegative"),
      );
    }
    object.hours = flatRow.hours;
  }

  return object;
};

const formOptions = computed(() => ({
  year: years.value.map((y) => y.value),
  uid: teachers.value.map((t) => ({ value: t.uid, label: t.displayname })),
  type: serviceModificationTypes.value.map((smt) => smt.label),
}));
</script>

<template>
  <AdminData
    section="teachers"
    name="serviceModifications"
    :id-key
    :row-descriptor
    :rows="serviceModifications"
    :format-row
    :validate-flat-row
    :form-options
    :insert-data="insertServiceModifications"
    :upsert-data="upsertServiceModifications"
    :update-data="updateServiceModifications"
    :delete-data="deleteServiceModifications"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
