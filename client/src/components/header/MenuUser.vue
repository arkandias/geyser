<script setup lang="ts">
import { computed } from "vue";

import { useRefreshData } from "@/composables/useRefreshData.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { PhaseEnum, RoleEnum } from "@/gql/graphql.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";
import { toLowerCase } from "@/utils";

import MenuBase from "@/components/header/MenuBase.vue";

const { t } = useTypedI18n();
const { refreshData } = useRefreshData();
const { profile, setActiveRole } = useProfileStore();
const { currentPhase } = useCurrentPhaseStore();

const roleOptions = computed(() =>
  [RoleEnum.Organizer, RoleEnum.Commissioner, RoleEnum.Teacher]
    .filter((role) => profile.roles.includes(role))
    .filter(
      (role) =>
        role !== RoleEnum.Commissioner ||
        currentPhase.value === PhaseEnum.Assignments,
    )
    .map((role) => ({
      value: role,
      label: t(`role.${toLowerCase(role)}`),
    })),
);

const updateRole = async (value: RoleEnum) => {
  setActiveRole(value);
  await refreshData();
};
</script>

<template>
  <MenuBase
    id="user-button"
    :icon="profile.isAdmin ? 'sym_s_shield_person' : 'sym_s_account_circle'"
    :label="t('header.user.label')"
  >
    <QList id="user-menu">
      <template v-if="profile.isLogged">
        <template v-if="profile.displayname">
          <QItem class="flex-center text-no-wrap">
            <QItemLabel header>
              {{ profile.displayname }}
            </QItemLabel>
          </QItem>
          <QSeparator />
        </template>
        <template v-if="roleOptions.length">
          <QItem class="q-pl-sm">
            <QOptionGroup
              :model-value="profile.activeRole"
              :options="roleOptions"
              type="radio"
              @update:model-value="updateRole"
            />
          </QItem>
          <QSeparator />
        </template>
        <QItem v-close-popup clickable @click="profile.logout()">
          <QItemSection side>
            <QIcon name="sym_s_logout" color="primary" />
          </QItemSection>
          <QItemSection>
            {{ t("header.user.logout") }}
          </QItemSection>
        </QItem>
      </template>
      <template v-else>
        <QItem v-close-popup clickable @click="profile.login()">
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
