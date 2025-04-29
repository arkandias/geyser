import { unparse } from "papaparse";

import type { Scalar, SimpleObject } from "@/types/data.ts";
import { toSlug } from "@/utils/misc.ts";

const flattenSimpleObjectEntries = <T extends Scalar>(
  obj: T | SimpleObject<T> | undefined,
  fields: string | SimpleObject<string>,
): [string, T | SimpleObject<T> | undefined][] =>
  typeof fields === "string"
    ? [[fields, obj]]
    : Object.entries(fields).flatMap(([key, value]) =>
        flattenSimpleObjectEntries<T>(
          typeof obj === "object" && obj !== null ? obj[key] : undefined,
          value,
        ),
      );

export const flattenSimpleObject = <T extends Scalar>(
  obj: SimpleObject<T>,
  fields: SimpleObject<string>,
) => Object.fromEntries(flattenSimpleObjectEntries<T>(obj, fields));

export const processSimpleObject = <T extends Scalar>(
  obj: SimpleObject<T>,
  fields?: SimpleObject<string> | string[] | null,
) => {
  if (!fields) {
    return obj;
  }
  if (Array.isArray(fields)) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => fields.includes(key)),
    );
  }
  return flattenSimpleObject(obj, fields);
};

const exportCSV = (
  objects: SimpleObject[],
  fields?: SimpleObject<string> | string[] | null,
) =>
  unparse(
    objects.map((obj) => processSimpleObject(obj, fields)),
    { newline: "\n" },
  );

export const downloadCSV = (
  filename: string,
  objects: SimpleObject[],
  fields?: SimpleObject<string> | string[] | null,
): void => {
  const csv = exportCSV(objects, fields);

  const BOM = "\uFEFF"; // Byte Order Mark
  const blob = new Blob([BOM + csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.download = toSlug(filename) + ".csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
