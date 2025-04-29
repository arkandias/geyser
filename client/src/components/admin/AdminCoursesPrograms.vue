<script lang="ts">
export type ColName = "degree" | "name" | "nameShort" | "visible";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminProgramFragment,
  AdminProgramFragmentDoc,
  AdminProgramsDegreeFragmentDoc,
  DeleteProgramsDocument,
  InsertProgramsDocument,
  ProgramConstraint,
  type ProgramInsertInput,
  ProgramUpdateColumn,
  UpdateProgramsDocument,
  UpsertProgramsDocument,
} from "@/gql/graphql.ts";
import type { NullableParsedRow, RowDescriptorExtra } from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminProgramFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = ProgramInsertInput;

const { degreeFragments, programFragments } = defineProps<{
  degreeFragments: FragmentType<typeof AdminProgramsDegreeFragmentDoc>[];
  programFragments: FragmentType<typeof AdminProgramFragmentDoc>[];
}>();

const { t } = useTypedI18n();

const idKey: keyof Row = "id";
const rowDescriptor = {
  degree: {
    type: "string",
    field: (row) => row.degree.name,
    format: (val: string) =>
      degrees.value.find((d) => d.name === val)?.nameDisplay,
    formType: "select",
  },
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
  fragment AdminProgram on Program {
    id
    degree {
      id
      name
      nameDisplay
    }
    name
    nameShort
    nameDisplay
    visible
  }

  fragment AdminProgramsDegree on Degree {
    id
    name
    nameDisplay
  }

  mutation InsertPrograms($objects: [ProgramInsertInput!]!) {
    insertData: insertProgram(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertPrograms(
    $objects: [ProgramInsertInput!]!
    $onConflict: ProgramOnConflict
  ) {
    upsertData: insertProgram(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdatePrograms($ids: [Int!]!, $changes: ProgramSetInput!) {
    updateData: updateProgram(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeletePrograms($ids: [Int!]!) {
    deleteData: deleteProgram(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const degrees = computed(() =>
  degreeFragments.map((f) => useFragment(AdminProgramsDegreeFragmentDoc, f)),
);
const programs = computed(() =>
  programFragments.map((f) => useFragment(AdminProgramFragmentDoc, f)),
);
const insertPrograms = useMutation(InsertProgramsDocument);
const upsertPrograms = useMutation(UpsertProgramsDocument);
const updatePrograms = useMutation(UpdateProgramsDocument);
const deletePrograms = useMutation(DeleteProgramsDocument);

const importConstraint = ProgramConstraint.ProgramDegreeIdNameKey;
const importUpdateColumns = [
  ProgramUpdateColumn.DegreeId,
  ProgramUpdateColumn.Name,
  ProgramUpdateColumn.NameShort,
  ProgramUpdateColumn.Visible,
];

const formatRow = (row: Row) => `${row.degree.nameDisplay} ${row.nameDisplay}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  // degreeId
  if (flatRow.degree !== undefined) {
    const degree = degrees.value.find((d) => d.name === flatRow.degree);
    if (degree === undefined) {
      throw new Error(
        t("admin.courses.programs.form.error.degreeNotFound", flatRow),
      );
    }
    object.degreeId = degree.id;
  }

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

const formOptions = computed(() => ({
  degree: degrees.value.map((d) => d.name),
}));
</script>

<template>
  <AdminData
    section="courses"
    name="programs"
    :id-key
    :row-descriptor
    :rows="programs"
    :format-row
    :validate-flat-row
    :form-options
    :insert-data="insertPrograms"
    :upsert-data="upsertPrograms"
    :update-data="updatePrograms"
    :delete-data="deletePrograms"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
