<script lang="ts">
export type ColName = "uid" | "type" | "comment";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminRoleFragment,
  AdminRoleFragmentDoc,
  AdminRolesTeacherFragmentDoc,
  DeleteRolesDocument,
  InsertRolesDocument,
  RoleConstraint,
  type RoleInsertInput,
  RoleTypeEnum,
  RoleUpdateColumn,
  UpdateRolesDocument,
  UpsertRolesDocument,
} from "@/gql/graphql.ts";
import { roleTypeLabel } from "@/locales/helpers.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";
import { isRole } from "@/utils/enum-guards.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminRoleFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = RoleInsertInput;

const { roleFragments, teacherFragments } = defineProps<{
  roleFragments: FragmentType<typeof AdminRoleFragmentDoc>[];
  teacherFragments: FragmentType<typeof AdminRolesTeacherFragmentDoc>[];
}>();

const { t } = useTypedI18n();

const idKey: keyof Row = "id";
const rowDescriptor = {
  uid: {
    type: "string",
    format: (val: string) =>
      teachers.value.find((t) => t.uid === val)?.displayname,
    formType: "select",
  },
  type: {
    type: "string",
    format: (val: RoleTypeEnum) => roleTypeLabel(t, val),
    formType: "select",
  },
  comment: {
    type: "string",
    nullable: true,
    formType: "input",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminRole on Role {
    id
    uid
    type
    comment
  }

  fragment AdminRolesTeacher on Teacher {
    uid
    displayname
  }

  mutation InsertRoles($objects: [RoleInsertInput!]!) {
    insertData: insertRole(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertRoles(
    $objects: [RoleInsertInput!]!
    $onConflict: RoleOnConflict
  ) {
    upsertData: insertRole(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdateRoles($ids: [Int!]!, $changes: RoleSetInput!) {
    updateData: updateRole(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeleteRoles($ids: [Int!]!) {
    deleteData: deleteRole(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const roles = computed(() =>
  roleFragments.map((f) => useFragment(AdminRoleFragmentDoc, f)),
);
const teachers = computed(() =>
  teacherFragments.map((f) => useFragment(AdminRolesTeacherFragmentDoc, f)),
);
const insertServices = useMutation(InsertRolesDocument);
const upsertServices = useMutation(UpsertRolesDocument);
const updateServices = useMutation(UpdateRolesDocument);
const deleteServices = useMutation(DeleteRolesDocument);

const importConstraint = RoleConstraint.RoleUidTypeKey;
const importUpdateColumns = [
  RoleUpdateColumn.Uid,
  RoleUpdateColumn.Type,
  RoleUpdateColumn.Comment,
];

const formatRow = (row: Row) => `${roleTypeLabel(t, row.type)} — ${row.uid}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.uid !== undefined) {
    object.uid = flatRow.uid;
  }

  if (flatRow.type !== undefined) {
    if (!isRole(flatRow.type)) {
      throw new Error(t("admin.general.roles.form.error.invalidRole"));
    }
    object.type = flatRow.type;
  }

  if (flatRow.comment !== undefined) {
    object.comment = flatRow.comment;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed(() => ({
  uid: teachers.value.map((t) => ({ value: t.uid, label: t.displayname })),
  type: Object.values(RoleTypeEnum).map((type) => roleTypeLabel(t, type)),
}));

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="general"
    name="roles"
    :id-key
    :row-descriptor
    :rows="roles"
    :format-row
    :validate-flat-row
    :form-options
    :insert-data="insertServices"
    :upsert-data="upsertServices"
    :update-data="updateServices"
    :delete-data="deleteServices"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
