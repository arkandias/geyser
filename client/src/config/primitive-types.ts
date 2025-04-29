export const PRIMITIVE_TYPES = ["string", "number", "boolean"] as const;

export type PrimitiveType = (typeof PRIMITIVE_TYPES)[number];

export const isPrimitiveType = (type: unknown): type is PrimitiveType =>
  PRIMITIVE_TYPES.includes(type as PrimitiveType);

export type PrimitiveTypeMap<T extends PrimitiveType> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : never;
