<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed, inject, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import {
  GetAppDataDocument,
  GetUserProfileDocument,
  PhaseEnum,
  RoleTypeEnum,
} from "@/gql/graphql.ts";
import type { AuthManager } from "@/services/auth.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useCustomTextsStore } from "@/stores/useCustomTextsStore.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

import TheHeader from "@/components/TheHeader.vue";
import PageHome from "@/pages/PageHome.vue";

graphql(`
  query GetUserProfile($uid: String!) {
    profile: teacherByPk(uid: $uid) {
      displayname
      active
      roles {
        id
        type
      }
      services {
        id
        year
      }
    }
  }

  query GetAppData {
    phase: currentPhase(
      limit: 1 # unique
    ) {
      value
    }
    years: year(orderBy: { value: DESC }) {
      value
      current
      visible
    }
    customTexts: appSetting(orderBy: [{ key: ASC }]) {
      key
      value
    }
  }
`);

const { t } = useTypedI18n();
const { notify } = useNotify();
const { active, activeRole, loaded, setProfile } = useProfileStore();
const { currentPhase, setCurrentPhase } = useCurrentPhaseStore();
const { setYears } = useYearsStore();
const { setCustomTexts } = useCustomTextsStore();

const authManager = inject<AuthManager>("authManager");
if (!authManager) {
  throw new Error("Authentication manager is not provided to the app");
}
const uid = authManager.getUserId() ?? "";

// Fetch user profile
const getUserProfile = useQuery({
  query: GetUserProfileDocument,
  variables: { uid },
  pause: !uid,
  context: { additionalTypenames: ["All", "Role", "Service"] },
});
watch(
  [getUserProfile.data, getUserProfile.error],
  ([data, error]) => {
    if (error) {
      notify(NotifyType.Error, {
        message: t("app.userProfile.error"),
        caption: error.message,
      });
    }

    if (data?.profile) {
      setProfile({
        uid,
        displayname: data.profile.displayname ?? "",
        active: data.profile.active,
        roles: data.profile.roles.map((role) => role.type),
        services: data.profile.services,
      });
    }
  },
  { immediate: true },
);
watch(
  activeRole,
  (role) => {
    authManager.setActiveRole(role);
  },
  { immediate: true },
);

// Fetch app data
const getAppData = useQuery({
  query: GetAppDataDocument,
  variables: {},
  pause: () => !loaded.value || !active.value,
  context: { additionalTypenames: ["All", "AppSetting", "Phase", "Year"] },
});
watch(
  [getAppData.data, getAppData.error],
  ([data, error]) => {
    if (error) {
      notify(NotifyType.Error, {
        message: t("app.data.error"),
        caption: error.message,
      });
      return;
    }
    if (data?.phase[0]?.value) {
      setCurrentPhase(data.phase[0].value);
    }
    if (data?.years) {
      setYears(
        data.years.map((year) => ({
          value: year.value,
          current: year.current,
          visible: year.visible,
        })),
      );
    }
    if (data?.customTexts) {
      setCustomTexts(data.customTexts);
    }
  },
  { immediate: true },
);

// Access check and information messages
const accessDeniedMessage = computed(() => {
  if (!uid) {
    return t("home.alert.noAuth");
  }
  if (getUserProfile.fetching.value) {
    return t("home.alert.loadingProfile");
  }
  if (!loaded.value) {
    return t("home.alert.profileNotLoaded");
  }
  if (!active.value) {
    return t("home.alert.profileNotActive");
  }
  if (getAppData.fetching.value) {
    return t("home.alert.loadingAppData");
  }
  if (
    currentPhase.value === PhaseEnum.Shutdown &&
    activeRole.value !== RoleTypeEnum.Admin
  ) {
    return t("home.alert.shutdown");
  }
  return "";
});
const accessGranted = computed(() => !accessDeniedMessage.value);

// Apply distinct styling in development vs production environments to provide
// visual feedback to developers about which environment they're using
const devClass = {
  dev: import.meta.env.DEV,
};
</script>

<template>
  <QLayout view="hHh lpR fFf" class="text-body-1" :class="devClass">
    <TheHeader :disable="!accessGranted" />
    <QPageContainer>
      <RouterView v-if="accessGranted" />
      <PageHome v-else :alert="accessDeniedMessage" />
    </QPageContainer>
  </QLayout>
</template>

<style scoped lang="scss"></style>
