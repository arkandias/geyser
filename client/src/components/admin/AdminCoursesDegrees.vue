<script lang="ts">
export type ColName = "name" | "nameShort" | "visible";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed } from "vue";

import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminDegreeFragment,
  AdminDegreeFragmentDoc,
  DegreeConstraint,
  type DegreeInsertInput,
  DegreeUpdateColumn,
  DeleteDegreesDocument,
  InsertDegreesDocument,
  UpdateDegreesDocument,
  UpsertDegreesDocument,
} from "@/gql/graphql.ts";
import type { NullableParsedRow, RowDescriptorExtra } from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminDegreeFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = DegreeInsertInput;

const { degreeFragments } = defineProps<{
  degreeFragments: FragmentType<typeof AdminDegreeFragmentDoc>[];
}>();

const idKey: keyof Row = "id";
const rowDescriptor = {
  name: {
    type: "string",
    formType: "input",
  },
  nameShort: {
    type: "string",
    nullable: true,
    formType: "input",
  },
  visible: {
    type: "boolean",
    formType: "toggle",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminDegree on Degree {
    id
    name
    nameShort
    visible
  }

  mutation InsertDegrees($objects: [DegreeInsertInput!]!) {
    insertData: insertDegree(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertDegrees(
    $objects: [DegreeInsertInput!]!
    $onConflict: DegreeOnConflict
  ) {
    upsertData: insertDegree(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdateDegrees($ids: [Int!]!, $changes: DegreeSetInput!) {
    updateData: updateDegree(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeleteDegrees($ids: [Int!]!) {
    deleteData: deleteDegree(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const degrees = computed(() =>
  degreeFragments.map((f) => useFragment(AdminDegreeFragmentDoc, f)),
);
const insertDegrees = useMutation(InsertDegreesDocument);
const upsertDegrees = useMutation(UpsertDegreesDocument);
const updateDegrees = useMutation(UpdateDegreesDocument);
const deleteDegrees = useMutation(DeleteDegreesDocument);

const importConstraint = DegreeConstraint.DegreeNameKey;
const importUpdateColumns = [
  DegreeUpdateColumn.Name,
  DegreeUpdateColumn.NameShort,
  DegreeUpdateColumn.Visible,
];

const formatRow = (row: Row) => row.name;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.name !== undefined) {
    object.name = flatRow.name;
  }

  if (flatRow.nameShort !== undefined) {
    object.nameShort = flatRow.nameShort;
  }

  if (flatRow.visible !== undefined) {
    object.visible = flatRow.visible;
  }

  return object;
};
</script>

<template>
  <AdminData
    section="courses"
    name="degrees"
    :id-key
    :row-descriptor
    :rows="degrees"
    :format-row
    :validate-flat-row
    :insert-data="insertDegrees"
    :upsert-data="upsertDegrees"
    :update-data="updateDegrees"
    :delete-data="deleteDegrees"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
