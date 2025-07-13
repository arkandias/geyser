<script setup lang="ts">
import { useRouter } from "vue-router";

import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";

import BtnNav from "@/components/header/BtnNav.vue";
import ToolbarCourses from "@/components/header/ToolbarCourses.vue";

defineProps<{ disable?: boolean }>();

const router = useRouter();
const { t } = useTypedI18n();
const { hasService } = useProfileStore();
const perm = usePermissions();
</script>

<template>
  <BtnNav
    id="home-page-button"
    name="home"
    icon="sym_s_home"
    :disable
    :tooltip="t('header.home.label')"
  />

  <QSeparator vertical inset />

  <BtnNav
    id="service-page-button"
    name="service"
    icon="sym_s_id_card"
    :disable="disable || !hasService"
    :tooltip="t('header.service.label')"
  />

  <QSeparator vertical inset />

  <BtnNav
    id="courses-page-button"
    name="courses"
    icon="sym_s_menu_book"
    :disable
    :tooltip="t('header.courses.label')"
  />

  <ToolbarCourses
    v-if="!disable && router.currentRoute.value.name === 'courses'"
    id="toolbar-courses"
  />

  <template v-if="perm.toAdmin">
    <QSeparator vertical inset />
    <BtnNav
      name="admin"
      icon="sym_s_settings"
      :disable
      :tooltip="t('header.admin.label')"
    />
  </template>
</template>

<style scoped lang="scss"></style>
