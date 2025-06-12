<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, inject, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminRoleFragment,
  AdminRoleFragmentDoc,
  AdminRolesTeacherFragmentDoc,
  DeleteRolesDocument,
  InsertRolesDocument,
  RoleEnum,
  TeacherRoleConstraint,
  type TeacherRoleInsertInput,
  TeacherRoleUpdateColumn,
  UpdateRolesDocument,
  UpsertRolesDocument,
} from "@/gql/graphql.ts";
import type { AuthManager } from "@/services/auth.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";
import { toLowerCase } from "@/utils";

import type { AdminGeneralRolesColName } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminRoleFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = TeacherRoleInsertInput;

const { roleFragments, teacherFragments } = defineProps<{
  roleFragments: FragmentType<typeof AdminRoleFragmentDoc>[];
  teacherFragments: FragmentType<typeof AdminRolesTeacherFragmentDoc>[];
}>();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const authManager = inject<AuthManager>("authManager")!;
const { t } = useTypedI18n();

const rowDescriptor = {
  teacherEmail: {
    type: "string",
    field: (row) => row.teacher.email,
    format: (val: string) =>
      teachers.value.find((t) => t.email === val)?.displayname,
    formComponent: "select",
  },
  type: {
    type: "string",
    format: (val: RoleEnum) => t(`role.${toLowerCase(val)}`),
    formComponent: "select",
  },
  comment: {
    type: "string",
    nullable: true,
    formComponent: "input",
  },
} as const satisfies RowDescriptorExtra<AdminGeneralRolesColName, Row>;

graphql(`
  fragment AdminRole on TeacherRole {
    id
    teacher {
      email
    }
    role
    comment
  }

  fragment AdminRolesTeacher on Teacher {
    id
    email
    displayname
  }

  mutation InsertRoles($objects: [TeacherRoleInsertInput!]!) {
    insertData: insertTeacherRole(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertRoles(
    $objects: [TeacherRoleInsertInput!]!
    $onConflict: TeacherRoleOnConflict
  ) {
    upsertData: insertTeacherRole(objects: $objects, onConflict: $onConflict) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateRoles($ids: [Int!]!, $changes: TeacherRoleSetInput!) {
    updateData: updateTeacherRole(
      where: { id: { _in: $ids } }
      _set: $changes
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteRoles($ids: [Int!]!) {
    deleteData: deleteTeacherRole(where: { id: { _in: $ids } }) {
      returning {
        oid
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

const importConstraint = TeacherRoleConstraint.TeacherRoleOidTeacherIdRoleKey;
const importUpdateColumns = [
  TeacherRoleUpdateColumn.Oid,
  TeacherRoleUpdateColumn.TeacherId,
  TeacherRoleUpdateColumn.Role,
  TeacherRoleUpdateColumn.Comment,
];

const formatRow = (row: Row) =>
  `${t(`role.${toLowerCase(row.role)}`)} — ${row.teacher.email}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: authManager.orgId,
  };
  // teacherId
  if (flatRow.teacherEmail !== undefined) {
    const teacher = teachers.value.find(
      (t) => t.email === flatRow.teacherEmail,
    );
    if (teacher === undefined) {
      throw new Error(
        t("admin.general.roles.form.error.teacherNotFound", {
          email: flatRow.teacherEmail,
        }),
      );
    }
    object.teacherId = teacher.id;
  }

  if (flatRow.type !== undefined) {
    if (
      flatRow.type !== RoleEnum.Admin &&
      flatRow.type !== RoleEnum.Commissioner
    ) {
      throw new Error(t("admin.general.roles.form.error.invalidRole"));
    }
    object.role = flatRow.type;
  }

  if (flatRow.comment !== undefined) {
    object.comment = flatRow.comment;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed(() => ({
  teacherEmail: teachers.value.map((t) => ({
    value: t.email,
    label: t.displayname,
  })),
  type: Object.values(RoleEnum).map((type) => ({
    value: type,
    label: t(`role.${toLowerCase(type)}`),
  })),
}));

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="general"
    name="roles"
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
