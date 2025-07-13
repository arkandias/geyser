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

export const adminTeachersPositionsColNames = [
  "label",
  "labelShort",
  "description",
  "baseServiceHours",
] as const;
export type AdminTeachersPositionsColName =
  (typeof adminTeachersPositionsColNames)[number];

export const adminTeachersRolesColNames = [
  "teacherEmail",
  "role",
  "comment",
] as const;
export type AdminTeachersRolesColName =
  (typeof adminTeachersRolesColNames)[number];

export const adminServicesServicesColNames = [
  "year",
  "teacherEmail",
  "positionLabel",
  "hours",
] as const;
export type AdminServicesServicesColName =
  (typeof adminServicesServicesColNames)[number];

export const adminServicesServiceModificationsColNames = [
  "year",
  "teacherEmail",
  "label",
  "hours",
] as const;
export type AdminServicesServiceModificationsColName =
  (typeof adminServicesServiceModificationsColNames)[number];

export const adminServicesExternalCoursesColNames = [
  "year",
  "teacherEmail",
  "label",
  "hours",
] as const;
export type AdminServicesExternalCoursesColName =
  (typeof adminServicesExternalCoursesColNames)[number];

export const adminServicesMessagesColNames = [
  "year",
  "teacherEmail",
  "content",
] as const;
export type AdminServicesMessagesColName =
  (typeof adminServicesMessagesColNames)[number];

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

export const adminCoursesTermsColNames = ["label", "description"] as const;
export type AdminCoursesTermsColName =
  (typeof adminCoursesTermsColNames)[number];

export const adminCoursesCoursesColNames = [
  "year",
  "degreeName",
  "programName",
  "trackName",
  "termLabel",
  "name",
  "nameShort",
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

export const adminRequestsRequestsColNames = [
  "year",
  "teacherEmail",
  "degreeName",
  "programName",
  "trackName",
  "termLabel",
  "courseName",
  "courseTypeLabel",
  "type",
  "hours",
] as const;
export type AdminRequestsRequestsColName =
  (typeof adminRequestsRequestsColNames)[number];

export const adminRequestsPrioritiesColNames = [
  "year",
  "teacherEmail",
  "degreeName",
  "programName",
  "trackName",
  "termLabel",
  "courseName",
  "courseTypeLabel",
  "seniority",
  "isPriority",
  "computed",
] as const;
export type AdminRequestsPrioritiesColName =
  (typeof adminRequestsPrioritiesColNames)[number];

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
  "termLabel",
  "courseName",
  "courseTypeLabel",
  "comment",
] as const;
export type AdminCoordinationsCoursesColNames =
  (typeof adminCoordinationsCoursesColNames)[number];
