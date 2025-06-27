<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminRolesDocument } from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import AdminGeneralCustomTexts from "@/components/admin/AdminGeneralCustomTexts.vue";
import AdminGeneralPhase from "@/components/admin/AdminGeneralPhase.vue";
import AdminGeneralRoles from "@/components/admin/AdminGeneralRoles.vue";
import AdminGeneralYears from "@/components/admin/AdminGeneralYears.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

graphql(`
  query GetAdminRoles($oid: Int!) {
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
    teachers: teacher(
      where: { oid: { _eq: $oid } }
      orderBy: [{ lastname: ASC }, { firstname: ASC }]
    ) {
      ...AdminRolesTeacher
    }
  }
`);

const { data, fetching } = useQuery({
  query: GetAdminRolesDocument,
  variables: { oid: organization.id },
  context: {
    additionalTypenames: ["All", "Roles", "Teacher"],
  },
});
const roles = computed(() => data.value?.teacherRoles ?? []);
const teachers = computed(() => data.value?.teachers ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection icon="sym_s_schedule" :label="t('admin.general.phase.label')">
      <AdminGeneralPhase />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_calendar_month"
      :label="t('admin.general.years.label')"
    >
      <AdminGeneralYears />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_shield_person"
      :label="t('admin.general.roles.label')"
    >
      <AdminGeneralRoles
        :fetching
        :role-fragments="roles"
        :teacher-fragments="teachers"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_edit_note"
      :label="t('admin.general.customTexts.label')"
    >
      <AdminGeneralCustomTexts />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
