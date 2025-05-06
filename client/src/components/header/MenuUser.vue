<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";

import { useRefreshData } from "@/composables/useRefreshData.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import type { RoleTypeEnum } from "@/gql/graphql.ts";
import { roleTypeLabel } from "@/locales/helpers.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";

import MenuBase from "@/components/header/MenuBase.vue";

const authManager = inject<AuthManager>("authManager");

const { t } = useTypedI18n();
const { displayname, roles, activeRole, setActiveRole } = useProfileStore();
const { refreshData } = useRefreshData();

const selectedRole = ref<RoleTypeEnum | null>(null);
watch(
  activeRole,
  (value) => {
    selectedRole.value = value;
  },
  { immediate: true },
);

const roleOptions = computed(() =>
  roles.value.map((role) => ({
    value: role,
    label: roleTypeLabel(t, role),
  })),
);

const update = async (value: RoleTypeEnum) => {
  setActiveRole(value);
  await refreshData();
};
</script>

<template>
  <MenuBase :label="t('header.user.label')" icon="sym_s_account_circle">
    <QList>
      <QItem class="flex-center text-no-wrap">
        <QItemLabel header>
          {{ displayname }}
        </QItemLabel>
      </QItem>
      <QSeparator />
      <QItem class="q-pl-sm">
        <QOptionGroup
          v-model="selectedRole"
          :options="roleOptions"
          type="radio"
          @update:model-value="update"
        />
      </QItem>
      <QSeparator />
      <QItem v-close-popup clickable @click="authManager?.logout()">
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
