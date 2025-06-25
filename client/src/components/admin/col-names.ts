export const adminCoordinationsProgramsColNames = [
  "teacherEmail",
  "degreeName",
  "programName",
  "comment",
] as const;
export type AdminCoordinationsProgramsColNames =
  (typeof adminCoordinationsProgramsColNames)[number];

export const adminCoordinationsTracksColNames = [
  "teacherEmail",
  "degreeName",
  "programName",
  "trackName",
  "comment",
] as const;
export type AdminCoordinationsTracksColNames =
  (typeof adminCoordinationsTracksColNames)[number];

export const adminCoordinationsCoursesColNames = [
  "year",
  "teacherEmail",
  "degreeName",
  "programName",
  "trackName",
  "courseName",
  "courseSemester",
  "courseType",
  "comment",
] as const;
export type AdminCoordinationsCoursesColNames =
  (typeof adminCoordinationsCoursesColNames)[number];

export const adminCoursesCoursesColNames = [
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
] as const;
export type AdminCoursesCoursesColName =
  (typeof adminCoursesCoursesColNames)[number];

export const adminCoursesCourseTypesColNames = [
  "label",
  "coefficient",
  "description",
] as const;
export type AdminCoursesCourseTypesColName =
  (typeof adminCoursesCourseTypesColNames)[number];

export const adminCoursesDegreesColNames = [
  "name",
  "nameShort",
  "visible",
] as const;
export type AdminCoursesDegreesColName =
  (typeof adminCoursesDegreesColNames)[number];

export const adminCoursesProgramsColNames = [
  "degreeName",
  "name",
  "nameShort",
  "visible",
] as const;
export type AdminCoursesProgramsColName =
  (typeof adminCoursesProgramsColNames)[number];

export const adminCoursesTracksColNames = [
  "degreeName",
  "programName",
  "name",
  "nameShort",
  "visible",
] as const;
export type AdminCoursesTracksColName =
  (typeof adminCoursesTracksColNames)[number];

export const adminGeneralRolesColNames = [
  "teacherEmail",
  "role",
  "comment",
] as const;
export type AdminGeneralRolesColName =
  (typeof adminGeneralRolesColNames)[number];

export const adminRequestsPrioritiesColNames = [
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
] as const;
export type AdminRequestsPrioritiesColName =
  (typeof adminRequestsPrioritiesColNames)[number];

export const adminRequestsRequestsColNames = [
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
] as const;
export type AdminRequestsRequestsColName =
  (typeof adminRequestsRequestsColNames)[number];

export const adminTeachersMessagesColNames = [
  "year",
  "teacherEmail",
  "content",
] as const;
export type AdminTeachersMessagesColName =
  (typeof adminTeachersMessagesColNames)[number];

export const adminTeachersPositionsColNames = [
  "label",
  "description",
  "baseServiceHours",
] as const;
export type AdminTeachersPositionsColName =
  (typeof adminTeachersPositionsColNames)[number];

export const adminTeachersServiceModificationsColNames = [
  "year",
  "teacherEmail",
  "typeLabel",
  "hours",
] as const;
export type AdminTeachersServiceModificationsColName =
  (typeof adminTeachersServiceModificationsColNames)[number];

export const adminTeachersServiceModificationTypesColNames = [
  "label",
  "description",
] as const;
export type AdminTeachersServiceModificationTypesColName =
  (typeof adminTeachersServiceModificationTypesColNames)[number];

export const adminTeachersServicesColNames = [
  "year",
  "teacherEmail",
  "hours",
] as const;
export type AdminTeachersServicesColName =
  (typeof adminTeachersServicesColNames)[number];

export const adminTeachersTeachersColNames = [
  "email",
  "firstname",
  "lastname",
  "alias",
  "positionLabel",
  "baseServiceHours",
  "visible",
  "active",
  "access",
] as const;
export type AdminTeachersTeachersColName =
  (typeof adminTeachersTeachersColNames)[number];
