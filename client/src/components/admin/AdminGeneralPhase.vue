<script setup lang="ts">
import { useMutation } from "@urql/vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { PhaseEnum, SetCurrentPhaseDocument } from "@/gql/graphql.ts";
import { phaseLabel } from "@/locales/helpers.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";

const { t } = useTypedI18n();
const { notify } = useNotify();
const { currentPhase } = useCurrentPhaseStore();

const phaseOptions = [
  PhaseEnum.Requests,
  PhaseEnum.Assignments,
  PhaseEnum.Results,
  PhaseEnum.Shutdown,
].map((phase) => ({
  value: phase,
  label: phaseLabel(t, phase),
}));

graphql(`
  mutation SetCurrentPhase($phase: PhaseEnum!) {
    updateCurrentPhaseByPk(pkColumns: { id: 1 }, _set: { value: $phase }) {
      value
    }
  }
`);

const setCurrentPhase = useMutation(SetCurrentPhaseDocument);

const setCurrentPhaseHandle = async (phase: PhaseEnum): Promise<void> => {
  const { error } = await setCurrentPhase.executeMutation({ phase });
  if (error) {
    notify(NotifyType.Error, {
      message: t("admin.general.phase.error.setCurrent"),
      caption: error.message,
    });
  } else {
    notify(NotifyType.Success, {
      message: t("admin.general.phase.success.setCurrent"),
    });
  }
};
</script>

<template>
  <QOptionGroup
    :model-value="currentPhase"
    :options="phaseOptions"
    type="radio"
    inline
    dense
    @update:model-value="setCurrentPhaseHandle"
  />
</template>

<style scoped lang="scss"></style>
