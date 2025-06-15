<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

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
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";

import type { AdminCoursesProgramsColName } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminProgramFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = ProgramInsertInput;

const { degreeFragments, programFragments } = defineProps<{
  degreeFragments: FragmentType<typeof AdminProgramsDegreeFragmentDoc>[];
  programFragments: FragmentType<typeof AdminProgramFragmentDoc>[];
}>();

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

const rowDescriptor = {
  degreeName: {
    type: "string",
    field: (row) => row.degree.name,
    format: (val: string) =>
      degrees.value.find((d) => d.name === val)?.nameDisplay,
    formComponent: "select",
  },
  name: {
    type: "string",
    formComponent: "input",
  },
  nameShort: {
    type: "string",
    nullable: true,
    formComponent: "input",
  },
  visible: {
    type: "boolean",
    format: (val: boolean) => (val ? "✓" : "✗"),
    formComponent: "toggle",
  },
} as const satisfies RowDescriptorExtra<AdminCoursesProgramsColName, Row>;

graphql(`
  fragment AdminProgram on Program {
    id
    degree {
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
        oid
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
        oid
        id
      }
    }
  }

  mutation UpdatePrograms($ids: [Int!]!, $changes: ProgramSetInput!) {
    updateData: updateProgram(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeletePrograms($ids: [Int!]!) {
    deleteData: deleteProgram(where: { id: { _in: $ids } }) {
      returning {
        oid
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

const importConstraint = ProgramConstraint.ProgramOidDegreeIdNameKey;
const importUpdateColumns = [
  ProgramUpdateColumn.Oid,
  ProgramUpdateColumn.DegreeId,
  ProgramUpdateColumn.Name,
  ProgramUpdateColumn.NameShort,
  ProgramUpdateColumn.Visible,
];

const formatRow = (row: Row) => `${row.degree.nameDisplay} ${row.nameDisplay}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };
  // degreeId
  if (flatRow.degreeName !== undefined) {
    const degree = degrees.value.find((d) => d.name === flatRow.degreeName);
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

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed(() => ({
  degreeName: degrees.value.map((d) => d.name),
}));

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="courses"
    name="programs"
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
