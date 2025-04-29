<script setup lang="ts">
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { useCustomTextsStore } from "@/stores/useCustomTextsStore.ts";

import MenuBase from "@/components/header/MenuBase.vue";

const { t } = useTypedI18n();
const { getCustomText } = useCustomTextsStore();

const sections = ["contact", "legalNotice", "license"] as const;

const isDialogOpen = ref({
  contact: false,
  legalNotice: false,
  license: false,
});

const labels = {
  contact: t("header.info.contact.label"),
  legalNotice: t("header.info.legalNotice.label"),
  license: t("header.info.license.label"),
};

const icons = {
  contact: "sym_s_contact_support",
  legalNotice: "sym_s_balance",
  license: "sym_s_license",
};

const messages = computed(() => ({
  contact: getCustomText("contact").value || t("header.info.contact.message"),
  legalNotice:
    getCustomText("legalNotice").value || t("header.info.legalNotice.message"),
  license: t("header.info.license.message"),
}));
</script>

<template>
  <MenuBase :label="t('header.info.label')" icon="sym_s_info">
    <QList>
      <QItem
        v-for="s in sections"
        :key="s"
        v-close-popup
        clickable
        @click="isDialogOpen[s] = true"
      >
        <QItemSection side>
          <QIcon :name="icons[s]" color="primary" />
        </QItemSection>
        <QItemSection>
          {{ labels[s] }}
        </QItemSection>
      </QItem>
    </QList>
  </MenuBase>

  <QDialog v-for="s in sections" :key="s" v-model="isDialogOpen[s]" square>
    <QCard square>
      <QCardSection class="text-h6">
        {{ labels[s] }}
      </QCardSection>
      <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
      <QCardSection class="text-justify q-pt-none" v-html="messages[s]" />
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
