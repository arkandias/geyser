<script setup lang="ts">
import { computed, inject } from "vue";

import { useRefreshData } from "@/composables/useRefreshData.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import type { RoleTypeEnum } from "@/gql/graphql.ts";
import { roleTypeLabel } from "@/locales/helpers.ts";
import type { AuthManager } from "@/services/auth.ts";

import MenuBase from "@/components/header/MenuBase.vue";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const authManager = inject<AuthManager>("authManager")!;
const { t } = useTypedI18n();
const { refreshData } = useRefreshData();

const roleOptions = computed(() =>
  authManager.allowedRoles.map((role) => ({
    value: role,
    label: roleTypeLabel(t, role),
  })),
);

const updateRole = async (value: RoleTypeEnum) => {
  authManager.setActiveRole(value);
  await refreshData();
};
</script>

<template>
  <MenuBase :label="t('header.user.label')" icon="sym_s_account_circle">
    <QList>
      <template v-if="authManager.isAuthenticated">
        <QItem class="flex-center text-no-wrap">
          <QItemLabel header>
            {{ authManager.displayname }}
          </QItemLabel>
        </QItem>
        <QSeparator />
        <QItem class="q-pl-sm">
          <QOptionGroup
            :model-value="authManager.activeRole"
            :options="roleOptions"
            type="radio"
            @update:model-value="updateRole"
          />
        </QItem>
        <QSeparator />
        <QItem v-close-popup clickable @click="authManager.logout()">
          <QItemSection side>
            <QIcon name="sym_s_logout" color="primary" />
          </QItemSection>
          <QItemSection>
            {{ t("header.user.logout") }}
          </QItemSection>
        </QItem>
      </template>
      <template v-else>
        <QItem v-close-popup clickable @click="authManager.login()">
          <QItemSection side>
            <QIcon name="sym_s_login" color="primary" />
          </QItemSection>
          <QItemSection>
            {{ t("header.user.login") }}
          </QItemSection>
        </QItem>
      </template>
    </QList>
  </MenuBase>
</template>

<style scoped lang="scss"></style>
