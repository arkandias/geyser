import { computed } from "vue";
import {
  type LocationQueryValue,
  type LocationQueryValueRaw,
  type Router,
  useRouter,
} from "vue-router";

const toNumber = (value?: LocationQueryValue): number | null | undefined =>
  value != null ? Number(value) : value;

const getQueryParam = (
  router: Router,
  param: string,
): LocationQueryValue | undefined => {
  const value = router.currentRoute.value.query[param];
  return Array.isArray(value) ? value[0] : value;
};

const setQueryParam = async (
  router: Router,
  param: string,
  value: LocationQueryValueRaw,
) => {
  await router.replace({
    query: {
      ...router.currentRoute.value.query,
      [param]: value,
    },
  });
};

export const useQueryParam = <B extends boolean = false>(
  param: string,
  isNumber?: B,
) => {
  const router = useRouter();

  const getValue = computed<B extends true ? number | null : string | null>(
    () =>
      ((isNumber
        ? toNumber(getQueryParam(router, param))
        : getQueryParam(router, param)) ?? null) as B extends true
        ? number | null
        : string | null,
  );

  const setValue = async (
    value?: B extends true ? number | null : string | null,
  ): Promise<void> => {
    await setQueryParam(router, param, value ?? undefined);
  };

  const toggleValue = async (
    value?: B extends true ? number | null : string | null,
  ): Promise<void> => {
    await setQueryParam(
      router,
      param,
      getValue.value === (value ?? null) ? undefined : value,
    );
  };

  return { getValue, setValue, toggleValue };
};
