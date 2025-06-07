import * as fs from "fs/promises";
import { glob } from "glob";

import en from "./en";
import fr from "./fr";
import { CUSTOM_TEXT_KEYS } from "@/config/custom-text-keys.ts";
import { PRIMITIVE_TYPES } from "@/config/primitive-types.ts";
import type { SimpleObject } from "@/types/data.ts";

import type { ColName as AdminCoursesCourseTypesColName } from "@/components/admin/AdminCoursesCourseTypes.vue";
import type { ColName as AdminCoursesCoursesColName } from "@/components/admin/AdminCoursesCourses.vue";
import type { ColName as AdminCoursesDegreesColName } from "@/components/admin/AdminCoursesDegrees.vue";
import type { ColName as AdminCoursesProgramsColName } from "@/components/admin/AdminCoursesPrograms.vue";
import type { ColName as AdminCoursesTracksColName } from "@/components/admin/AdminCoursesTracks.vue";
import type { ColName as AdminRolesRolesColName } from "@/components/admin/AdminGeneralRoles.vue";
import type { ColName as AdminRequestsPrioritiesColNames } from "@/components/admin/AdminRequestsPriorities.vue";
import type { ColName as AdminRequestsRequestsColNames } from "@/components/admin/AdminRequestsRequests.vue";
import type { ColName as AdminTeachersMessagesColNames } from "@/components/admin/AdminTeachersMessages.vue";
import type { ColName as AdminTeachersPositionsColNames } from "@/components/admin/AdminTeachersPositions.vue";
import type { ColName as AdminTeachersServiceModificationTypesColNames } from "@/components/admin/AdminTeachersServiceModificationTypes.vue";
import type { ColName as AdminTeachersServiceModificationsColNames } from "@/components/admin/AdminTeachersServiceModifications.vue";
import type { ColName as AdminTeachersServicesColNames } from "@/components/admin/AdminTeachersServices.vue";
import type { ColName as AdminTeachersTeachersColNames } from "@/components/admin/AdminTeachersTeachers.vue";

const locales = [
  { label: "fr-FR", messages: fr },
  { label: "en-US", messages: en },
];

async function main() {
  const keysInFiles = await findKeysInFiles();

  locales.forEach((locale) => {
    console.log(`Validating translations for locale ${locale.label}...`);
    validateTranslations(locale.messages, keysInFiles);
  });
}

const flattenObject = (obj: SimpleObject<string>, prefix = ""): string[] =>
  Object.keys(obj).flatMap((key) =>
    typeof obj[key] === "object"
      ? flattenObject(obj[key], prefix + key + ".")
      : [prefix + key],
  );

const validateTranslations = (obj: SimpleObject<string>, keys: string[]) => {
  const definedKeys = flattenObject(obj);

  const missingKeys = keys.filter((key) => !definedKeys.includes(key));

  if (missingKeys.length > 0) {
    console.error(`* MISSING TRANSLATION KEYS:
  - ${missingKeys.join("\n  - ")}`);
  } else {
    console.log("* All used keys are defined in the locale file");
  }

  const unusedKeys = definedKeys.filter((key) => !keys.includes(key));

  if (unusedKeys.length > 0) {
    console.warn(`* UNUSED TRANSLATION KEYS:
  - ${unusedKeys.join("\n  - ")}`);
  } else {
    console.log("* All defined keys are used in the code");
  }
};

const findKeysInFiles = async (): Promise<string[]> => {
  // Find all .vue and .ts files in src directory
  const files = await glob("src/**/*.{vue,ts}");

  // Regex to find all t calls
  const regexAllTCalls = /[^a-zA-Z]t\([^)]*\)/g;

  // Regex for standard patterns
  const regexSingleQuotes = /[^a-zA-Z]t\([\s\n]*'([a-zA-Z.]*)'/g;
  const regexDoubleQuotes = /[^a-zA-Z]t\([\s\n]*"([a-zA-Z.]*)"/g;
  const regexTemplateStrings = /[^a-zA-Z]t\([\s\n]*`([a-zA-Z.${}]*)`/g;

  const standardKeys = new Set<string>();
  const nonStandardKeys = new Set<string>();
  const templateStringsKeys = new Set<string>();

  // Process each file
  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    let allMatch: RegExpExecArray | null;

    // Reset regex before use
    regexAllTCalls.lastIndex = 0;

    // Find all t calls
    while ((allMatch = regexAllTCalls.exec(content)) !== null) {
      const fullCall = allMatch[0];

      // Check single quotes
      regexSingleQuotes.lastIndex = 0;
      const singleQuoteMatch = regexSingleQuotes.exec(fullCall);
      if (singleQuoteMatch?.[1]) {
        standardKeys.add(singleQuoteMatch[1]);
        continue;
      }

      // Check double quotes
      regexDoubleQuotes.lastIndex = 0;
      const doubleQuoteMatch = regexDoubleQuotes.exec(fullCall);
      if (doubleQuoteMatch?.[1]) {
        standardKeys.add(doubleQuoteMatch[1]);
        continue;
      }

      // Check template strings
      regexTemplateStrings.lastIndex = 0;
      const templateMatch = regexTemplateStrings.exec(fullCall);
      if (templateMatch?.[1]) {
        templateStringsKeys.add(templateMatch[1]);
        continue;
      }

      nonStandardKeys.add(fullCall);
    }
  }

  if (nonStandardKeys.size > 0) {
    console.error(`Found ${nonStandardKeys.size} non-standard keys:
  - ${Array.from(nonStandardKeys).join("\n  - ")}`);
  }

  // Manually add template string keys

  CUSTOM_TEXT_KEYS.forEach((key) => {
    standardKeys.add(`customTextLabel.${key}`);
  });
  templateStringsKeys.delete("customTextLabel.${key}");

  PRIMITIVE_TYPES.forEach((type) => {
    standardKeys.add(`primitiveTypeName.${type}`);
  });
  templateStringsKeys.delete("primitiveTypeName.${type}");

  const adminColNames: Record<string, Record<string, string[]>> = {
    general: {
      roles: [
        "teacherEmail",
        "type",
        "comment",
      ] satisfies AdminRolesRolesColName[],
    },
    teachers: {
      teachers: [
        "email",
        "firstname",
        "lastname",
        "alias",
        "positionLabel",
        "baseServiceHours",
        "visible",
        "active",
      ] satisfies AdminTeachersTeachersColNames[],
      positions: [
        "label",
        "description",
        "baseServiceHours",
      ] satisfies AdminTeachersPositionsColNames[],
      services: [
        "year",
        "teacherEmail",
        "hours",
      ] satisfies AdminTeachersServicesColNames[],
      serviceModifications: [
        "year",
        "teacherEmail",
        "typeLabel",
        "hours",
      ] satisfies AdminTeachersServiceModificationsColNames[],
      serviceModificationTypes: [
        "label",
        "description",
      ] satisfies AdminTeachersServiceModificationTypesColNames[],
      messages: [
        "year",
        "teacherEmail",
        "content",
      ] satisfies AdminTeachersMessagesColNames[],
    },
    courses: {
      degrees: [
        "name",
        "nameShort",
        "visible",
      ] satisfies AdminCoursesDegreesColName[],
      programs: [
        "degreeName",
        "name",
        "nameShort",
        "visible",
      ] satisfies AdminCoursesProgramsColName[],
      tracks: [
        "degreeName",
        "programName",
        "name",
        "nameShort",
        "visible",
      ] satisfies AdminCoursesTracksColName[],
      courses: [
        "year",
        "degreeName",
        "programName",
        "trackName",
        "name",
        "nameShort",
        "semester",
        "typeLabel",
        "hours",
        "hoursAdjusted",
        "groups",
        "groupsAdjusted",
        "description",
        "priorityRule",
        "visible",
      ] satisfies AdminCoursesCoursesColName[],
      courseTypes: [
        "label",
        "coefficient",
        "description",
      ] satisfies AdminCoursesCourseTypesColName[],
    },
    requests: {
      requests: [
        "year",
        "teacherEmail",
        "degreeName",
        "programName",
        "trackName",
        "courseName",
        "courseSemester",
        "courseType",
        "type",
        "hours",
      ] satisfies AdminRequestsRequestsColNames[],
      priorities: [
        "year",
        "teacherEmail",
        "degreeName",
        "programName",
        "trackName",
        "courseName",
        "courseSemester",
        "courseType",
        "seniority",
        "isPriority",
        "computed",
      ] satisfies AdminRequestsPrioritiesColNames[],
    },
  };

  Object.entries(adminColNames).forEach(([section, names]) => {
    Object.entries(names).forEach(([name, colNames]) => {
      const keyPrefix = `admin.${section}.${name}`;
      colNames.forEach((colName) => {
        standardKeys.add(`${keyPrefix}.column.${colName}.label`);
        standardKeys.add(`${keyPrefix}.column.${colName}.tooltip`);
      });
      standardKeys.add(`${keyPrefix}.form.title.none`);
      standardKeys.add(`${keyPrefix}.form.title.single`);
      standardKeys.add(`${keyPrefix}.form.title.multiple`);
      standardKeys.add(`${keyPrefix}.data.success.insert`);
      standardKeys.add(`${keyPrefix}.data.success.update`);
      standardKeys.add(`${keyPrefix}.data.success.delete`);
      standardKeys.add(`${keyPrefix}.data.success.import`);
      standardKeys.add(`${keyPrefix}.data.success.export`);
      standardKeys.add(`${keyPrefix}.data.confirm.delete.single`);
      standardKeys.add(`${keyPrefix}.data.confirm.delete.multiple`);
      templateStringsKeys.delete("${keyPrefix}.column.${key}.label");
      templateStringsKeys.delete("${keyPrefix}.column.${key}.tooltip");
      templateStringsKeys.delete("${keyPrefix}.column.${name}.label");
      templateStringsKeys.delete("${keyPrefix}.column.${name}.tooltip");
      templateStringsKeys.delete("${keyPrefix}.form.title.none");
      templateStringsKeys.delete("${keyPrefix}.form.title.single");
      templateStringsKeys.delete("${keyPrefix}.form.title.multiple");
      templateStringsKeys.delete("${keyPrefix}.data.success.insert");
      templateStringsKeys.delete("${keyPrefix}.data.success.update");
      templateStringsKeys.delete("${keyPrefix}.data.success.delete");
      templateStringsKeys.delete("${keyPrefix}.data.success.import");
      templateStringsKeys.delete("${keyPrefix}.data.success.export");
      templateStringsKeys.delete("${keyPrefix}.export.invalid.message");
      templateStringsKeys.delete("${keyPrefix}.data.confirm.delete.single");
      templateStringsKeys.delete("${keyPrefix}.data.confirm.delete.multiple");
    });
  });

  if (templateStringsKeys.size > 0) {
    console.warn(
      `Found ${templateStringsKeys.size} template string keys (to be checked manually):
  - ${Array.from(templateStringsKeys).join("\n  - ")}`,
    );
  }

  return [...standardKeys];
};

await main();
