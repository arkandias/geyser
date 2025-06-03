import { describe, expect, it } from "vitest";

import { compare } from "./arrays.ts";

const testData = [
  {
    id: 1,
    name: "John",
    course: {
      program: { degree: { name: "Bachelor" }, name: "Computer Science" },
      semester: 1,
    },
    teacher: { displayname: "Dr. Smith" },
  },
  {
    id: 2,
    name: "Alice",
    course: {
      program: { degree: { name: "Master" }, name: "Computer Science" },
      semester: 2,
    },
    teacher: { displayname: "Prof. Johnson" },
  },
  {
    id: 3,
    name: "Bob",
    course: {
      program: { degree: { name: "Bachelor" }, name: "Mathematics" },
      semester: 1,
    },
    teacher: { displayname: "Dr. Brown" },
  },
];

describe("compare function", () => {
  describe("single field sorting", () => {
    it("should sort by name ascending", () => {
      const sorted = [...testData].sort(compare("name"));
      expect(sorted.map((d) => d.name)).toEqual(["Alice", "Bob", "John"]);
    });

    it("should sort by name descending", () => {
      const sorted = [...testData].sort(compare("name", true));
      expect(sorted.map((d) => d.name)).toEqual(["John", "Bob", "Alice"]);
    });

    it("should sort by nested field", () => {
      const sorted = [...testData].sort(compare("course.program.degree.name"));
      const degrees = sorted.map((d) => d.course.program.degree.name);
      expect(degrees).toEqual(["Bachelor", "Bachelor", "Master"]);
    });

    it("should sort by semester", () => {
      const sorted = [...testData].sort(compare("course.semester"));
      const semesters = sorted.map((d) => d.course.semester);
      expect(semesters).toEqual([1, 1, 2]);
    });
  });

  describe("multiple field sorting", () => {
    it("should sort by multiple fields with priority", () => {
      const sorted = [...testData].sort(
        compare(["course.program.degree.name", "course.program.name"]),
      );

      const results = sorted.map((d) => ({
        degree: d.course.program.degree.name,
        program: d.course.program.name,
        name: d.name,
      }));

      expect(results).toEqual([
        { degree: "Bachelor", program: "Computer Science", name: "John" },
        { degree: "Bachelor", program: "Mathematics", name: "Bob" },
        { degree: "Master", program: "Computer Science", name: "Alice" },
      ]);
    });

    it("should sort by three fields", () => {
      const sorted = [...testData].sort(
        compare(["course.program.degree.name", "course.semester", "name"]),
      );

      const results = sorted.map((d) => ({
        degree: d.course.program.degree.name,
        semester: d.course.semester,
        name: d.name,
      }));

      expect(results).toEqual([
        { degree: "Bachelor", semester: 1, name: "Bob" },
        { degree: "Bachelor", semester: 1, name: "John" },
        { degree: "Master", semester: 2, name: "Alice" },
      ]);
    });
  });

  describe("string vs array parameter", () => {
    it("should handle string field the same as single-item array", () => {
      const sortedString = [...testData].sort(compare("name"));
      const sortedArray = [...testData].sort(compare(["name"]));

      expect(sortedString.map((d) => d.name)).toEqual(
        sortedArray.map((d) => d.name),
      );
    });
  });

  describe("descending flag", () => {
    it("should reverse order when desc=true", () => {
      const ascending = [...testData].sort(compare("name", false));
      const descending = [...testData].sort(compare("name", true));

      expect(ascending.map((d) => d.name)).toEqual(["Alice", "Bob", "John"]);
      expect(descending.map((d) => d.name)).toEqual(["John", "Bob", "Alice"]);
    });

    it("should work with multiple fields and desc=true", () => {
      const sorted = [...testData].sort(
        compare(["course.program.degree.name", "name"], true),
      );

      const results = sorted.map((d) => ({
        degree: d.course.program.degree.name,
        name: d.name,
      }));

      expect(results).toEqual([
        { degree: "Master", name: "Alice" },
        { degree: "Bachelor", name: "John" },
        { degree: "Bachelor", name: "Bob" },
      ]);
    });
  });

  describe("edge cases", () => {
    it("should handle null/undefined values", () => {
      const dataWithNulls = [
        { name: "A", value: null },
        { name: "B", value: "test" },
        { name: "C", value: undefined },
      ];

      const sorted = [...dataWithNulls].sort(compare("value"));
      expect(sorted[0]?.value).toBeNull();
      expect(sorted[1]?.value).toBeUndefined();
      expect(sorted[2]?.value).toBe("test");
    });

    it("should handle non-existent fields", () => {
      const sorted = [...testData].sort(compare("nonexistent"));
      expect(sorted).toHaveLength(testData.length);
    });

    it("should handle empty arrays", () => {
      expect(() => [].sort(compare("name"))).not.toThrow();
    });

    it("should handle single item", () => {
      const result = [testData[0]].sort(compare("name"));
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(testData[0]);
    });

    it("should handle deeply nested non-existent paths", () => {
      const sorted = [...testData].sort(
        compare("course.nonexistent.deep.path"),
      );
      expect(sorted).toHaveLength(testData.length);
    });
  });
});
