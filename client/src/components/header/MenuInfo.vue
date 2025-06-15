<script setup lang="ts">
import { ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { INFO_TEXT_KEYS, type InfoTextKey } from "@/config/info-text-keys.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import MenuBase from "@/components/header/MenuBase.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

const isDialogOpen = ref<Record<InfoTextKey, boolean>>({
  contact: false,
  legalNotice: false,
  license: false,
});

const icons: Record<InfoTextKey, string> = {
  contact: "sym_s_contact_support",
  legalNotice: "sym_s_balance",
  license: "sym_s_license",
};
</script>

<template>
  <MenuBase :label="t('header.info.label')" icon="sym_s_info">
    <QList>
      <QItem
        v-for="key in INFO_TEXT_KEYS"
        :key
        v-close-popup
        clickable
        @click="isDialogOpen[key] = true"
      >
        <QItemSection side>
          <QIcon :name="icons[key]" color="primary" />
        </QItemSection>
        <QItemSection>
          {{ t(`header.info.${key}.label`) }}
        </QItemSection>
      </QItem>
    </QList>
  </MenuBase>

  <QDialog
    v-for="key in INFO_TEXT_KEYS"
    :key
    v-model="isDialogOpen[key]"
    square
  >
    <QCard square>
      <QCardSection class="text-h6">
        {{ t(`header.info.${key}.label`) }}
      </QCardSection>
      <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
      <QCardSection
        class="text-justify q-pt-none"
        v-html="t(`header.info.${key}.message`, { email: organization.email })"
      />
      <!-- eslint-enable vue/no-v-html vue/no-v-text-v-html-on-component -->
    </QCard>
  </QDialog>
</template>

<style scoped lang="scss">
.q-dialog .q-card {
  max-width: $dialog-info-max-width;
}
.q-item {
  white-space: nowrap;
}
</style>
