<script lang="ts">
export const adminCoursesDegreesColNames = [
  "name",
  "nameShort",
  "visible",
] as const;

export type AdminCoursesDegreesColName =
  (typeof adminCoursesDegreesColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

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
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type { AdminColumns, NullableParsedRow, Scalar } from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminDegreeFragment;
type FlatRow = NullableParsedRow<typeof adminColumns>;
type InsertInput = DegreeInsertInput;

const { degreeFragments } = defineProps<{
  fetching: boolean;
  degreeFragments: FragmentType<typeof AdminDegreeFragmentDoc>[];
}>();

const { organization } = useOrganizationStore();

const adminColumns = {
  name: {
    type: "string",
    formComponent: "inputText",
  },
  nameShort: {
    type: "string",
    nullable: true,
    formComponent: "inputText",
  },
  visible: {
    type: "boolean",
    formComponent: "toggle",
  },
} as const satisfies AdminColumns<AdminCoursesDegreesColName, Row>;

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
        oid
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
        oid
        id
      }
    }
  }

  mutation UpdateDegrees($ids: [Int!]!, $changes: DegreeSetInput!) {
    updateData: updateDegree(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteDegrees($ids: [Int!]!) {
    deleteData: deleteDegree(where: { id: { _in: $ids } }) {
      returning {
        oid
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

const importConstraint = DegreeConstraint.DegreeOidNameKey;
const importUpdateColumns = [
  DegreeUpdateColumn.Name,
  DegreeUpdateColumn.NameShort,
  DegreeUpdateColumn.Visible,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

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

const formValues = ref<Record<string, Scalar>>({});
const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="courses"
    name="degrees"
    :admin-columns
    :rows="degrees"
    :fetching
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
