import type {
  PrimitiveType,
  PrimitiveTypeMap,
} from "@/config/primitive-types.ts";

export type Scalar = string | number | boolean | null | undefined;
export type SimpleObject<T extends Scalar = Scalar> = {
  [key: string]: T | SimpleObject<T>;
};

export type Option = {
  value: Scalar;
  label: Scalar;
};

export type FieldDescriptor = {
  type: PrimitiveType;
  nullable?: boolean;
  info?: string;
};

export type RowDescriptor<K extends string = string> = Record<
  K,
  FieldDescriptor
>;

export type ParsedField<T extends FieldDescriptor> = T["nullable"] extends true
  ? PrimitiveTypeMap<T["type"]> | null
  : PrimitiveTypeMap<T["type"]>;

export type ParsedRow<T extends RowDescriptor> = {
  -readonly [K in keyof T]: ParsedField<T[K]>;
};

export type NullableParsedRow<T extends RowDescriptor> = {
  -readonly [K in keyof T]?: ParsedField<T[K]> | null;
};

export type FieldDescriptorExtra<R extends SimpleObject> = FieldDescriptor & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: string | ((row: R) => any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (val: any, row: R) => any;
} & (
    | {
        formComponent: "select" | "toggle";
      }
    | {
        formComponent: "input";
        inputType?: "text" | "textarea" | "number";
      }
  );

export type RowDescriptorExtra<
  K extends string = string,
  R extends SimpleObject = SimpleObject,
> = Record<K, FieldDescriptorExtra<R>>;

export type SelectKeys<
  K extends string,
  R extends SimpleObject,
  T extends RowDescriptorExtra<K, R>,
> = {
  [K in keyof T]: T[K]["formComponent"] extends "select" ? K : never;
}[keyof T];

export type SelectOptions<
  K extends string,
  R extends SimpleObject,
  T extends RowDescriptorExtra<K, R>,
> = Partial<Record<SelectKeys<K, R, T>, Scalar[] | Option[]>>;
