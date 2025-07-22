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

export const toLowerCase = <T extends string>(str: T): Lowercase<T> =>
  str.toLowerCase() as Lowercase<T>;

export const toUpperCase = <T extends string>(str: T): Uppercase<T> =>
  str.toUpperCase() as Uppercase<T>;

export const capitalize = <T extends string>(str: T): Capitalize<T> =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;

export const camelToSnake = (str: string) =>
  str.replace(/([A-Z])/g, "_$1").toLowerCase();
