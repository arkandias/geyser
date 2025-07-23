import type { PRIMITIVE_TYPE_NAMES } from "@/config/constants.ts";
import type { Column } from "@/types/column.ts";

export type PrimitiveType = string | number | boolean;
export type PrimitiveTypeName = (typeof PRIMITIVE_TYPE_NAMES)[number];
export type PrimitiveTypeMap<T extends PrimitiveTypeName> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : never;

export type Scalar = PrimitiveType | null | undefined;
export type FlatObject<T extends Scalar = Scalar> = Record<string, T>;
export type SimpleObject<T extends Scalar = Scalar> = {
  [key: string]: T | SimpleObject<T>;
};

export type Option<T = Scalar> = {
  value: T;
  label: string;
};

export type OptionWithSearch<T = Scalar> = Option<T> & {
  search: string;
};

export type FieldMetadata = {
  type: PrimitiveTypeName;
  nullable?: boolean;
  info?: string;
};

export type RowMetadata<K extends string = string> = Record<K, FieldMetadata>;

export type ParsedField<T extends FieldMetadata> = T["nullable"] extends true
  ? PrimitiveTypeMap<T["type"]> | null
  : PrimitiveTypeMap<T["type"]>;

export type ParsedRow<T extends RowMetadata> = {
  -readonly [K in keyof T]: ParsedField<T[K]>;
};

export type NullableParsedRow<T extends RowMetadata> = {
  -readonly [K in keyof T]?: ParsedField<T[K]> | null;
};

export type AdminColumn<R> = Partial<Column<R>> &
  FieldMetadata & {
    formComponent: "select" | "toggle" | "input";
    inputType?: "text" | "textarea" | "number";
  };

export type AdminColumns<
  K extends string = string,
  R extends object = object,
> = Record<K, AdminColumn<R>>;

export type SelectKeys<
  K extends string,
  R extends object,
  T extends AdminColumns<K, R>,
> = {
  [K in keyof T]: T[K]["formComponent"] extends "select" ? K : never;
}[keyof T];

export type SelectOptions<
  K extends string,
  R extends object,
  T extends AdminColumns<K, R>,
> = Partial<Record<SelectKeys<K, R, T>, Scalar[] | Option[]>>;
