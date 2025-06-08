<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { inject } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { PhaseTypeEnum, SetCurrentPhaseDocument } from "@/gql/graphql.ts";
import { phaseLabel } from "@/locales/helpers.ts";
import type { AuthManager } from "@/services/auth.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const authManager = inject<AuthManager>("authManager")!;
const { t } = useTypedI18n();
const { notify } = useNotify();
const { currentPhase } = useCurrentPhaseStore();

const phaseOptions = [
  PhaseTypeEnum.Requests,
  PhaseTypeEnum.Assignments,
  PhaseTypeEnum.Results,
  PhaseTypeEnum.Shutdown,
].map((phase) => ({
  value: phase,
  label: phaseLabel(t, phase),
}));

graphql(`
  mutation SetCurrentPhase($oid: Int!, $phase: PhaseTypeEnum!) {
    updatePhaseByPk(pkColumns: { oid: $oid }, _set: { value: $phase }) {
      value
    }
  }
`);

const setCurrentPhase = useMutation(SetCurrentPhaseDocument);

const setCurrentPhaseHandle = async (phase: PhaseTypeEnum): Promise<void> => {
  const { error } = await setCurrentPhase.executeMutation({
    oid: authManager.orgId,
    phase,
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
