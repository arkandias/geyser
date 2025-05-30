<script lang="ts">
export type ColName = "label" | "coefficient" | "description";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

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
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminCourseTypeFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = CourseTypeInsertInput;

const { courseTypeFragments } = defineProps<{
  courseTypeFragments: FragmentType<typeof AdminCourseTypeFragmentDoc>[];
}>();

const idKey: keyof Row = "id";
const rowDescriptor = {
  label: {
    type: "string",
    formType: "input",
  },
  coefficient: {
    type: "number",
    numberFormat: "decimal",
    formType: "inputNum",
  },
  description: {
    type: "string",
    nullable: true,
    formType: "input",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

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
        id
      }
    }
  }

  mutation UpdateCourseTypes($ids: [Int!]!, $changes: CourseTypeSetInput!) {
    updateData: updateCourseType(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeleteCourseTypes($ids: [Int!]!) {
    deleteData: deleteCourseType(where: { id: { _in: $ids } }) {
      returning {
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

const importConstraint = CourseTypeConstraint.CourseTypeLabelKey;
const importUpdateColumns = [
  CourseTypeUpdateColumn.Label,
  CourseTypeUpdateColumn.Coefficient,
  CourseTypeUpdateColumn.Description,
];

const formatRow = (row: Row) => row.label;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

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
    :id-key
    :row-descriptor
    :rows="courseTypes"
    :format-row
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
