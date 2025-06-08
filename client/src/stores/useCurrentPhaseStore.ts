import { readonly, ref } from "vue";

import { PhaseTypeEnum } from "@/gql/graphql.ts";

const currentPhase = ref<PhaseTypeEnum>(PhaseTypeEnum.Shutdown);

const setCurrentPhase = (phase: PhaseTypeEnum | undefined) => {
  currentPhase.value = phase ?? PhaseTypeEnum.Shutdown;
};

export const useCurrentPhaseStore = () => ({
  currentPhase: readonly(currentPhase),
  setCurrentPhase,
});
