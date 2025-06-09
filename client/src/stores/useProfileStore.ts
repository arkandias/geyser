import { computed, readonly, ref } from "vue";

import { useYearsStore } from "@/stores/useYearsStore.ts";

type Profile = {
  id: number;
  displayname?: string | null;
  services: {
    id: number;
    year: number;
  }[];
};

const profile = ref<Profile & { isLoaded: boolean }>({
  id: -1,
  displayname: "",
  services: [],
  isLoaded: false,
});

const setProfile = (newProfile: Omit<Profile, "isLoaded">) => {
  profile.value = { ...newProfile, isLoaded: true };
};

export const useProfileStore = () => {
  const { activeYear } = useYearsStore();

  const currentServiceId = computed(
    () =>
      profile.value.services.find((s) => s.year === activeYear.value)?.id ??
      null,
  );
  const hasService = computed(() => currentServiceId.value !== null);

  return {
    profile: readonly(profile),
    currentServiceId,
    hasService,
    setProfile,
  };
};
