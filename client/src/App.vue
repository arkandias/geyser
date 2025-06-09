<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed, inject, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import {
  GetAppDataDocument,
  PhaseTypeEnum,
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
  query GetAppData($orgId: Int!, $userId: Int!) {
    organization: organizationByPk(id: $orgId) {
      currentPhase: phase {
        value
      }
      years(orderBy: { value: DESC }) {
        id
        value
        current
        visible
      }
      customTexts: appSettings(orderBy: [{ key: ASC }]) {
        id
        key
        value
      }
    }
    profile: teacherByPk(id: $userId) {
      id
      displayname
      services {
        id
        year
      }
    }
  }
`);

const { t } = useTypedI18n();
const { notify } = useNotify();
const { currentPhase, setCurrentPhase } = useCurrentPhaseStore();
const { setYears } = useYearsStore();
const { setCustomTexts } = useCustomTextsStore();
const { isLoaded, setProfile } = useProfileStore();

const authManager = inject<AuthManager>("authManager");
if (!authManager) {
  throw new Error("Authentication manager is not provided to the app");
}
if (authManager.authError) {
  notify(NotifyType.Error, {
    message: t("app.auth.error"),
    caption: authManager.authError,
  });
}

// Fetch app data
const getAppData = useQuery({
  query: GetAppDataDocument,
  variables: { userId: authManager.userId },
  pause: () => !authManager.hasAccess,
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
    if (data?.organization) {
      setCurrentPhase(data.organization.currentPhase?.value);
      setYears(data.organization.years);
      setCustomTexts(data.organization.customTexts);
    }
    if (data?.profile) {
      setProfile(data.profile);
    }
  },
  { immediate: true },
);

watch(
  currentPhase,
  (phase) => {
    if (!authManager.hasAccess) {
      return;
    }
    if (authManager.allowedRoles.includes(RoleTypeEnum.Admin)) {
      authManager.setActiveRole(RoleTypeEnum.Admin);
    } else if (
      authManager.allowedRoles.includes(RoleTypeEnum.Commissioner) &&
      phase === PhaseTypeEnum.Assignments
    ) {
      authManager.setActiveRole(RoleTypeEnum.Commissioner);
    }
  },
  { immediate: true },
);

// Access check and information message
const accessDeniedMessage = computed(() => {
  if (authManager.isLoggedOut) {
    return t("home.alert.loggedOut");
  }
  if (!authManager.hasAccess) {
    return t("home.alert.noAccess");
  }
  if (
    currentPhase.value === PhaseTypeEnum.Shutdown &&
    authManager.activeRole.value !== RoleTypeEnum.Admin
  ) {
    return t("home.alert.shutdown");
  }
  // TODO: commissioner not during assignments phase
  if (getAppData.fetching.value) {
    return t("home.alert.loadingAppData");
  }
  // TODO: error loading data & isLoading...
  if (!isLoaded.value) {
    return t("home.alert.profileNotLoaded");
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
