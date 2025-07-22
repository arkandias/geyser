import Papa from "papaparse";

import type { FlatObject } from "@/types/data.ts";
import { toSlug } from "@/utils";

const exportCSV = (objects: FlatObject[]) =>
  Papa.unparse(objects, { newline: "\n" });

export const downloadCSV = (objects: FlatObject[], filename: string): void => {
  const csv = exportCSV(objects);

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
