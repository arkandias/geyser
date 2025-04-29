<script setup lang="ts">
import { useRouter } from "vue-router";

import { useDarkMode } from "@/composables/useDarkMode.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useRefreshData } from "@/composables/useRefreshData.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { version } from "@/config/env.ts";

import MenuInfo from "@/components/header/MenuInfo.vue";
import MenuLang from "@/components/header/MenuLang.vue";
import MenuUser from "@/components/header/MenuUser.vue";
import NavBtn from "@/components/header/NavBtn.vue";
import ToolbarCourses from "@/components/header/ToolbarCourses.vue";

defineProps<{ disable: boolean }>();

const { t } = useTypedI18n();
const router = useRouter();
const perm = usePermissions();
const { isRefreshing, refreshData } = useRefreshData();
const { isDarkModeActive, toggleDarkMode } = useDarkMode();
</script>

<template>
  <QHeader id="header">
    <QToolbar>
      <QToolbarTitle shrink>
        <QAvatar icon="sym_s_spa" square size="xl" />
        Geyser
        <QBadge v-if="version" outline align="middle">
          {{ version }}
        </QBadge>
      </QToolbarTitle>
      <QSpace />
      <NavBtn
        name="home"
        icon="sym_s_home"
        :disable
        :tooltip="t('header.home.label')"
      />
      <QSeparator vertical inset color="white" />
      <NavBtn
        name="service"
        icon="sym_s_id_card"
        :disable
        :tooltip="t('header.service.label')"
      />
      <QSeparator vertical inset color="white" />
      <NavBtn
        name="courses"
        icon="sym_s_menu_book"
        :disable
        :tooltip="t('header.courses.label')"
      />
      <Transition>
        <div
          v-if="!disable && router.currentRoute.value.name === 'courses'"
          id="toolbar-wrapper"
        >
          <ToolbarCourses />
        </div>
      </Transition>
      <QSeparator vertical inset color="white" />
      <NavBtn
        v-if="perm.toAdmin"
        name="admin"
        icon="sym_s_settings"
        :disable
        :tooltip="t('header.admin.label')"
      />
      <QSeparator v-if="perm.toAdmin" vertical inset color="white" />
      <QBtn
        icon="sym_s_refresh"
        :disable
        :loading="isRefreshing"
        flat
        square
        @click="refreshData()"
      >
        <QTooltip>
          {{ t("header.refreshData.label") }}
        </QTooltip>
      </QBtn>
      <QBtn
        :icon="isDarkModeActive ? 'sym_s_dark_mode' : 'sym_s_light_mode'"
        flat
        square
        @click="toggleDarkMode()"
      >
        <QTooltip>
          {{ t("header.darkMode.label") }}
        </QTooltip>
      </QBtn>
      <MenuLang />
      <MenuInfo />
      <MenuUser />
    </QToolbar>
  </QHeader>
</template>

<style scoped lang="scss">
#header {
  height: $header-height;
  background-color: $primary;
}
.dev #header {
  background-color: $secondary;
}
#toolbar-wrapper {
  display: flex;
  align-items: center;
  overflow: hidden;
}
#toolbar-wrapper * {
  white-space: nowrap;
}
.v-enter-active,
.v-leave-active {
  transition: width 1s ease;
}
.v-enter-to,
.v-leave-from {
  width: 182px;
}
.v-enter-from,
.v-leave-to {
  width: 0;
}
</style>
