<script setup lang="ts">
import { useQueryParam } from "@/composables/useQueryParam.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { useLeftPanelStore } from "@/stores/useLeftPanelStore.ts";
import { useServicesStore } from "@/stores/useServicesStore.ts";
import { buttonColor } from "@/utils/colors.ts";

import MenuYear from "@/components/header/MenuYear.vue";

const { t } = useTypedI18n();
const { hasService, serviceId } = useServicesStore();
const { isLeftPanelOpen, toggleLeftPanel } = useLeftPanelStore();
const { getValue: selectedService, toggleValue: toggleService } = useQueryParam(
  "serviceId",
  true,
);
</script>

<template>
  <QIcon name="sym_s_chevron_right" />
  <MenuYear />
  <QBtn
    icon="sym_s_vertical_split"
    :color="buttonColor(isLeftPanelOpen)"
    flat
    square
    @click="toggleLeftPanel()"
  >
    <QTooltip>
      {{ t("header.courses.servicesTable") }}
    </QTooltip>
  </QBtn>
  <QBtn
    icon="sym_s_assignment"
    :color="buttonColor(selectedService === serviceId)"
    :disable="!hasService"
    flat
    square
    @click="toggleService(serviceId)"
  >
    <QTooltip>
      {{ t("header.courses.myService") }}
    </QTooltip>
  </QBtn>
</template>

<style scoped lang="scss"></style>
