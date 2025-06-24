<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminTeacherFragment,
  AdminTeacherFragmentDoc,
  AdminTeachersPositionFragmentDoc,
  DeleteTeachersDocument,
  InsertTeachersDocument,
  TeacherConstraint,
  type TeacherInsertInput,
  TeacherUpdateColumn,
  UpdateTeachersDocument,
  UpsertTeachersDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";

import type { AdminTeachersTeachersColName } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminTeacherFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = TeacherInsertInput;

const { teacherFragments, positionFragments } = defineProps<{
  teacherFragments: FragmentType<typeof AdminTeacherFragmentDoc>[];
  positionFragments: FragmentType<typeof AdminTeachersPositionFragmentDoc>[];
}>();

const { t, n } = useTypedI18n();
const { organization } = useOrganizationStore();

const rowDescriptor = {
  email: {
    type: "string",
    formComponent: "input",
  },
  firstname: {
    type: "string",
    formComponent: "input",
  },
  lastname: {
    type: "string",
    formComponent: "input",
  },
  alias: {
    type: "string",
    nullable: true,
    formComponent: "input",
  },
  positionLabel: {
    type: "string",
    nullable: true,
    field: (row) => row.position?.label,
    formComponent: "select",
  },
  baseServiceHours: {
    type: "number",
    nullable: true,
    format: (val: number | null) =>
      val === null ? "" : n(val, "decimalFixed"),
    formComponent: "input",
    inputType: "number",
  },
  visible: {
    type: "boolean",
    format: (val: boolean) => (val ? "✓" : "✗"),
    formComponent: "toggle",
  },
  active: {
    type: "boolean",
    format: (val: boolean) => (val ? "✓" : "✗"),
    formComponent: "toggle",
  },
  access: {
    type: "boolean",
    format: (val: boolean) => (val ? "✓" : "✗"),
    formComponent: "toggle",
  },
} as const satisfies RowDescriptorExtra<AdminTeachersTeachersColName, Row>;

graphql(`
  fragment AdminTeacher on Teacher {
    id
    email
    firstname
    lastname
    alias
    position {
      label
    }
    baseServiceHours
    visible
    active
    access
  }

  fragment AdminTeachersPosition on Position {
    id
    label
  }

  mutation InsertTeachers($objects: [TeacherInsertInput!]!) {
    insertData: insertTeacher(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertTeachers(
    $objects: [TeacherInsertInput!]!
    $onConflict: TeacherOnConflict
  ) {
    upsertData: insertTeacher(objects: $objects, onConflict: $onConflict) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateTeachers($ids: [Int!]!, $changes: TeacherSetInput!) {
    updateData: updateTeacher(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteTeachers($ids: [Int!]!) {
    deleteData: deleteTeacher(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const teachers = computed(() =>
  teacherFragments.map((f) => useFragment(AdminTeacherFragmentDoc, f)),
);
const positions = computed(() =>
  positionFragments.map((f) =>
    useFragment(AdminTeachersPositionFragmentDoc, f),
  ),
);
const insertTeachers = useMutation(InsertTeachersDocument);
const upsertTeachers = useMutation(UpsertTeachersDocument);
const updateTeachers = useMutation(UpdateTeachersDocument);
const deleteTeachers = useMutation(DeleteTeachersDocument);

const importConstraint = TeacherConstraint.TeacherPkey;
const importUpdateColumns = [
  TeacherUpdateColumn.Oid,
  TeacherUpdateColumn.Email,
  TeacherUpdateColumn.Firstname,
  TeacherUpdateColumn.Lastname,
  TeacherUpdateColumn.Alias,
  TeacherUpdateColumn.PositionId,
  TeacherUpdateColumn.BaseServiceHours,
  TeacherUpdateColumn.Visible,
  TeacherUpdateColumn.Active,
  TeacherUpdateColumn.Access,
];

const formatRow = (row: Row) => row.email;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  if (flatRow.email !== undefined) {
    object.email = flatRow.email;
  }

  if (flatRow.firstname !== undefined) {
    object.firstname = flatRow.firstname;
  }

  if (flatRow.lastname !== undefined) {
    object.lastname = flatRow.lastname;
  }

  if (flatRow.alias !== undefined) {
    object.alias = flatRow.alias;
  }

  if (flatRow.positionLabel !== undefined) {
    const position = flatRow.positionLabel
      ? positions.value.find((p) => p.label === flatRow.positionLabel)
      : null;
    if (position === undefined) {
      throw new Error(
        t("admin.teachers.teachers.form.error.positionNotFound", flatRow),
      );
    }
    object.positionId = position !== null ? position.id : null;
  }

  if (flatRow.baseServiceHours !== undefined) {
    if (flatRow.baseServiceHours !== null && flatRow.baseServiceHours < 0) {
      throw new Error(
        t("admin.teachers.teachers.form.error.baseServiceHoursNegative"),
      );
    }
    object.baseServiceHours = flatRow.baseServiceHours;
  }

  if (flatRow.visible !== undefined) {
    object.visible = flatRow.visible;
  }

  if (flatRow.active !== undefined) {
    object.active = flatRow.active;
  }

  if (flatRow.access !== undefined) {
    object.access = flatRow.access;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed<SelectOptions<string, Row, typeof rowDescriptor>>(
  () => ({
    positionLabel: positions.value.map((p) => p.label),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="teachers"
    name="teachers"
    :row-descriptor
    :rows="teachers"
    :format-row
    :validate-flat-row
    :form-options
    :insert-data="insertTeachers"
    :upsert-data="upsertTeachers"
    :update-data="updateTeachers"
    :delete-data="deleteTeachers"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
