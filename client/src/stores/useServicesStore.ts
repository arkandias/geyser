import { computed, ref } from "vue";

import { useYearsStore } from "@/stores/useYearsStore.ts";

type Service = {
  id: number;
  year: number;
};

const services = ref<Service[]>([]);

const setServices = (newServices: Service[]) => {
  services.value = newServices;
};

export const useServicesStore = () => {
  const { activeYear } = useYearsStore();

  const serviceId = computed(
    () => services.value.find((s) => s.year === activeYear.value)?.id ?? null,
  );
  const hasService = computed(() => serviceId.value !== null);

  return {
    serviceId,
    hasService,
    setServices,
  };
};
