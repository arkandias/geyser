<script lang="ts">
export const adminCoursesCourseTypesColNames = [
  "label",
  "coefficient",
  "description",
] as const;

export type AdminCoursesCourseTypesColName =
  (typeof adminCoursesCourseTypesColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminCourseTypeFragment,
  AdminCourseTypeFragmentDoc,
  CourseTypeConstraint,
  type CourseTypeInsertInput,
  CourseTypeUpdateColumn,
  DeleteCourseTypesDocument,
  InsertCourseTypesDocument,
  UpdateCourseTypesDocument,
  UpsertCourseTypesDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type { AdminColumns, ParsedRow, Scalar } from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminCourseTypeFragment;
type FlatRow = Partial<ParsedRow<typeof adminColumns>>;
type InsertInput = CourseTypeInsertInput;

const { courseTypeFragments } = defineProps<{
  fetching: boolean;
  courseTypeFragments: FragmentType<typeof AdminCourseTypeFragmentDoc>[];
}>();

const { n } = useTypedI18n();
const { organization } = useOrganizationStore();

const adminColumns = {
  label: {
    type: "string",
    formComponent: "input",
    inputType: "text",
  },
  coefficient: {
    type: "number",
    format: (val: number) => n(val, "decimal"),
    formComponent: "input",
    inputType: "number",
  },
  description: {
    type: "string",
    nullable: true,
    formComponent: "input",
    inputType: "text",
  },
} as const satisfies AdminColumns<AdminCoursesCourseTypesColName, Row>;

graphql(`
  fragment AdminCourseType on CourseType {
    id
    label
    coefficient
    description
  }

  mutation InsertCourseTypes($objects: [CourseTypeInsertInput!]!) {
    insertData: insertCourseType(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertCourseTypes(
    $objects: [CourseTypeInsertInput!]!
    $onConflict: CourseTypeOnConflict
  ) {
    upsertData: insertCourseType(objects: $objects, onConflict: $onConflict) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateCourseTypes($ids: [Int!]!, $changes: CourseTypeSetInput!) {
    updateData: updateCourseType(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteCourseTypes($ids: [Int!]!) {
    deleteData: deleteCourseType(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const courseTypes = computed(() =>
  courseTypeFragments.map((f) => useFragment(AdminCourseTypeFragmentDoc, f)),
);
const insertCourseTypes = useMutation(InsertCourseTypesDocument);
const upsertCourseTypes = useMutation(UpsertCourseTypesDocument);
const updateCourseTypes = useMutation(UpdateCourseTypesDocument);
const deleteCourseTypes = useMutation(DeleteCourseTypesDocument);

const importConstraint = CourseTypeConstraint.CourseTypeOidLabelKey;
const importUpdateColumns = [
  CourseTypeUpdateColumn.Label,
  CourseTypeUpdateColumn.Coefficient,
  CourseTypeUpdateColumn.Description,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  if (flatRow.label !== undefined) {
    object.label = flatRow.label;
  }

  if (flatRow.coefficient !== undefined) {
    object.coefficient = flatRow.coefficient;
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
    name="courseTypes"
    :admin-columns
    :rows="courseTypes"
    :fetching
    :validate-flat-row
    :insert-data="insertCourseTypes"
    :upsert-data="upsertCourseTypes"
    :update-data="updateCourseTypes"
    :delete-data="deleteCourseTypes"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
