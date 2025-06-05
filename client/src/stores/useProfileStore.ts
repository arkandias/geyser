import { computed, ref } from "vue";

import { useYearsStore } from "@/stores/useYearsStore.ts";

type Profile = {
  uid: string;
  displayname?: string | null;
  services: {
    id: number;
    year: number;
  }[];
};

const profile = ref<Profile>({
  uid: "",
  displayname: "",
  services: [],
});

const setProfile = (newProfile: Profile) => {
  profile.value = newProfile;
};

export const useProfileStore = () => {
  const { activeYear } = useYearsStore();

  const isLoaded = computed(() => !!profile.value.uid);
  const uid = computed(() => profile.value.uid);
  const displayname = computed(
    () => profile.value.displayname ?? profile.value.uid,
  );
  const serviceId = computed(
    () =>
      profile.value.services.find((s) => s.year === activeYear.value)?.id ??
      null,
  );
  const hasService = computed(() => serviceId.value !== null);

  return {
    isLoaded,
    uid,
    displayname,
    serviceId,
    hasService,
    setProfile,
  };
};
