<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed, inject, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAppDataDocument, PhaseEnum, RoleEnum } from "@/gql/graphql.ts";
import type { AuthManager } from "@/services/auth.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useCustomTextsStore } from "@/stores/useCustomTextsStore.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

import TheHeader from "@/components/TheHeader.vue";
import PageHome from "@/pages/PageHome.vue";

const { t } = useTypedI18n();
const { notify } = useNotify();
const { currentPhase, setCurrentPhase } = useCurrentPhaseStore();
const { setYears } = useYearsStore();
const { setCustomTexts } = useCustomTextsStore();
const { profile, setProfile } = useProfileStore();
const { setOrganization } = useOrganizationStore();

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

// Sync profile's activeRole with authManager role
watch(
  () => profile.activeRole,
  (role) => {
    authManager.setRole(role);
  },
);

graphql(`
  query GetAppData($orgId: Int!, $userId: Int!) {
    organization: organizationByPk(id: $orgId) {
      label
      sublabel
      email
      currentPhases {
        value
      }
      years(orderBy: { value: DESC }) {
        value
        current
        visible
      }
      customTexts: appSettings(orderBy: [{ key: ASC }]) {
        key
        value
      }
    }
    profile: teacherByPk(oid: $orgId, id: $userId) {
      displayname
      services {
        id
        year
      }
    }
  }
`);

// Fetch app data
const getAppData = useQuery({
  query: GetAppDataDocument,
  variables: {
    orgId: authManager.orgId,
    userId: authManager.userId,
  },
  pause: () => !authManager.hasAccess,
  context: {
    additionalTypenames: [
      "All",
      "AppSetting",
      "CurrentPhase",
      "Service",
      "Year",
    ],
  },
});

// Sync the stores on data update
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
      setOrganization({
        oid: authManager.orgId,
        label: data.organization.label,
        sublabel: data.organization.sublabel ?? null,
        email: data.organization.email,
      });
      setCurrentPhase(
        data.organization.currentPhases[0]?.value ?? PhaseEnum.Shutdown,
      );
      setYears(data.organization.years);
      setCustomTexts(data.organization.customTexts);
    }

    setProfile({
      oid: authManager.orgId,
      id: authManager.userId,
      roles: authManager.allowedRoles,
      activeRole: authManager.role,
      displayname: (profile.displayname || data?.profile?.displayname) ?? "",
      services: data?.profile?.services ?? [],
    });
  },
  { immediate: true },
);

// Access check and information message
const accessDeniedMessage = computed(() => {
  if (!authManager.organizationKey) {
    return t("home.alert.organizationNotFound");
  }
  if (!authManager.hasAccess) {
    return t("home.alert.noAccess");
  }
  if (getAppData.fetching.value) {
    return t("home.alert.appDataFetching");
  }
  if (getAppData.error.value) {
    return t("home.alert.appDataError");
  }
  if (!getAppData.data.value?.organization) {
    return t("home.alert.organizationNotLoaded");
  }
  if (
    currentPhase.value === PhaseEnum.Shutdown &&
    profile.activeRole !== RoleEnum.Admin
  ) {
    return t("home.alert.shutdown");
  }
  if (
    profile.activeRole === RoleEnum.Commissioner &&
    currentPhase.value !== PhaseEnum.Assignments
  ) {
    return t("home.alert.commissioner");
  }
  if (!getAppData.data.value.profile) {
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
    <TheHeader
      :disable="!accessGranted"
      :organization="getAppData.data.value?.organization"
    />
    <QPageContainer>
      <RouterView v-if="accessGranted" />
      <PageHome v-else :alert="accessDeniedMessage" />
    </QPageContainer>
  </QLayout>
</template>

<style scoped lang="scss"></style>
