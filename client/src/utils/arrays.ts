import { getNestedField } from "@/utils";

export const localeCompare = (a: unknown, b: unknown) => {
  // Convert to strings
  const aStr = a?.toString() ?? "";
  const bStr = b?.toString() ?? "";
  return aStr.localeCompare(bStr);
};

export const compare =
  (fields: string | string[], desc = false) =>
  (a: unknown, b: unknown) => {
    for (const field of typeof fields === "string" ? [fields] : fields) {
      const comparison = localeCompare(
        getNestedField(a, field),
        getNestedField(b, field),
      );
      if (comparison !== 0) {
        return desc ? -comparison : comparison;
      }
    }
    return 0;
  };

export const unique = <T>(element: T, index: number, array: T[]) =>
  array.findIndex((el) => el === element) === index;

export const uniqueValue =
  <K extends string, T extends Record<K, unknown>>(value: K) =>
  (element: T, index: number, array: T[]) =>
    array.findIndex((el) => el[value] === element[value]) === index;

export const totalValue = <T extends string>(
  arr: Partial<Record<T, number | null>>[],
  value: T,
) => arr.reduce((tot, val) => tot + (val[value] ?? 0), 0);
