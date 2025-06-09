import { readonly, ref } from "vue";

import { PhaseEnum } from "@/gql/graphql.ts";

const currentPhase = ref<PhaseEnum>(PhaseEnum.Shutdown);

const setCurrentPhase = (phase: PhaseEnum | undefined) => {
  currentPhase.value = phase ?? PhaseEnum.Shutdown;
};

export const useCurrentPhaseStore = () => ({
  currentPhase: readonly(currentPhase),
  setCurrentPhase,
});
