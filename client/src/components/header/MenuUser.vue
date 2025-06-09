<script setup lang="ts">
import { computed, inject } from "vue";

import { useRefreshData } from "@/composables/useRefreshData.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { RoleEnum } from "@/gql/graphql.ts";
import { roleTypeLabel } from "@/locales/helpers.ts";
import type { AuthManager } from "@/services/auth.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";

import MenuBase from "@/components/header/MenuBase.vue";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const authManager = inject<AuthManager>("authManager")!;
const { t } = useTypedI18n();
const { refreshData } = useRefreshData();
const { profile } = useProfileStore();

const roleOptions = computed(() =>
  [RoleEnum.Admin, RoleEnum.Commissioner, RoleEnum.Teacher]
    .filter((role) => authManager.allowedRoles.includes(role))
    .map((role) => ({
      value: role,
      label: roleTypeLabel(t, role),
    })),
);

const updateRole = async (value: RoleEnum) => {
  authManager.setActiveRole(value);
  await refreshData();
};
</script>

<template>
  <MenuBase :label="t('header.user.label')" icon="sym_s_account_circle">
    <QList>
      <template v-if="authManager.hasAccess && profile.isLoaded">
        <QItem class="flex-center text-no-wrap">
          <QItemLabel header>
            {{ profile.displayname }}
          </QItemLabel>
        </QItem>
        <QSeparator />
        <QItem class="q-pl-sm">
          <QOptionGroup
            :model-value="authManager.activeRole.value"
            :options="roleOptions"
            type="radio"
            @update:model-value="updateRole"
          />
        </QItem>
        <QSeparator />
      </template>
      <template v-if="authManager.isLoggedOut">
        <QItem v-close-popup clickable @click="authManager.login()">
          <QItemSection side>
            <QIcon name="sym_s_login" color="primary" />
          </QItemSection>
          <QItemSection>
            {{ t("header.user.login") }}
          </QItemSection>
        </QItem>
      </template>
      <template v-else>
        <QItem v-close-popup clickable @click="authManager.logout()">
          <QItemSection side>
            <QIcon name="sym_s_logout" color="primary" />
          </QItemSection>
          <QItemSection>
            {{ t("header.user.logout") }}
          </QItemSection>
        </QItem>
      </template>
    </QList>
  </MenuBase>
</template>

<style scoped lang="scss"></style>
