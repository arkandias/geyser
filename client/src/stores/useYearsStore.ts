import { computed, readonly, ref } from "vue";

import { useQueryParam } from "@/composables/useQueryParam.ts";

type Year = {
  id: number;
  value: number;
  current: boolean;
  visible: boolean;
};

const years = ref<Year[]>([]);
const currentYear = computed(
  () => years.value.find((year) => year.current)?.value ?? null,
);

const setYears = (newYears: Year[]) => {
  years.value = newYears;
};

export const useYearsStore = () => {
  const { getValue: selectedYear, setValue: selectYear } = useQueryParam(
    "year",
    true,
  );
  const activeYear = computed<number | null>(() =>
    years.value.find((year) => year.value === selectedYear.value)
      ? selectedYear.value
      : currentYear.value,
  );
  const isCurrentYearActive = computed(
    () => currentYear.value !== null && activeYear.value === currentYear.value,
  );

  return {
    years: readonly(years),
    currentYear: readonly(currentYear),
    selectedYear,
    activeYear,
    isCurrentYearActive,
    setYears,
    selectYear,
  };
};
