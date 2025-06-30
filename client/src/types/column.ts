/* eslint-disable @typescript-eslint/no-explicit-any */

export type Column<R> = {
  // QTable `columns` fields
  name: string;
  label: string;
  field: string | ((row: R) => any);
  required?: boolean;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: R, rowB: R) => number;
  rawSort?: (a: any, b: any, rowA: R, rowB: R) => number;
  sortOrder?: "ad" | "da";
  format?: (val: any, row: R) => any;
  style?: string | ((row: R) => string);
  classes?: string | ((row: R) => string);
  headerStyle?: string;
  headerClasses?: string;

  // Custom fields
  tooltip?: string;
  visible?: boolean;
  searchable?: boolean;
  badge?: (col: Column<R>, row: R) => boolean;
};
