export const localeCompare = (a: string, b: string) => a.localeCompare(b);

export const compare =
  <K extends string, T extends Record<K, string>>(name: K) =>
  (a: T, b: T) =>
    localeCompare(a[name].toLowerCase(), b[name].toLowerCase());

export const inputToNumber = (input: string | number | null) =>
  typeof input === "string" ? (input === "" ? null : Number(input)) : input;

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
