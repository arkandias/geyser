<script setup lang="ts">
import { computed } from "vue";

import { useRefreshData } from "@/composables/useRefreshData.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import type { RoleEnum } from "@/gql/graphql.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";
import { toLowerCase } from "@/utils";

import MenuBase from "@/components/header/MenuBase.vue";

const { t } = useTypedI18n();
const { refreshData } = useRefreshData();
const { profile, setActiveRole } = useProfileStore();

const roleOptions = computed(() =>
  profile.roles.toSorted().map((role) => ({
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
  <MenuBase :label="t('header.user.label')" icon="sym_s_account_circle">
    <QList>
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
    </QList>
  </MenuBase>
</template>

<style scoped lang="scss"></style>
