import { errorMessage } from "@geyser/shared";
import Papa from "papaparse";

import type {
  FieldMetadata,
  ParsedField,
  ParsedRow,
  RowMetadata,
} from "@/types/data.ts";

/**
 * Parses a string value into a strongly-typed field (string, number, or
 * boolean) based on the field metadata. Handles nullable fields and trims
 * whitespace. Throws if value cannot be parsed into the specified type.
 */
export const parseField = <T extends FieldMetadata>(
  str: string,
  fieldMetadata: T,
): ParsedField<T> => {
  const trimmed = str.trim();
  if (!trimmed) {
    if (fieldMetadata.nullable) {
      return null as ParsedField<T>;
    }
    throw new Error(`Non-nullable field is empty`);
  }
  switch (fieldMetadata.type) {
    case "string":
      return trimmed as ParsedField<T>;
    case "number": {
      const num = Number(trimmed);
      if (!Number.isFinite(num)) {
        throw new Error("Not a number");
      }
      return num as ParsedField<T>;
    }
    case "boolean": {
      switch (trimmed) {
        case "true":
          return true as ParsedField<T>;
        case "false":
          return false as ParsedField<T>;
        default:
          throw new Error("Boolean fields must be 'true' or 'false'");
      }
    }
  }
};

/**
 * Returns a parser function for PapaParse to transform CSV fields according to
 * their metadata. Throws detailed error messages when parsing fails,
 * including the field name in the error.
 */
const transform =
  (rowMetadata: RowMetadata): Papa.ParseConfig["transform"] =>
  (value: string, field: string | number) => {
    const fieldMetadata = rowMetadata[field];
    if (!fieldMetadata) {
      throw new Error(`Unexpected field: ${field}`);
    }
    try {
      return parseField(value, fieldMetadata);
    } catch (error) {
      const message = errorMessage(error);
      throw new Error(`Error while parsing field '${field}': ${message}`);
    }
  };

/**
 * Parses a CSV text using row metadata and returns an array of typed rows.
 */
export const importCSV = <T extends RowMetadata>(
  text: string,
  rowMetadata: T,
): ParsedRow<T>[] => {
  const parseResult = Papa.parse<ParsedRow<T>>(text, {
    delimiter: ",",
    header: true,
    skipEmptyLines: true,
    transform: transform(rowMetadata),
  });

  if (parseResult.errors.length) {
    const errorMessages = parseResult.errors.map((e) => e.message).join("\n  ");
    throw new Error(`Parse error:\n  ${errorMessages}`);
  }

  const missingHeaders = Object.keys(rowMetadata).filter(
    (key) => !parseResult.meta.fields?.includes(key),
  );
  if (missingHeaders.length) {
    throw new Error(`Missing required headers: ${missingHeaders.join(", ")}`);
  }

  return parseResult.data;
};
