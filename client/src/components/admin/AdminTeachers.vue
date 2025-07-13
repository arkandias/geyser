<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminTeachersDocument } from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import AdminTeachersPositions from "@/components/admin/AdminTeachersPositions.vue";
import AdminTeachersRoles from "@/components/admin/AdminTeachersRoles.vue";
import AdminTeachersTeachers from "@/components/admin/AdminTeachersTeachers.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

graphql(`
  query GetAdminTeachers($oid: Int!) {
    teachers: teacher(
      where: { oid: { _eq: $oid } }
      orderBy: [{ lastname: ASC }, { firstname: ASC }]
    ) {
      ...AdminTeacher
      ...AdminRolesTeacher
    }
    positions: position(
      where: { oid: { _eq: $oid } }
      orderBy: [{ label: ASC }]
    ) {
      ...AdminPosition
      ...AdminTeachersPosition
    }
    teacherRoles: teacherRole(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { role: ASC }
        { teacher: { lastname: ASC } }
        { teacher: { firstname: ASC } }
      ]
    ) {
      ...AdminRole
    }
  }
`);

const { data, fetching } = useQuery({
  query: GetAdminTeachersDocument,
  variables: { oid: organization.id },
  context: {
    additionalTypenames: ["All", "Position", "Teacher", "TeacherRole"],
  },
});
const teachers = computed(() => data.value?.teachers ?? []);
const positions = computed(() => data.value?.positions ?? []);
const roles = computed(() => data.value?.teacherRoles ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection
      icon="sym_s_groups"
      :label="t('admin.teachers.teachers.label')"
    >
      <AdminTeachersTeachers
        :fetching
        :teacher-fragments="teachers"
        :position-fragments="positions"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_work"
      :label="t('admin.teachers.positions.label')"
    >
      <AdminTeachersPositions :fetching :position-fragments="positions" />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_local_police"
      :label="t('admin.teachers.roles.label')"
    >
      <AdminTeachersRoles
        :fetching
        :role-fragments="roles"
        :teacher-fragments="teachers"
      />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
