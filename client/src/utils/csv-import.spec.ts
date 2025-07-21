import { describe, expect, it } from "vitest";

import { importCSV, parseField } from "./csv-import";

describe("parseField", () => {
  describe("string fields", () => {
    it("should parse regular strings", () => {
      expect(parseField("hello", { type: "string" })).toBe("hello");
      expect(parseField(" hello ", { type: "string" })).toBe("hello");
    });

    it("should handle empty strings based on nullable flag", () => {
      expect(parseField("", { type: "string", nullable: true })).toBeNull();
      expect(() => parseField("", { type: "string" })).toThrow(
        "Non-nullable field is empty",
      );
    });
  });

  describe("number fields", () => {
    it("should parse valid numbers", () => {
      expect(parseField("42", { type: "number" })).toBe(42);
      expect(parseField("-42.5", { type: "number" })).toBe(-42.5);
      expect(parseField(" 42 ", { type: "number" })).toBe(42);
    });

    it("should handle empty values based on nullable flag", () => {
      expect(parseField("", { type: "number", nullable: true })).toBeNull();
      expect(() => parseField("", { type: "number" })).toThrow(
        "Non-nullable field is empty",
      );
    });

    it("should throw error for invalid numbers", () => {
      expect(() => parseField("not a number", { type: "number" })).toThrow(
        "Not a number",
      );
      expect(() => parseField("12.34.56", { type: "number" })).toThrow(
        "Not a number",
      );
    });
  });

  describe("boolean fields", () => {
    it("should parse valid boolean strings", () => {
      expect(parseField("true", { type: "boolean" })).toBe(true);
      expect(parseField("false", { type: "boolean" })).toBe(false);
      expect(parseField(" true ", { type: "boolean" })).toBe(true);
    });

    it("should handle empty values based on nullable flag", () => {
      expect(parseField("", { type: "boolean", nullable: true })).toBeNull();
      expect(() => parseField("", { type: "boolean" })).toThrow(
        "Non-nullable field is empty",
      );
    });

    it("should throw error for invalid boolean values", () => {
      expect(() => parseField("yes", { type: "boolean" })).toThrow(
        "Boolean fields must be 'true' or 'false'",
      );
      expect(() => parseField("1", { type: "boolean" })).toThrow(
        "Boolean fields must be 'true' or 'false'",
      );
    });
  });
});

describe("importCSV", () => {
  it("should parse valid CSV with mixed types", () => {
    const csv = `name,age,isActive
John Doe,30,true
Jane Smith,25,false
Bob Johnson,,true`;

    const metadata = {
      name: { type: "string" },
      age: { type: "number", nullable: true },
      isActive: { type: "boolean" },
    } as const;

    const result = importCSV(csv, metadata);
    expect(result).toEqual([
      { name: "John Doe", age: 30, isActive: true },
      { name: "Jane Smith", age: 25, isActive: false },
      { name: "Bob Johnson", age: null, isActive: true },
    ]);
  });

  it("should throw error for missing required fields", () => {
    const csv = `name,age
John Doe,`;

    const metadata = {
      name: { type: "string" },
      age: { type: "number" },
    } as const;

    expect(() => importCSV(csv, metadata)).toThrow(
      "Error while parsing field 'age': Non-nullable field is empty",
    );
  });

  it("should throw error for invalid field types", () => {
    const csv = `name,age,isActive
John Doe,thirty,true`;

    const metadata = {
      name: { type: "string" },
      age: { type: "number" },
      isActive: { type: "boolean" },
    } as const;

    expect(() => importCSV(csv, metadata)).toThrow(
      "Error while parsing field 'age': Not a number",
    );
  });

  it("should throw error for unknown fields", () => {
    const csv = `name,age,unknownField
John Doe,30,value`;

    const metadata = {
      name: { type: "string" },
      age: { type: "number" },
    } as const;

    expect(() => importCSV(csv, metadata)).toThrow(
      "Unexpected field: unknownField",
    );
  });

  it("should handle CSV with only headers", () => {
    const csv = "name,age,isActive";
    const metadata = {
      name: { type: "string" },
      age: { type: "number" },
      isActive: { type: "boolean" },
    } as const;

    const result = importCSV(csv, metadata);
    expect(result).toEqual([]);
  });

  it("should throw error for malformed CSV input", () => {
    const csv = "name\nJohn,extra,column"; // more columns than headers
    const metadata = {
      name: { type: "string" },
    } as const;

    expect(() => importCSV(csv, metadata)).toThrow();
  });

  it("should preserve header order in output", () => {
    const csv = `age,name,isActive
30,John Doe,true`;

    const metadata = {
      name: { type: "string" },
      age: { type: "number" },
      isActive: { type: "boolean" },
    } as const;

    const result = importCSV(csv, metadata);
    const keys = Object.keys(result[0] ?? {});
    expect(keys).toEqual(["age", "name", "isActive"]);
  });

  it("should throw when required headers are missing", () => {
    const csv = "name\nJohn Doe"; // missing age header

    const metadata = {
      name: { type: "string" },
      age: { type: "number" },
    } as const;

    expect(() => importCSV(csv, metadata)).toThrow(
      "Missing required headers: age",
    );
  });

  it("should throw when multiple required headers are missing", () => {
    const csv = "name\nJohn Doe"; // missing age and isActive headers

    const metadata = {
      name: { type: "string" },
      age: { type: "number" },
      isActive: { type: "boolean" },
    } as const;

    expect(() => importCSV(csv, metadata)).toThrow(
      "Missing required headers: age, isActive",
    );
  });
});
