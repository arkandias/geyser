<script setup lang="ts">
import { bgColor } from "@/utils";

import BadgeOrganization from "@/components/header/BadgeOrganization.vue";
import BtnDarkMode from "@/components/header/BtnDarkMode.vue";
import BtnRefreshData from "@/components/header/BtnRefreshData.vue";
import BtnTutorial from "@/components/header/BtnTutorial.vue";
import MenuInfo from "@/components/header/MenuInfo.vue";
import MenuUser from "@/components/header/MenuUser.vue";
import ToolbarNav from "@/components/header/ToolbarNav.vue";
import ToolbarTitle from "@/components/header/ToolbarTitle.vue";

defineProps<{ disable?: boolean; warning?: string }>();
</script>

<template>
  <QHeader>
    <QToolbar id="main-toolbar" :class="bgColor">
      <ToolbarTitle />
      <BadgeOrganization />
      <QSpace />
      <ToolbarNav :disable />
      <QSeparator vertical inset />
      <BtnRefreshData />
      <BtnDarkMode />
      <BtnTutorial />
      <MenuInfo />
      <MenuUser />
    </QToolbar>

    <QToolbar v-if="warning" id="warning-toolbar">
      <QSpace />
      <QToolbarTitle shrink class="text-body1">
        {{ warning }}
      </QToolbarTitle>
      <QSpace />
    </QToolbar>
  </QHeader>
</template>

<style scoped lang="scss">
#main-toolbar {
  min-height: $main-toolbar-height;
  height: $main-toolbar-height;
  overflow-x: auto;
}

#warning-toolbar {
  min-height: $warning-toolbar-height;
  height: $warning-toolbar-height;
  background-color: $warning;
  color: black;
}
</style>
