<script setup lang="ts">
import { useLocale } from "@/composables/useLocale.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { localeOptions } from "@/services/i18n.ts";

import MenuBase from "@/components/header/MenuBase.vue";

const { t, locale } = useTypedI18n();
const { setLocale } = useLocale();
</script>

<template>
  <MenuBase
    id="lang-button"
    :label="t('header.lang.label')"
    icon="sym_s_language"
  >
    <QList id="lang-menu">
      <QItem class="flex-center text-no-wrap">
        <QItemLabel header>
          {{ t("header.lang.label") }}
        </QItemLabel>
      </QItem>
      <QSeparator />
      <QItem class="q-pl-sm">
        <QOptionGroup
          v-model="locale"
          :options="localeOptions"
          type="radio"
          @update:model-value="setLocale"
        />
      </QItem>
    </QList>
  </MenuBase>
</template>

<style scoped lang="scss"></style>
