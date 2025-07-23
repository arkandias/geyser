<script lang="ts">
export const adminTeachersRolesColNames = [
  "teacherEmail",
  "role",
  "comment",
] as const;

export type AdminTeachersRolesColName =
  (typeof adminTeachersRolesColNames)[number];
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
  RoleEnum,
  TeacherRoleConstraint,
  type TeacherRoleInsertInput,
  TeacherRoleUpdateColumn,
  UpdateRolesDocument,
  UpsertRolesDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type {
  AdminColumns,
  NullableParsedRow,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";
import { toLowerCase } from "@/utils";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminRoleFragment;
type FlatRow = NullableParsedRow<typeof adminColumns>;
type InsertInput = TeacherRoleInsertInput;

const { roleFragments, teacherFragments } = defineProps<{
  fetching: boolean;
  roleFragments: FragmentType<typeof AdminRoleFragmentDoc>[];
  teacherFragments: FragmentType<typeof AdminRolesTeacherFragmentDoc>[];
}>();

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

const adminColumns = {
  teacherEmail: {
    type: "string",
    field: (row) => row.teacher.email,
    format: (val: string) =>
      teachers.value.find((t) => t.email === val)?.displayname,
    formComponent: "select",
  },
  role: {
    type: "string",
    format: (val: RoleEnum) => t(`role.${toLowerCase(val)}`),
    formComponent: "select",
  },
  comment: {
    type: "string",
    nullable: true,
    formComponent: "input",
    inputType: "text",
  },
} as const satisfies AdminColumns<AdminTeachersRolesColName, Row>;

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
  TeacherRoleUpdateColumn.TeacherId,
  TeacherRoleUpdateColumn.Role,
  TeacherRoleUpdateColumn.Comment,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  // teacherId
  if (flatRow.teacherEmail !== undefined) {
    const teacher = teachers.value.find(
      (t) => t.email === flatRow.teacherEmail,
    );
    if (teacher === undefined) {
      throw new Error(
        t("admin.teachers.roles.form.error.teacherNotFound", flatRow),
      );
    }
    object.teacherId = teacher.id;
  }

  if (flatRow.role !== undefined) {
    if (
      flatRow.role !== RoleEnum.Organizer &&
      flatRow.role !== RoleEnum.Commissioner
    ) {
      throw new Error(t("admin.teachers.roles.form.error.invalidRole"));
    }
    object.role = flatRow.role;
  }

  if (flatRow.comment !== undefined) {
    object.comment = flatRow.comment;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    teacherEmail: teachers.value.map((t) => ({
      value: t.email,
      label: t.displayname ?? "",
    })),
    role: Object.values(RoleEnum)
      .filter((role) => role !== RoleEnum.Teacher)
      .map((role) => ({
        value: role,
        label: t(`role.${toLowerCase(role)}`),
      })),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="teachers"
    name="roles"
    :admin-columns
    :rows="roles"
    :fetching
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
