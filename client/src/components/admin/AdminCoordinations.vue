<script setup lang="ts">
import { useTypedI18n } from "@/composables/useTypedI18n.ts";

import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
</script>

<template>
  <QList bordered>
    <AdminSection
      icon="sym_s_account_tree"
      :label="t('admin.coordinations.programs.label')"
    >
    </AdminSection>

    <QSeparator />
    <AdminSection
      icon="sym_s_alt_route"
      :label="t('admin.coordinations.tracks.label')"
    >
    </AdminSection>

    <QSeparator />
    <AdminSection
      icon="sym_s_menu_book"
      :label="t('admin.coordinations.courses.label')"
    >
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
