import { computed, reactive, readonly } from "vue";

import type { RoleEnum } from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

type Profile = {
  id: number;
  isAdmin: boolean;
  roles: RoleEnum[];
  activeRole: RoleEnum | null;
  displayname: string;
  services: {
    id: number;
    year: number;
  }[];
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedOut: boolean;
};

const profile = reactive<Profile>({
  id: -1,
  isAdmin: false,
  roles: [],
  activeRole: null,
  displayname: "",
  services: [],
  login: (): Promise<void> => {
    return Promise.resolve();
  },
  logout: (): Promise<void> => {
    return Promise.resolve();
  },
  isLoggedOut: false,
});

const setProfile = (newProfile: Profile) => {
  Object.assign(profile, newProfile);
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
