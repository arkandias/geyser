<script lang="ts">
export const adminTeachersPositionsColNames = [
  "label",
  "labelShort",
  "description",
  "baseServiceHours",
] as const;

export type AdminTeachersPositionsColName =
  (typeof adminTeachersPositionsColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminPositionFragment,
  AdminPositionFragmentDoc,
  DeletePositionsDocument,
  InsertPositionsDocument,
  PositionConstraint,
  type PositionInsertInput,
  PositionUpdateColumn,
  UpdatePositionsDocument,
  UpsertPositionsDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type { AdminColumns, ParsedRow, Scalar } from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminPositionFragment;
type FlatRow = Partial<ParsedRow<typeof adminColumns>>;
type InsertInput = PositionInsertInput;

const { positionFragments } = defineProps<{
  fetching: boolean;
  positionFragments: FragmentType<typeof AdminPositionFragmentDoc>[];
}>();

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

const adminColumns = {
  label: {
    type: "string",
    formComponent: "input",
    inputType: "text",
  },
  labelShort: {
    type: "string",
    nullable: true,
    formComponent: "input",
    inputType: "text",
  },
  description: {
    type: "string",
    nullable: true,
    formComponent: "input",
    inputType: "text",
  },
  baseServiceHours: {
    type: "number",
    nullable: true,
    formComponent: "input",
    inputType: "number",
  },
} as const satisfies AdminColumns<AdminTeachersPositionsColName, Row>;

graphql(`
  fragment AdminPosition on Position {
    id
    label
    labelShort
    description
    baseServiceHours
  }

  mutation InsertPositions($objects: [PositionInsertInput!]!) {
    insertData: insertPosition(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertPositions(
    $objects: [PositionInsertInput!]!
    $onConflict: PositionOnConflict!
  ) {
    upsertData: insertPosition(objects: $objects, onConflict: $onConflict) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdatePositions($ids: [Int!]!, $changes: PositionSetInput!) {
    updateData: updatePosition(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeletePositions($ids: [Int!]!) {
    deleteData: deletePosition(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const positions = computed(() =>
  positionFragments.map((f) => useFragment(AdminPositionFragmentDoc, f)),
);
const insertPositions = useMutation(InsertPositionsDocument);
const upsertPositions = useMutation(UpsertPositionsDocument);
const updatePositions = useMutation(UpdatePositionsDocument);
const deletePositions = useMutation(DeletePositionsDocument);

const importConstraint = PositionConstraint.PositionOidLabelKey;
const importUpdateColumns = [
  PositionUpdateColumn.Label,
  PositionUpdateColumn.Description,
  PositionUpdateColumn.BaseServiceHours,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  if (flatRow.label !== undefined) {
    object.label = flatRow.label;
  }

  if (flatRow.labelShort !== undefined) {
    object.labelShort = flatRow.labelShort;
  }

  if (flatRow.description !== undefined) {
    object.description = flatRow.description;
  }

  if (flatRow.baseServiceHours !== undefined) {
    if (flatRow.baseServiceHours !== null && flatRow.baseServiceHours < 0) {
      throw new Error(
        t("admin.teachers.positions.form.error.baseServiceHoursNegative"),
      );
    }
    object.baseServiceHours = flatRow.baseServiceHours;
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
    section="teachers"
    name="positions"
    :admin-columns
    :rows="positions"
    :fetching
    :validate-flat-row
    :insert-data="insertPositions"
    :upsert-data="upsertPositions"
    :update-data="updatePositions"
    :delete-data="deletePositions"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
