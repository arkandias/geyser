<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";

import AdminCoordinations from "@/components/admin/AdminCoordinations.vue";
import AdminCourses from "@/components/admin/AdminCourses.vue";
import AdminGeneral from "@/components/admin/AdminGeneral.vue";
import AdminRequests from "@/components/admin/AdminRequests.vue";
import AdminServices from "@/components/admin/AdminServices.vue";
import AdminTeachers from "@/components/admin/AdminTeachers.vue";

const { section = "general" } = defineProps<{
  section?: string;
}>();

const { t } = useTypedI18n();

const routeTabs = computed(() => [
  {
    name: "general",
    label: t("admin.general.title"),
    to: "/admin/general",
  },
  {
    name: "teachers",
    label: t("admin.teachers.title"),
    to: "/admin/teachers",
  },
  {
    name: "services",
    label: t("admin.services.title"),
    to: "/admin/services",
  },
  {
    name: "courses",
    label: t("admin.courses.title"),
    to: "/admin/courses",
  },
  {
    name: "requests",
    label: t("admin.requests.title"),
    to: "/admin/requests",
  },
  {
    name: "coordinations",
    label: t("admin.coordinations.title"),
    to: "/admin/coordinations",
  },
]);
</script>

<template>
  <QPage class="q-pa-md">
    <QTabs align="justify" class="text-grey" dense>
      <QRouteTab
        v-for="tab in routeTabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.label"
        :to="tab.to"
        exact
      />
    </QTabs>

    <QTabPanels :model-value="section" keep-alive animated>
      <QTabPanel name="general">
        <AdminGeneral />
      </QTabPanel>

      <QTabPanel name="teachers">
        <AdminTeachers />
      </QTabPanel>

      <QTabPanel name="services">
        <AdminServices />
      </QTabPanel>

      <QTabPanel name="courses">
        <AdminCourses />
      </QTabPanel>

      <QTabPanel name="requests">
        <AdminRequests />
      </QTabPanel>

      <QTabPanel name="coordinations">
        <AdminCoordinations />
      </QTabPanel>
    </QTabPanels>
  </QPage>
</template>

<style scoped lang="scss"></style>
