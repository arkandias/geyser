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
