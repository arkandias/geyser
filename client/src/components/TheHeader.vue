<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useDarkMode } from "@/composables/useDarkMode.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useRefreshData } from "@/composables/useRefreshData.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { version } from "@/config/environment.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

import MenuInfo from "@/components/header/MenuInfo.vue";
import MenuLang from "@/components/header/MenuLang.vue";
import MenuUser from "@/components/header/MenuUser.vue";
import MenuYear from "@/components/header/MenuYear.vue";
import NavBtn from "@/components/header/NavBtn.vue";
import ToolbarCourses from "@/components/header/ToolbarCourses.vue";

defineProps<{ disable: boolean }>();

const { t } = useTypedI18n();
const router = useRouter();
const perm = usePermissions();
const { isRefreshing, refreshData } = useRefreshData();
const { isDarkModeActive, toggleDarkMode } = useDarkMode();
const { organization } = useOrganizationStore();
const { hasService } = useProfileStore();
const { activeYear, isCurrentYearActive } = useYearsStore();

const warningMessage = computed(() =>
  activeYear.value === null
    ? t("courses.warning.noActiveYear")
    : !isCurrentYearActive.value
      ? t("courses.warning.archive", { year: activeYear.value })
      : "",
);
</script>

<template>
  <QHeader>
    <QToolbar id="main-toolbar">
      <QToolbarTitle shrink class="title">
        <QAvatar icon="sym_s_spa" square size="xl" />
        Geyser
        <QBadge v-if="version" outline align="middle">
          {{ version }}
        </QBadge>
      </QToolbarTitle>
      <div class="organization-info">
        <QSeparator vertical />
        <div class="organization-text">
          <div class="label">
            {{ organization.label }}
          </div>
          <div v-if="organization.sublabel" class="sublabel">
            {{ organization.sublabel }}
          </div>
        </div>
      </div>
      <QSpace />
      <NavBtn
        name="home"
        icon="sym_s_home"
        :disable
        :tooltip="t('header.home.label')"
      />
      <QSeparator vertical inset />
      <NavBtn
        name="service"
        icon="sym_s_id_card"
        :disable="disable || !hasService"
        :tooltip="t('header.service.label')"
      />
      <QSeparator vertical inset />
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
      <QSeparator vertical inset />
      <NavBtn
        v-if="perm.toAdmin"
        name="admin"
        icon="sym_s_settings"
        :disable
        :tooltip="t('header.admin.label')"
      />
      <QSeparator v-if="perm.toAdmin" vertical inset />
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
      <MenuYear />
      <MenuLang />
      <MenuInfo />
      <MenuUser />
    </QToolbar>

    <QToolbar v-if="warningMessage" id="warning-toolbar">
      <QSpace />
      <QToolbarTitle shrink class="text-center text-body1">
        {{ warningMessage }}
      </QToolbarTitle>
      <QSpace />
    </QToolbar>
  </QHeader>
</template>

<style scoped lang="scss">
#main-toolbar {
  min-height: $main-toolbar-height;
  height: $main-toolbar-height;
  background-color: $primary;
}
.dev #main-toolbar {
  background-color: $secondary;
}

#warning-toolbar {
  min-height: $warning-toolbar-height;
  height: $warning-toolbar-height;
  background-color: $warning;
  color: black;
}

.title {
  flex-shrink: 0;
}

.organization-info {
  display: flex;
  align-items: center;
  margin: 0 12px;

  .q-separator {
    margin: 0;
  }

  .organization-text {
    margin-left: 12px;
    line-height: 1.2;
    white-space: nowrap;

    .label {
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
    }

    .sublabel {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 1px;
    }
  }
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
  width: 126px;
}
.v-enter-from,
.v-leave-to {
  width: 0;
}
</style>
