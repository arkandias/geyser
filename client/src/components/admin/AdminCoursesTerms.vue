<script lang="ts">
export const adminCoursesTermsColNames = ["label", "description"] as const;

export type AdminCoursesTermsColName =
  (typeof adminCoursesTermsColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminTermFragment,
  AdminTermFragmentDoc,
  DeleteTermsDocument,
  InsertTermsDocument,
  TermConstraint,
  type TermInsertInput,
  TermUpdateColumn,
  UpdateTermsDocument,
  UpsertTermsDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type { AdminColumns, NullableParsedRow, Scalar } from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminTermFragment;
type FlatRow = NullableParsedRow<typeof adminColumns>;
type InsertInput = TermInsertInput;

const { termFragments } = defineProps<{
  fetching: boolean;
  termFragments: FragmentType<typeof AdminTermFragmentDoc>[];
}>();

const { organization } = useOrganizationStore();

const adminColumns = {
  label: {
    type: "string",
    formComponent: "input",
    inputType: "text",
  },
  description: {
    type: "string",
    nullable: true,
    formComponent: "input",
    inputType: "text",
  },
} as const satisfies AdminColumns<AdminCoursesTermsColName, Row>;

graphql(`
  fragment AdminTerm on Term {
    id
    label
    description
  }

  mutation InsertTerms($objects: [TermInsertInput!]!) {
    insertData: insertTerm(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertTerms(
    $objects: [TermInsertInput!]!
    $onConflict: TermOnConflict
  ) {
    upsertData: insertTerm(objects: $objects, onConflict: $onConflict) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateTerms($ids: [Int!]!, $changes: TermSetInput!) {
    updateData: updateTerm(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteTerms($ids: [Int!]!) {
    deleteData: deleteTerm(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const terms = computed(() =>
  termFragments.map((f) => useFragment(AdminTermFragmentDoc, f)),
);
const insertTerms = useMutation(InsertTermsDocument);
const upsertTerms = useMutation(UpsertTermsDocument);
const updateTerms = useMutation(UpdateTermsDocument);
const deleteTerms = useMutation(DeleteTermsDocument);

const importConstraint = TermConstraint.TermOidLabelKey;
const importUpdateColumns = [
  TermUpdateColumn.Label,
  TermUpdateColumn.Description,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  if (flatRow.label !== undefined) {
    object.label = flatRow.label;
  }

  if (flatRow.description !== undefined) {
    object.description = flatRow.description;
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
    name="terms"
    :admin-columns
    :rows="terms"
    :fetching
    :validate-flat-row
    :insert-data="insertTerms"
    :upsert-data="upsertTerms"
    :update-data="updateTerms"
    :delete-data="deleteTerms"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
