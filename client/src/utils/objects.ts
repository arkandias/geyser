export const getField = <R extends object>(
  row: R | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: string | ((row: R) => any),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any =>
  row === undefined
    ? null
    : typeof field === "function"
      ? field(row)
      : row[field as keyof R];

export const getNestedField = (obj: unknown, path: string) =>
  path
    .split(".")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    .reduce((current, key) => (current as any)?.[key] as unknown, obj);
