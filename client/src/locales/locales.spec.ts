import * as fs from "fs/promises";
import { glob } from "glob";
import { describe, expect, it } from "vitest";

import en from "./en";
import fr from "./fr";
import { PRIMITIVE_TYPE_NAMES } from "@/config/constants.ts";
import { CUSTOM_TEXTS } from "@/config/custom-texts.ts";
import {
  LocaleEnum,
  PhaseEnum,
  RequestTypeEnum,
  RoleEnum,
} from "@/gql/graphql.ts";
import type { SimpleObject } from "@/types/data.ts";
import { toLowerCase } from "@/utils";

import { adminCoordinationsCoursesColNames } from "@/components/admin/AdminCoordinationsCourses.vue";
import { adminCoordinationsProgramsColNames } from "@/components/admin/AdminCoordinationsPrograms.vue";
import { adminCoordinationsTracksColNames } from "@/components/admin/AdminCoordinationsTracks.vue";
import { adminCoursesCourseTypesColNames } from "@/components/admin/AdminCoursesCourseTypes.vue";
import { adminCoursesCoursesColNames } from "@/components/admin/AdminCoursesCourses.vue";
import { adminCoursesDegreesColNames } from "@/components/admin/AdminCoursesDegrees.vue";
import { adminCoursesProgramsColNames } from "@/components/admin/AdminCoursesPrograms.vue";
import { adminCoursesTermsColNames } from "@/components/admin/AdminCoursesTerms.vue";
import { adminCoursesTracksColNames } from "@/components/admin/AdminCoursesTracks.vue";
import { adminRequestsPrioritiesColNames } from "@/components/admin/AdminRequestsPriorities.vue";
import { adminRequestsRequestsColNames } from "@/components/admin/AdminRequestsRequests.vue";
import { adminServicesExternalCoursesColNames } from "@/components/admin/AdminServicesExternalCourses.vue";
import { adminServicesMessagesColNames } from "@/components/admin/AdminServicesMessages.vue";
import { adminServicesServiceModificationsColNames } from "@/components/admin/AdminServicesServiceModifications.vue";
import { adminServicesServicesColNames } from "@/components/admin/AdminServicesServices.vue";
import { adminTeachersPositionsColNames } from "@/components/admin/AdminTeachersPositions.vue";
import { adminTeachersRolesColNames } from "@/components/admin/AdminTeachersRoles.vue";
import { adminTeachersTeachersColNames } from "@/components/admin/AdminTeachersTeachers.vue";
import { INFO_TEXT_KEYS } from "@/components/header/MenuInfo.vue";

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
  const templateStringKeys = new Set<string>();
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
        templateStringKeys.add(match[1]);
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

  const deleteTemplateStringKey = (key: string) => {
    if (!templateStringKeys.delete(key)) {
      failedDeletes.add(key);
    }
  };
  const deleteNonStringKey = (key: string) => {
    if (!nonStringKeys.delete(key)) {
      failedDeletes.add(key);
    }
  };

  Object.values(PhaseEnum).forEach((phase) => {
    standardKeys.add(`phase.${toLowerCase(phase)}`);
    standardKeys.add(`home.subtitle.${toLowerCase(phase)}`);
    standardKeys.add(`home.message.${toLowerCase(phase)}`);
  });
  deleteTemplateStringKey("phase.${toLowerCase(phase)}");

  Object.values(RoleEnum).forEach((role) => {
    standardKeys.add(`role.${toLowerCase(role)}`);
  });
  deleteTemplateStringKey("role.${toLowerCase(val)}");
  deleteTemplateStringKey("role.${toLowerCase(role)}");

  Object.values(RequestTypeEnum).forEach((type) => {
    standardKeys.add(`requestType.${toLowerCase(type)}`);
  });
  deleteTemplateStringKey("requestType.${toLowerCase(val)}");
  deleteTemplateStringKey("requestType.${toLowerCase(value)}");

  CUSTOM_TEXTS.forEach(({ key, defaultKey }) => {
    standardKeys.add(`customTextLabel.${key}`);
    standardKeys.add(defaultKey);
  });
  deleteTemplateStringKey("customTextLabel.${key}");
  deleteNonStringKey("text.defaultKey");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  INFO_TEXT_KEYS.forEach((key) => {
    standardKeys.add(`header.info.${key}.label`);
    standardKeys.add(`header.info.${key}.message`);
  });
  deleteTemplateStringKey("header.info.${key}.label");
  deleteTemplateStringKey("header.info.${key}.message");

  PRIMITIVE_TYPE_NAMES.forEach((typeName) => {
    standardKeys.add(`primitiveTypeName.${typeName}`);
  });
  deleteTemplateStringKey("primitiveTypeName.${val}");

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const adminColNames: Record<string, Record<string, readonly string[]>> = {
    teachers: {
      teachers: adminTeachersTeachersColNames,
      positions: adminTeachersPositionsColNames,
      roles: adminTeachersRolesColNames,
    },
    services: {
      services: adminServicesServicesColNames,
      serviceModifications: adminServicesServiceModificationsColNames,
      externalCourses: adminServicesExternalCoursesColNames,
      messages: adminServicesMessagesColNames,
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
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */

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
  deleteTemplateStringKey("${keyPrefix}.column.${key}.label");
  deleteTemplateStringKey("${keyPrefix}.column.${key}.tooltip");
  deleteTemplateStringKey("${keyPrefix}.column.${name}.label");
  deleteTemplateStringKey("${keyPrefix}.column.${name}.tooltip");
  deleteTemplateStringKey("${keyPrefix}.form.title");
  deleteTemplateStringKey("${keyPrefix}.data.success.insert");
  deleteTemplateStringKey("${keyPrefix}.data.success.update");
  deleteTemplateStringKey("${keyPrefix}.data.success.delete");
  deleteTemplateStringKey("${keyPrefix}.data.success.import");
  deleteTemplateStringKey("${keyPrefix}.data.success.export");
  deleteTemplateStringKey("${keyPrefix}.data.confirm.delete");

  expect(
    Array.from(templateStringKeys),
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
