import { computed, reactive, readonly } from "vue";

import { RoleEnum } from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

type Profile = {
  oid: number;
  id: number;
  roles: RoleEnum[];
  activeRole: RoleEnum;
  displayname: string;
  services: {
    id: number;
    year: number;
  }[];
  isLoaded: boolean;
};

const profile = reactive<Profile>({
  oid: -1,
  id: -1,
  displayname: "",
  roles: [],
  activeRole: RoleEnum.Teacher,
  services: [],
  isLoaded: false,
});

const setProfile = (newProfile: Omit<Profile, "isLoaded">) => {
  Object.assign(profile, newProfile);
  profile.isLoaded = true;
};

const setActiveRole = (role: RoleEnum) => {
  profile.activeRole = role;
};

export const useProfileStore = () => {
  const { activeYear } = useYearsStore();

  const currentServiceId = computed(
    () => profile.services.find((s) => s.year === activeYear.value)?.id ?? null,
  );
  const hasService = computed(() => currentServiceId.value !== null);

  return {
    profile: readonly(profile),
    currentServiceId,
    hasService,
    setProfile,
    setActiveRole,
  };
};
