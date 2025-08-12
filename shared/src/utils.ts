export const omit = <T extends object, K extends PropertyKey>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  const keysSet = new Set(keys);
  return Object.fromEntries(
    Object.entries(result).filter(([key]) => !keysSet.has(key as K)),
  ) as Omit<T, K>;
};
