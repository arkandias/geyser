import * as fs from "fs/promises";
import { glob } from "glob";
import { describe, expect, it } from "vitest";

import en from "./en";
import fr from "./fr";
import { CUSTOM_TEXT_KEYS } from "@/config/custom-text-keys.ts";
import { INFO_TEXT_KEYS } from "@/config/info-text-keys.ts";
import { PRIMITIVE_TYPES } from "@/config/primitive-types.ts";
import {
  LocaleEnum,
  PhaseEnum,
  RequestTypeEnum,
  RoleEnum,
} from "@/gql/graphql.ts";
import type { SimpleObject } from "@/types/data.ts";
import { camelToDot, toLowerCase } from "@/utils";

import {
  adminCoordinationsCoursesColNames,
  adminCoordinationsProgramsColNames,
  adminCoordinationsTracksColNames,
  adminCoursesCourseTypesColNames,
  adminCoursesCoursesColNames,
  adminCoursesDegreesColNames,
  adminCoursesProgramsColNames,
  adminCoursesTermsColNames,
  adminCoursesTracksColNames,
  adminGeneralRolesColNames,
  adminRequestsPrioritiesColNames,
  adminRequestsRequestsColNames,
  adminTeachersMessagesColNames,
  adminTeachersPositionsColNames,
  adminTeachersServiceModificationTypesColNames,
  adminTeachersServiceModificationsColNames,
  adminTeachersServicesColNames,
  adminTeachersTeachersColNames,
} from "@/components/admin/col-names.ts";

const locales = {
  [LocaleEnum.Fr]: fr,
  [LocaleEnum.En]: en,
} satisfies Record<LocaleEnum, SimpleObject<string>>;

describe("Translation Validation", () => {
  it("should have all translation keys properly defined and used", async () => {
    const keys = await findKeysInFiles();

    Object.entries(locales).forEach(([label, messages]) => {
      const definedKeys = flattenObject(messages);

      const missingKeys = keys.filter((key) => !definedKeys.includes(key));
      expect(missingKeys, `Missing translation keys in ${label}`).toEqual([]);

      const unusedKeys = definedKeys.filter((key) => !keys.includes(key));
      expect(unusedKeys, `Unused translation keys in ${label}`).toEqual([]);
    });
  });
});

const flattenObject = (obj: SimpleObject<string>, prefix = ""): string[] =>
  Object.keys(obj).flatMap((key) =>
    typeof obj[key] === "object"
      ? flattenObject(obj[key], prefix + key + ".")
      : [prefix + key],
  );

const findKeysInFiles = async (): Promise<string[]> => {
  // Find all .vue and .ts files in src directory
  const files = await glob("src/**/*.{vue,ts}");

  // Regex for standard patterns
  const regexSingleQuotes = /[^a-zA-Z]t\([\s\n]*'([^']*)'/g;
  const regexDoubleQuotes = /[^a-zA-Z]t\([\s\n]*"([^"]*)"/g;
  const regexTemplateStrings = /[^a-zA-Z]t\([\s\n]*`([^`]*)`/g;
  const regexNonString = /[^a-zA-Z]t\([\s\n]*([^\s\n"'`][^)]*)\)/g;

  const standardKeys = new Set<string>();
  const templateStringsKeys = new Set<string>();
  const nonStringKeys = new Set<string>();
  const failedDeletes = new Set<string>();

  // Process each file
  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    let match: RegExpExecArray | null;

    // Check single quotes
    regexSingleQuotes.lastIndex = 0;
    while ((match = regexSingleQuotes.exec(content)) !== null) {
      if (match[1]) {
        standardKeys.add(match[1]);
      }
    }

    // Check double quotes
    regexDoubleQuotes.lastIndex = 0;
    while ((match = regexDoubleQuotes.exec(content)) !== null) {
      if (match[1]) {
        standardKeys.add(match[1]);
      }
    }

    // Check template strings
    regexTemplateStrings.lastIndex = 0;
    while ((match = regexTemplateStrings.exec(content)) !== null) {
      if (match[1]) {
        templateStringsKeys.add(match[1]);
      }
    }

    // Check non-string
    regexNonString.lastIndex = 0;
    while ((match = regexNonString.exec(content)) !== null) {
      if (match[1]) {
        nonStringKeys.add(match[1]);
      }
    }
  }

  // Manually add template string keys

  const deleteTemplateStringsKey = (key: string) => {
    if (!templateStringsKeys.delete(key)) {
      failedDeletes.add(key);
    }
  };

  Object.values(PhaseEnum).forEach((phase) => {
    standardKeys.add(`phase.${toLowerCase(phase)}`);
    standardKeys.add(`home.subtitle.${toLowerCase(phase)}`);
    standardKeys.add(`home.message.${toLowerCase(phase)}`);
  });
  deleteTemplateStringsKey("phase.${toLowerCase(phase)}");

  Object.values(RoleEnum).forEach((role) => {
    standardKeys.add(`role.${toLowerCase(role)}`);
  });
  deleteTemplateStringsKey("role.${toLowerCase(val)}");
  deleteTemplateStringsKey("role.${toLowerCase(role)}");

  Object.values(RequestTypeEnum).forEach((type) => {
    standardKeys.add(`requestType.${toLowerCase(type)}`);
  });
  deleteTemplateStringsKey("requestType.${toLowerCase(val)}");
  deleteTemplateStringsKey("requestType.${toLowerCase(value)}");
  deleteTemplateStringsKey("requestType.${toLowerCase(type)}");

  CUSTOM_TEXT_KEYS.forEach((key) => {
    standardKeys.add(`customTextLabel.${key}`);
    standardKeys.add(camelToDot(key));
  });
  deleteTemplateStringsKey("customTextLabel.${key}");
  deleteTemplateStringsKey("${camelToDot(key)}");

  INFO_TEXT_KEYS.forEach((key) => {
    standardKeys.add(`header.info.${key}.label`);
    standardKeys.add(`header.info.${key}.message`);
  });
  deleteTemplateStringsKey("header.info.${key}.label");
  deleteTemplateStringsKey("header.info.${key}.message");

  PRIMITIVE_TYPES.forEach((type) => {
    standardKeys.add(`primitiveTypeName.${type}`);
  });
  deleteTemplateStringsKey("primitiveTypeName.${val}");

  const adminColNames: Record<string, Record<string, readonly string[]>> = {
    general: {
      roles: adminGeneralRolesColNames,
    },
    teachers: {
      teachers: adminTeachersTeachersColNames,
      positions: adminTeachersPositionsColNames,
      services: adminTeachersServicesColNames,
      serviceModifications: adminTeachersServiceModificationsColNames,
      serviceModificationTypes: adminTeachersServiceModificationTypesColNames,
      messages: adminTeachersMessagesColNames,
    },
    courses: {
      degrees: adminCoursesDegreesColNames,
      programs: adminCoursesProgramsColNames,
      tracks: adminCoursesTracksColNames,
      terms: adminCoursesTermsColNames,
      courses: adminCoursesCoursesColNames,
      courseTypes: adminCoursesCourseTypesColNames,
    },
    requests: {
      requests: adminRequestsRequestsColNames,
      priorities: adminRequestsPrioritiesColNames,
    },
    coordinations: {
      programs: adminCoordinationsProgramsColNames,
      tracks: adminCoordinationsTracksColNames,
      courses: adminCoordinationsCoursesColNames,
    },
  };

  Object.entries(adminColNames).forEach(([section, names]) => {
    Object.entries(names).forEach(([name, colNames]) => {
      const keyPrefix = `admin.${section}.${name}`;
      colNames.forEach((colName) => {
        standardKeys.add(`${keyPrefix}.column.${colName}.label`);
        standardKeys.add(`${keyPrefix}.column.${colName}.tooltip`);
      });
      standardKeys.add(`${keyPrefix}.form.title`);
      standardKeys.add(`${keyPrefix}.data.success.insert`);
      standardKeys.add(`${keyPrefix}.data.success.update`);
      standardKeys.add(`${keyPrefix}.data.success.delete`);
      standardKeys.add(`${keyPrefix}.data.success.import`);
      standardKeys.add(`${keyPrefix}.data.success.export`);
      standardKeys.add(`${keyPrefix}.data.confirm.delete`);
    });
  });
  deleteTemplateStringsKey("${keyPrefix}.column.${key}.label");
  deleteTemplateStringsKey("${keyPrefix}.column.${key}.tooltip");
  deleteTemplateStringsKey("${keyPrefix}.column.${name}.label");
  deleteTemplateStringsKey("${keyPrefix}.column.${name}.tooltip");
  deleteTemplateStringsKey("${keyPrefix}.form.title");
  deleteTemplateStringsKey("${keyPrefix}.data.success.insert");
  deleteTemplateStringsKey("${keyPrefix}.data.success.update");
  deleteTemplateStringsKey("${keyPrefix}.data.success.delete");
  deleteTemplateStringsKey("${keyPrefix}.data.success.import");
  deleteTemplateStringsKey("${keyPrefix}.data.success.export");
  deleteTemplateStringsKey("${keyPrefix}.data.confirm.delete");

  expect(
    Array.from(templateStringsKeys),
    "Found unexpected template string keys",
  ).toEqual([]);

  expect(Array.from(nonStringKeys), "Found unexpected non-string keys").toEqual(
    [],
  );

  expect(
    Array.from(failedDeletes),
    "Failed to delete expected template string keys",
  ).toEqual([]);

  return [...standardKeys];
};
