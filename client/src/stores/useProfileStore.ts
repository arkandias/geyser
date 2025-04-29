import { computed, reactive, readonly, ref, toRefs } from "vue";

import { PhaseEnum, RoleTypeEnum } from "@/gql/graphql.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

type Profile = {
  uid: string;
  displayname: string;
  active: boolean;
  roles: RoleTypeEnum[];
  services: { id: number; year: number }[];
};

const profile = reactive<Profile>({
  uid: "",
  displayname: "",
  active: false,
  roles: [RoleTypeEnum.Teacher],
  services: [],
});
const activeRole = ref<RoleTypeEnum>(RoleTypeEnum.Teacher);
const loaded = ref(false);

const setActiveRole = (role: RoleTypeEnum) => {
  if (profile.roles.includes(role)) {
    activeRole.value = role;
  } else {
    console.error(`Role not allowed: ${role}`);
  }
};

export const useProfileStore = () => {
  const { currentPhase } = useCurrentPhaseStore();
  const { activeYear } = useYearsStore();

  const serviceId = computed(
    () =>
      profile.services.find((service) => service.year === activeYear.value)
        ?.id ?? null,
  );
  const hasService = computed(() => serviceId.value !== null);

  const setProfile = (newProfile: Profile) => {
    Object.assign(profile, newProfile);

    profile.roles.push(RoleTypeEnum.Teacher);

    if (profile.roles.includes(RoleTypeEnum.Admin)) {
      activeRole.value = RoleTypeEnum.Admin;
    } else if (
      profile.roles.includes(RoleTypeEnum.Commissioner) &&
      currentPhase.value === PhaseEnum.Assignments
    ) {
      activeRole.value = RoleTypeEnum.Commissioner;
    } else {
      activeRole.value = RoleTypeEnum.Teacher;
    }

    loaded.value = true;
  };

  return {
    ...toRefs(readonly(profile)),
    activeRole: readonly(activeRole),
    loaded: readonly(loaded),
    serviceId,
    hasService,
    setProfile,
    setActiveRole,
  };
};
