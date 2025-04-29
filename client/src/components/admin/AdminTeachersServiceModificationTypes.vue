<script lang="ts">
export type ColName = "label" | "description";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed } from "vue";

import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminServiceModificationTypeFragment,
  AdminServiceModificationTypeFragmentDoc,
  DeleteServiceModificationTypesDocument,
  InsertServiceModificationTypesDocument,
  ServiceModificationTypeConstraint,
  type ServiceModificationTypeInsertInput,
  ServiceModificationTypeUpdateColumn,
  UpdateServiceModificationTypesDocument,
  UpsertServiceModificationTypesDocument,
} from "@/gql/graphql.ts";
import type { NullableParsedRow, RowDescriptorExtra } from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminServiceModificationTypeFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = ServiceModificationTypeInsertInput;

const { serviceModificationTypeFragments } = defineProps<{
  serviceModificationTypeFragments: FragmentType<
    typeof AdminServiceModificationTypeFragmentDoc
  >[];
}>();

const idKey: keyof Row = "id";
const rowDescriptor = {
  label: {
    type: "string",
    formType: "input",
  },
  description: {
    type: "string",
    nullable: true,
    formType: "input",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminServiceModificationType on ServiceModificationType {
    id
    label
    description
  }

  mutation InsertServiceModificationTypes(
    $objects: [ServiceModificationTypeInsertInput!]!
  ) {
    insertData: insertServiceModificationType(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertServiceModificationTypes(
    $objects: [ServiceModificationTypeInsertInput!]!
    $onConflict: ServiceModificationTypeOnConflict
  ) {
    upsertData: insertServiceModificationType(
      objects: $objects
      onConflict: $onConflict
    ) {
      returning {
        id
      }
    }
  }

  mutation UpdateServiceModificationTypes(
    $ids: [Int!]!
    $changes: ServiceModificationTypeSetInput!
  ) {
    updateData: updateServiceModificationType(
      where: { id: { _in: $ids } }
      _set: $changes
    ) {
      returning {
        id
      }
    }
  }

  mutation DeleteServiceModificationTypes($ids: [Int!]!) {
    deleteData: deleteServiceModificationType(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const serviceModificationTypes = computed(() =>
  serviceModificationTypeFragments.map((f) =>
    useFragment(AdminServiceModificationTypeFragmentDoc, f),
  ),
);
const insertServiceModificationTypes = useMutation(
  InsertServiceModificationTypesDocument,
);
const upsertServiceModificationTypes = useMutation(
  UpsertServiceModificationTypesDocument,
);
const updateServiceModificationTypes = useMutation(
  UpdateServiceModificationTypesDocument,
);
const deleteServiceModificationTypes = useMutation(
  DeleteServiceModificationTypesDocument,
);

const importConstraint =
  ServiceModificationTypeConstraint.ServiceModificationTypeLabelKey;
const importUpdateColumns = [
  ServiceModificationTypeUpdateColumn.Label,
  ServiceModificationTypeUpdateColumn.Description,
];

const formatRow = (row: Row) => row.label;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.label !== undefined) {
    object.label = flatRow.label;
  }

  if (flatRow.description !== undefined) {
    object.description = flatRow.description;
  }

  return object;
};
</script>

<template>
  <AdminData
    section="teachers"
    name="serviceModificationTypes"
    :id-key
    :row-descriptor
    :rows="serviceModificationTypes"
    :format-row
    :validate-flat-row
    :insert-data="insertServiceModificationTypes"
    :upsert-data="upsertServiceModificationTypes"
    :update-data="updateServiceModificationTypes"
    :delete-data="deleteServiceModificationTypes"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
