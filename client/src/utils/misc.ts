export const normalizeForSearch = (str: string) =>
  str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export const toSlug = (str: string) =>
  str
    .toLowerCase() // Convert to lowercase
    .normalize("NFD") // Normalize diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9_\s-]/g, "") // Remove non-alphanumeric chars (except underscore)
    .replace(/[\s-]+/g, "_") // Replace spaces and hyphens with underscore
    .trim(); // Remove leading/trailing spaces

export const unique = <T>(element: T, index: number, array: T[]) =>
  array.findIndex((el) => el === element) === index;

export const uniqueValue =
  <K extends string, T extends Record<K, unknown>>(value: K) =>
  (element: T, index: number, array: T[]) =>
    array.findIndex((el) => el[value] === element[value]) === index;

export const localeCompare = (a: string, b: string) => a.localeCompare(b);

export const compare =
  <K extends string, T extends Record<K, string>>(name: K) =>
  (a: T, b: T) =>
    localeCompare(a[name].toLowerCase(), b[name].toLowerCase());

export const totalValue = <T extends string>(
  arr: Partial<Record<T, number | null>>[],
  value: T,
) => arr.reduce((tot, val) => tot + (val[value] ?? 0), 0);

export const capitalize = <T extends string>(
  str: T,
): Capitalize<Lowercase<T>> =>
  (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()) as Capitalize<
    Lowercase<T>
  >;

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
