<script setup lang="ts">
import { useMutation } from "@urql/vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { PhaseEnum, SetCurrentPhaseDocument } from "@/gql/graphql.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { toLowerCase } from "@/utils";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();
const { notify } = useNotify();
const { currentPhase } = useCurrentPhaseStore();

const phaseOptions = [
  PhaseEnum.Requests,
  PhaseEnum.Assignments,
  PhaseEnum.Results,
  PhaseEnum.Shutdown,
].map((phase) => ({
  value: phase,
  label: t(`phase.${toLowerCase(phase)}`),
}));

graphql(`
  mutation SetCurrentPhase($oid: Int!, $value: PhaseEnum!) {
    insertCurrentPhase(
      objects: { oid: $oid, value: $value }
      onConflict: { constraint: current_phase_pkey, updateColumns: [value] }
    ) {
      returning {
        oid
        value
      }
    }
  }
`);

const setCurrentPhase = useMutation(SetCurrentPhaseDocument);

const setCurrentPhaseHandle = async (value: PhaseEnum): Promise<void> => {
  const { error } = await setCurrentPhase.executeMutation({
    oid: organization.id,
    value,
  });
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
