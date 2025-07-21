<script lang="ts">
export const INFO_TEXT_KEYS = ["contact", "legalNotice", "license"] as const;

export type InfoTextKey = (typeof INFO_TEXT_KEYS)[number];
</script>

<script setup lang="ts">
import { ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
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
  <MenuBase id="info-button" icon="sym_s_info" :label="t('header.info.label')">
    <QList id="info-menu">
      <QItem class="flex-center text-no-wrap">
        <QItemLabel header>
          {{ t("header.info.label") }}
        </QItemLabel>
      </QItem>
      <QSeparator />
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
    <QCard flat square>
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
  max-width: 720px;
  width: 720px;
}
.q-item {
  white-space: nowrap;
}
</style>
