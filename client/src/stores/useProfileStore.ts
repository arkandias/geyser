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

const profile = ref<Profile>({
  id: NaN,
  displayname: "",
  services: [],
});

const setProfile = (newProfile: Profile) => {
  profile.value = newProfile;
};

export const useProfileStore = () => {
  const { activeYear } = useYearsStore();

  const isLoaded = computed(() => !Number.isNaN(profile.value.id));
  const currentServiceId = computed(
    () =>
      profile.value.services.find((s) => s.year === activeYear.value)?.id ??
      null,
  );
  const hasService = computed(() => currentServiceId.value !== null);

  return {
    profile: readonly(profile),
    isLoaded,
    currentServiceId,
    hasService,
    setProfile,
  };
};
