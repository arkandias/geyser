<script setup lang="ts">
import { useTypedI18n } from "@/composables/useTypedI18n.ts";

import AdminGeneralCurrentPhase from "@/components/admin/AdminGeneralCurrentPhase.vue";
import AdminGeneralCustomTexts from "@/components/admin/AdminGeneralCustomTexts.vue";
import AdminGeneralOrganization from "@/components/admin/AdminGeneralOrganization.vue";
import AdminGeneralYears from "@/components/admin/AdminGeneralYears.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
</script>

<template>
  <QList bordered>
    <AdminSection
      icon="sym_s_domain"
      :label="t('admin.general.organization.label')"
    >
      <AdminGeneralOrganization />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_calendar_month"
      :label="t('admin.general.years.label')"
    >
      <AdminGeneralYears />
    </AdminSection>

    <QSeparator />

    <AdminSection icon="sym_s_schedule" :label="t('admin.general.phase.label')">
      <AdminGeneralCurrentPhase />
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
