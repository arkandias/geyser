import { describe, expect, it } from "vitest";

import { flattenSimpleObject, processSimpleObject } from "./csv-export.ts";
import type { Scalar } from "@/types/data.ts";

describe("flattenSimpleObject", () => {
  it("handles flat object mapping", () => {
    const fields = {
      name: "userName",
      age: "userAge",
      isActive: "userIsActive",
    };
    const obj = {
      name: "John Doe",
      age: 30,
      isActive: true,
    };
    expect(flattenSimpleObject(obj, fields)).toEqual({
      userName: "John Doe",
      userAge: 30,
      userIsActive: true,
    });
  });

  it("handles deeply nested object mapping", () => {
    const fields = {
      user: {
        profile: {
          personal: {
            firstName: "givenName",
            lastName: "familyName",
            age: "userAge",
            contact: {
              email: "userEmail",
              phone: "phoneNumber",
            },
          },
          settings: {
            theme: "userTheme",
            notifications: "notificationPrefs",
          },
        },
      },
    };
    const obj = {
      user: {
        profile: {
          personal: {
            firstName: "Alice",
            lastName: "Johnson",
            age: 30,
            contact: {
              email: "jane@example.com",
              phone: "123-456-7890",
            },
          },
          settings: {
            theme: "dark",
            notifications: { email: true, push: false },
          },
        },
      },
    };
    expect(flattenSimpleObject<Scalar>(obj, fields)).toEqual({
      givenName: "Alice",
      familyName: "Johnson",
      userAge: 30,
      userEmail: "jane@example.com",
      phoneNumber: "123-456-7890",
      userTheme: "dark",
      notificationPrefs: { email: true, push: false },
    });
  });

  it("handles missing or undefined values", () => {
    const fields = {
      name: "userName",
      age: "userAge",
      address: {
        street: "streetAddress",
        city: "cityName",
      },
    };
    const obj = {
      name: "Bob",
      age: undefined,
      // address is missing
    };
    expect(flattenSimpleObject(obj, fields)).toEqual({
      userName: "Bob",
      age: undefined,
      streetAddress: undefined,
      cityName: undefined,
    });
  });

  it("handles empty objects", () => {
    expect(flattenSimpleObject({}, {})).toEqual({});
  });

  it("handles null values", () => {
    const fields = {
      data: {
        value: "storedValue",
      },
    };
    const obj = {
      data: null,
    };
    expect(flattenSimpleObject(obj, fields)).toEqual({
      storedValue: undefined,
    });
  });
});

describe("processSimpleObject", () => {
  it("returns the original object when fields is null", () => {
    const obj = { name: "Test", age: 25 };
    expect(processSimpleObject(obj, null)).toEqual(obj);
  });

  it("returns the original object when fields is undefined", () => {
    const obj = { name: "Test", age: 25 };
    expect(processSimpleObject(obj, undefined)).toEqual(obj);
  });

  it("filters properties based on array of field names", () => {
    const obj = { name: "Test", age: 25, email: "test@example.com" };
    expect(processSimpleObject(obj, ["name", "email"])).toEqual({
      name: "Test",
      email: "test@example.com",
    });
  });

  it("flattens object when fields is an object mapping", () => {
    const obj = { user: { name: "Test", age: 25 } };
    const fields = { user: { name: "userName", age: "userAge" } };

    const result = processSimpleObject(obj, fields);

    expect(result).toEqual({
      userName: "Test",
      userAge: 25,
    });
  });
});
