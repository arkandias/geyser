<script lang="ts">
export type ColName =
  | "uid"
  | "firstname"
  | "lastname"
  | "alias"
  | "position"
  | "baseServiceHours"
  | "visible"
  | "active";
</script>

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
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminTeacherFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = TeacherInsertInput;

const { teacherFragments, positionFragments } = defineProps<{
  teacherFragments: FragmentType<typeof AdminTeacherFragmentDoc>[];
  positionFragments: FragmentType<typeof AdminTeachersPositionFragmentDoc>[];
}>();

const { t } = useTypedI18n();

const idKey: keyof Row = "uid";
const rowDescriptor = {
  uid: {
    type: "string",
    formType: "input",
  },
  firstname: {
    type: "string",
    formType: "input",
  },
  lastname: {
    type: "string",
    formType: "input",
  },
  alias: {
    type: "string",
    nullable: true,
    formType: "input",
  },
  position: {
    type: "string",
    nullable: true,
    field: (row) => row.position?.label,
    formType: "select",
  },
  baseServiceHours: {
    type: "number",
    nullable: true,
    numberFormat: "decimalFixed",
    formType: "inputNum",
  },
  visible: {
    type: "boolean",
    formType: "toggle",
  },
  active: {
    type: "boolean",
    formType: "toggle",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminTeacher on Teacher {
    uid
    firstname
    lastname
    alias
    position {
      id
      label
    }
    baseServiceHours
    visible
    active
  }

  fragment AdminTeachersPosition on Position {
    id
    label
  }

  mutation InsertTeachers($objects: [TeacherInsertInput!]!) {
    insertData: insertTeacher(objects: $objects) {
      returning {
        uid
      }
    }
  }

  mutation UpsertTeachers(
    $objects: [TeacherInsertInput!]!
    $onConflict: TeacherOnConflict
  ) {
    upsertData: insertTeacher(objects: $objects, onConflict: $onConflict) {
      returning {
        uid
      }
    }
  }

  mutation UpdateTeachers($ids: [String!]!, $changes: TeacherSetInput!) {
    updateData: updateTeacher(where: { uid: { _in: $ids } }, _set: $changes) {
      returning {
        uid
      }
    }
  }

  mutation DeleteTeachers($ids: [String!]!) {
    deleteData: deleteTeacher(where: { uid: { _in: $ids } }) {
      returning {
        uid
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
  TeacherUpdateColumn.Uid,
  TeacherUpdateColumn.Firstname,
  TeacherUpdateColumn.Lastname,
  TeacherUpdateColumn.Alias,
  TeacherUpdateColumn.PositionId,
  TeacherUpdateColumn.BaseServiceHours,
  TeacherUpdateColumn.Visible,
  TeacherUpdateColumn.Active,
];

const formatRow = (row: Row) => row.uid;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.uid !== undefined) {
    object.uid = flatRow.uid;
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

  if (flatRow.position !== undefined) {
    object.positionId = flatRow.position
      ? positions.value.find((p) => p.label === flatRow.position)?.id
      : null;
    if (object.positionId === undefined) {
      throw new Error(
        t("admin.teachers.teachers.form.error.positionNotFound", flatRow),
      );
    }
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

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed(() => ({
  position: positions.value.map((p) => p.label),
}));

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="teachers"
    name="teachers"
    :id-key
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
