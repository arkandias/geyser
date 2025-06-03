/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) and, if it has a timezone, [RFC
   * 3339](https://datatracker.ietf.org/doc/html/rfc3339) standards. Input values
   * that do not conform to both ISO 8601 and RFC 3339 may be coerced, which may lead
   * to unexpected results.
   */
  Datetime: { input: any; output: any; }
};

/** All input for the `addTimestampColumns` mutation. */
export type AddTimestampColumnsInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  pTable?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `addTimestampColumns` mutation. */
export type AddTimestampColumnsPayload = {
  __typename?: 'AddTimestampColumnsPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `addTimestampColumnsToAllTables` mutation. */
export type AddTimestampColumnsToAllTablesInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `addTimestampColumnsToAllTables` mutation. */
export type AddTimestampColumnsToAllTablesPayload = {
  __typename?: 'AddTimestampColumnsToAllTablesPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** Application settings (e.g., custom UI parameters) */
export type AppSetting = Node & {
  __typename?: 'AppSetting';
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Text identifier */
  key: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Text content */
  value?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `AppSetting` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AppSettingCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `value` field. */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `AppSetting` */
export type AppSettingInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Text identifier */
  key: Scalars['String']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Text content */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `AppSetting`. Fields that are set will be updated. */
export type AppSettingPatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Text identifier */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Text content */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `AppSetting`. */
export enum AppSettingsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC'
}

/** All input for the `computeServicePriorities` mutation. */
export type ComputeServicePrioritiesInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  serviceRow?: InputMaybe<ServiceInput>;
};

/** The output of our `computeServicePriorities` mutation. */
export type ComputeServicePrioritiesPayload = {
  __typename?: 'ComputeServicePrioritiesPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  priorities?: Maybe<Array<Maybe<Priority>>>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `computeYearPriorities` mutation. */
export type ComputeYearPrioritiesInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  pYear?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `computeYearPriorities` mutation. */
export type ComputeYearPrioritiesPayload = {
  __typename?: 'ComputeYearPrioritiesPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  priorities?: Maybe<Array<Maybe<Priority>>>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** Academic coordination assignments at program, track, or course level */
export type Coordination = Node & {
  __typename?: 'Coordination';
  /** Additional coordination details */
  comment?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Course` that is related to this `Coordination`. */
  course?: Maybe<Course>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Unique coordination identifier */
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Program` that is related to this `Coordination`. */
  program?: Maybe<Program>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Teacher` that is related to this `Coordination`. */
  teacher: Teacher;
  /** Reads a single `Track` that is related to this `Coordination`. */
  track?: Maybe<Track>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** Coordinating teacher */
  uid: Scalars['String']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `Coordination` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CoordinationCondition = {
  /** Checks for equality with the object’s `comment` field. */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `courseId` field. */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `programId` field. */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `trackId` field. */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `uid` field. */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `Coordination` */
export type CoordinationInput = {
  /** Additional coordination details */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Coordinating teacher */
  uid: Scalars['String']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Represents an update to a `Coordination`. Fields that are set will be updated. */
export type CoordinationPatch = {
  /** Additional coordination details */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Coordinating teacher */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Coordination`. */
export enum CoordinationsOrderBy {
  CommentAsc = 'COMMENT_ASC',
  CommentDesc = 'COMMENT_DESC',
  CourseIdAsc = 'COURSE_ID_ASC',
  CourseIdDesc = 'COURSE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProgramIdAsc = 'PROGRAM_ID_ASC',
  ProgramIdDesc = 'PROGRAM_ID_DESC',
  TrackIdAsc = 'TRACK_ID_ASC',
  TrackIdDesc = 'TRACK_ID_DESC',
  UidAsc = 'UID_ASC',
  UidDesc = 'UID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** All input for the `copyYearCourses` mutation. */
export type CopyYearCoursesInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  pYear?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `copyYearCourses` mutation. */
export type CopyYearCoursesPayload = {
  __typename?: 'CopyYearCoursesPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  courses?: Maybe<Array<Maybe<Course>>>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** Detailed course definitions and configurations */
export type Course = Node & {
  __typename?: 'Course';
  /** Reads and enables pagination through a set of `Coordination`. */
  coordinations: Array<Coordination>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Computed study year (1-3) based on semester */
  cycleYear: Scalars['Int']['output'];
  /** Course description */
  description?: Maybe<Scalars['String']['output']>;
  /** Standard number of student groups */
  groups: Scalars['Int']['output'];
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Int']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Int']['output']>;
  /** Standard teaching hours per group */
  hours: Scalars['Float']['output'];
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Int']['output']>;
  /** Unique course identifier */
  id: Scalars['Int']['output'];
  /** Full course name */
  name: Scalars['String']['output'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated course name */
  nameShort?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Priority`. */
  prioritiesByYearValueAndCourseId: Array<Priority>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Program` that is related to this `Course`. */
  program: Program;
  /** Program offering this course */
  programId: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `Request`. */
  requestsByYearValueAndCourseId: Array<Request>;
  /** Academic semester (1-6) */
  semester: Scalars['Int']['output'];
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Track` that is related to this `Course`. */
  trackProgram?: Maybe<Track>;
  /** Reads a single `CourseType` that is related to this `Course`. */
  type: CourseType;
  /** Reference to course delivery type affecting workload calculation */
  typeId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Controls course visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
  /** Reads a single `Year` that is related to this `Course`. */
  year: Year;
  /** Academic year when the course is offered */
  yearValue: Scalars['Int']['output'];
};


/** Detailed course definitions and configurations */
export type CourseCoordinationsArgs = {
  condition?: InputMaybe<CoordinationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationsOrderBy>>;
};


/** Detailed course definitions and configurations */
export type CoursePrioritiesByYearValueAndCourseIdArgs = {
  condition?: InputMaybe<PriorityCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PrioritiesOrderBy>>;
};


/** Detailed course definitions and configurations */
export type CourseRequestsByYearValueAndCourseIdArgs = {
  condition?: InputMaybe<RequestCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestsOrderBy>>;
};

/** A condition to be used against `Course` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CourseCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `cycleYear` field. */
  cycleYear?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `groups` field. */
  groups?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `groupsAdjusted` field. */
  groupsAdjusted?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `groupsEffective` field. */
  groupsEffective?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `hours` field. */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `hoursAdjusted` field. */
  hoursAdjusted?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `hoursEffective` field. */
  hoursEffective?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nameDisplay` field. */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nameShort` field. */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `priorityRule` field. */
  priorityRule?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `programId` field. */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `semester` field. */
  semester?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `trackId` field. */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `typeId` field. */
  typeId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `visible` field. */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `yearValue` field. */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Course` */
export type CourseInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<Scalars['Int']['input']>;
  /** Course description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Standard number of student groups */
  groups: Scalars['Int']['input'];
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<Scalars['Int']['input']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<Scalars['Int']['input']>;
  /** Standard teaching hours per group */
  hours: Scalars['Float']['input'];
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<Scalars['Float']['input']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<Scalars['Int']['input']>;
  /** Full course name */
  name: Scalars['String']['input'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated course name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<Scalars['Int']['input']>;
  /** Program offering this course */
  programId: Scalars['Int']['input'];
  /** Academic semester (1-6) */
  semester: Scalars['Int']['input'];
  /** Optional track specialization for this course */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId: Scalars['Int']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls course visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Academic year when the course is offered */
  yearValue: Scalars['Int']['input'];
};

/** Represents an update to a `Course`. Fields that are set will be updated. */
export type CoursePatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<Scalars['Int']['input']>;
  /** Course description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Standard number of student groups */
  groups?: InputMaybe<Scalars['Int']['input']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<Scalars['Int']['input']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<Scalars['Int']['input']>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<Scalars['Float']['input']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<Scalars['Int']['input']>;
  /** Full course name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated course name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<Scalars['Int']['input']>;
  /** Program offering this course */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<Scalars['Int']['input']>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls course visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Academic year when the course is offered */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

/** Types of course delivery with associated workload coefficients */
export type CourseType = Node & {
  __typename?: 'CourseType';
  /** Workload multiplier for service hour calculations */
  coefficient: Scalars['Float']['output'];
  /** Reads and enables pagination through a set of `Course`. */
  coursesByTypeId: Array<Course>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Description of the course type and its characteristics */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique course type identifier */
  id: Scalars['Int']['output'];
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
};


/** Types of course delivery with associated workload coefficients */
export type CourseTypeCoursesByTypeIdArgs = {
  condition?: InputMaybe<CourseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoursesOrderBy>>;
};

/**
 * A condition to be used against `CourseType` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CourseTypeCondition = {
  /** Checks for equality with the object’s `coefficient` field. */
  coefficient?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `label` field. */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `CourseType` */
export type CourseTypeInput = {
  /** Workload multiplier for service hour calculations */
  coefficient?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Description of the course type and its characteristics */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Represents an update to a `CourseType`. Fields that are set will be updated. */
export type CourseTypePatch = {
  /** Workload multiplier for service hour calculations */
  coefficient?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Description of the course type and its characteristics */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `CourseType`. */
export enum CourseTypesOrderBy {
  CoefficientAsc = 'COEFFICIENT_ASC',
  CoefficientDesc = 'COEFFICIENT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LabelAsc = 'LABEL_ASC',
  LabelDesc = 'LABEL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Methods to use when ordering `Course`. */
export enum CoursesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CycleYearAsc = 'CYCLE_YEAR_ASC',
  CycleYearDesc = 'CYCLE_YEAR_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  GroupsAdjustedAsc = 'GROUPS_ADJUSTED_ASC',
  GroupsAdjustedDesc = 'GROUPS_ADJUSTED_DESC',
  GroupsAsc = 'GROUPS_ASC',
  GroupsDesc = 'GROUPS_DESC',
  GroupsEffectiveAsc = 'GROUPS_EFFECTIVE_ASC',
  GroupsEffectiveDesc = 'GROUPS_EFFECTIVE_DESC',
  HoursAdjustedAsc = 'HOURS_ADJUSTED_ASC',
  HoursAdjustedDesc = 'HOURS_ADJUSTED_DESC',
  HoursAsc = 'HOURS_ASC',
  HoursDesc = 'HOURS_DESC',
  HoursEffectiveAsc = 'HOURS_EFFECTIVE_ASC',
  HoursEffectiveDesc = 'HOURS_EFFECTIVE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NameDisplayAsc = 'NAME_DISPLAY_ASC',
  NameDisplayDesc = 'NAME_DISPLAY_DESC',
  NameShortAsc = 'NAME_SHORT_ASC',
  NameShortDesc = 'NAME_SHORT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PriorityRuleAsc = 'PRIORITY_RULE_ASC',
  PriorityRuleDesc = 'PRIORITY_RULE_DESC',
  ProgramIdAsc = 'PROGRAM_ID_ASC',
  ProgramIdDesc = 'PROGRAM_ID_DESC',
  SemesterAsc = 'SEMESTER_ASC',
  SemesterDesc = 'SEMESTER_DESC',
  TrackIdAsc = 'TRACK_ID_ASC',
  TrackIdDesc = 'TRACK_ID_DESC',
  TypeIdAsc = 'TYPE_ID_ASC',
  TypeIdDesc = 'TYPE_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VisibleAsc = 'VISIBLE_ASC',
  VisibleDesc = 'VISIBLE_DESC',
  YearValueAsc = 'YEAR_VALUE_ASC',
  YearValueDesc = 'YEAR_VALUE_DESC'
}

/** All input for the create `AppSetting` mutation. */
export type CreateAppSettingInput = {
  /** The `AppSetting` to be created by this mutation. */
  appSetting: AppSettingInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AppSetting` mutation. */
export type CreateAppSettingPayload = {
  __typename?: 'CreateAppSettingPayload';
  /** The `AppSetting` that was created by this mutation. */
  appSetting?: Maybe<AppSetting>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Coordination` mutation. */
export type CreateCoordinationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Coordination` to be created by this mutation. */
  coordination: CoordinationInput;
};

/** The output of our create `Coordination` mutation. */
export type CreateCoordinationPayload = {
  __typename?: 'CreateCoordinationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Coordination` that was created by this mutation. */
  coordination?: Maybe<Coordination>;
  /** Reads a single `Course` that is related to this `Coordination`. */
  course?: Maybe<Course>;
  /** Reads a single `Program` that is related to this `Coordination`. */
  program?: Maybe<Program>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Teacher` that is related to this `Coordination`. */
  teacher: Teacher;
  /** Reads a single `Track` that is related to this `Coordination`. */
  track?: Maybe<Track>;
};

/** All input for the create `Course` mutation. */
export type CreateCourseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Course` to be created by this mutation. */
  course: CourseInput;
};

/** The output of our create `Course` mutation. */
export type CreateCoursePayload = {
  __typename?: 'CreateCoursePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Course` that was created by this mutation. */
  course?: Maybe<Course>;
  /** Reads a single `Program` that is related to this `Course`. */
  program: Program;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Track` that is related to this `Course`. */
  trackProgram?: Maybe<Track>;
  /** Reads a single `CourseType` that is related to this `Course`. */
  type: CourseType;
  /** Reads a single `Year` that is related to this `Course`. */
  year: Year;
};

/** All input for the create `CourseType` mutation. */
export type CreateCourseTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `CourseType` to be created by this mutation. */
  courseType: CourseTypeInput;
};

/** The output of our create `CourseType` mutation. */
export type CreateCourseTypePayload = {
  __typename?: 'CreateCourseTypePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CourseType` that was created by this mutation. */
  courseType?: Maybe<CourseType>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `CurrentPhase` mutation. */
export type CreateCurrentPhaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `CurrentPhase` to be created by this mutation. */
  currentPhase: CurrentPhaseInput;
};

/** The output of our create `CurrentPhase` mutation. */
export type CreateCurrentPhasePayload = {
  __typename?: 'CreateCurrentPhasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CurrentPhase` that was created by this mutation. */
  currentPhase?: Maybe<CurrentPhase>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Degree` mutation. */
export type CreateDegreeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Degree` to be created by this mutation. */
  degree: DegreeInput;
};

/** The output of our create `Degree` mutation. */
export type CreateDegreePayload = {
  __typename?: 'CreateDegreePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Degree` that was created by this mutation. */
  degree?: Maybe<Degree>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Position` mutation. */
export type CreatePositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Position` to be created by this mutation. */
  position: PositionInput;
};

/** The output of our create `Position` mutation. */
export type CreatePositionPayload = {
  __typename?: 'CreatePositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Position` that was created by this mutation. */
  position?: Maybe<Position>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Priority` mutation. */
export type CreatePriorityInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Priority` to be created by this mutation. */
  priority: PriorityInput;
};

/** The output of our create `Priority` mutation. */
export type CreatePriorityPayload = {
  __typename?: 'CreatePriorityPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Course` that is related to this `Priority`. */
  courseByYearValueAndCourseId: Course;
  /** The `Priority` that was created by this mutation. */
  priority?: Maybe<Priority>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Service` that is related to this `Priority`. */
  serviceByYearValueAndServiceId: Service;
  /** Reads a single `Year` that is related to this `Priority`. */
  year: Year;
};

/** All input for the create `Program` mutation. */
export type CreateProgramInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Program` to be created by this mutation. */
  program: ProgramInput;
};

/** The output of our create `Program` mutation. */
export type CreateProgramPayload = {
  __typename?: 'CreateProgramPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Degree` that is related to this `Program`. */
  degree: Degree;
  /** The `Program` that was created by this mutation. */
  program?: Maybe<Program>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Request` mutation. */
export type CreateRequestInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Request` to be created by this mutation. */
  request: RequestInput;
};

/** The output of our create `Request` mutation. */
export type CreateRequestPayload = {
  __typename?: 'CreateRequestPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Course` that is related to this `Request`. */
  courseByYearValueAndCourseId: Course;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Request` that was created by this mutation. */
  request?: Maybe<Request>;
  /** Reads a single `Service` that is related to this `Request`. */
  serviceByYearValueAndServiceId: Service;
  /** Reads a single `VService` that is related to this `Request`. */
  vServiceByServiceId: VService;
  /** Reads a single `Year` that is related to this `Request`. */
  year: Year;
};

/** All input for the create `Role` mutation. */
export type CreateRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Role` to be created by this mutation. */
  role: RoleInput;
};

/** The output of our create `Role` mutation. */
export type CreateRolePayload = {
  __typename?: 'CreateRolePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Role` that was created by this mutation. */
  role?: Maybe<Role>;
  /** Reads a single `Teacher` that is related to this `Role`. */
  teacher: Teacher;
};

/** All input for the create `Service` mutation. */
export type CreateServiceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Service` to be created by this mutation. */
  service: ServiceInput;
};

/** All input for the create `ServiceModification` mutation. */
export type CreateServiceModificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ServiceModification` to be created by this mutation. */
  serviceModification: ServiceModificationInput;
};

/** The output of our create `ServiceModification` mutation. */
export type CreateServiceModificationPayload = {
  __typename?: 'CreateServiceModificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Service` that is related to this `ServiceModification`. */
  service: Service;
  /** The `ServiceModification` that was created by this mutation. */
  serviceModification?: Maybe<ServiceModification>;
  /** Reads a single `ServiceModificationType` that is related to this `ServiceModification`. */
  type: ServiceModificationType;
};

/** All input for the create `ServiceModificationType` mutation. */
export type CreateServiceModificationTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ServiceModificationType` to be created by this mutation. */
  serviceModificationType: ServiceModificationTypeInput;
};

/** The output of our create `ServiceModificationType` mutation. */
export type CreateServiceModificationTypePayload = {
  __typename?: 'CreateServiceModificationTypePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ServiceModificationType` that was created by this mutation. */
  serviceModificationType?: Maybe<ServiceModificationType>;
};

/** The output of our create `Service` mutation. */
export type CreateServicePayload = {
  __typename?: 'CreateServicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Service` that was created by this mutation. */
  service?: Maybe<Service>;
  /** Reads a single `Teacher` that is related to this `Service`. */
  teacher: Teacher;
  /** Reads a single `Year` that is related to this `Service`. */
  year: Year;
};

/** All input for the create `Teacher` mutation. */
export type CreateTeacherInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Teacher` to be created by this mutation. */
  teacher: TeacherInput;
};

/** The output of our create `Teacher` mutation. */
export type CreateTeacherPayload = {
  __typename?: 'CreateTeacherPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Position` that is related to this `Teacher`. */
  position?: Maybe<Position>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Teacher` that was created by this mutation. */
  teacher?: Maybe<Teacher>;
};

/** All input for the `createTeacherService` mutation. */
export type CreateTeacherServiceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  pUid?: InputMaybe<Scalars['String']['input']>;
  pYear?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `createTeacherService` mutation. */
export type CreateTeacherServicePayload = {
  __typename?: 'CreateTeacherServicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  services?: Maybe<Array<Maybe<Service>>>;
};

/** All input for the create `Track` mutation. */
export type CreateTrackInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Track` to be created by this mutation. */
  track: TrackInput;
};

/** The output of our create `Track` mutation. */
export type CreateTrackPayload = {
  __typename?: 'CreateTrackPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Program` that is related to this `Track`. */
  program: Program;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Track` that was created by this mutation. */
  track?: Maybe<Track>;
};

/** All input for the create `VService` mutation. */
export type CreateVServiceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `VService` to be created by this mutation. */
  vService: VServiceInput;
};

/** The output of our create `VService` mutation. */
export type CreateVServicePayload = {
  __typename?: 'CreateVServicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `VService` that was created by this mutation. */
  vService?: Maybe<VService>;
  /** Reads a single `VTeacher` that is related to this `VService`. */
  vTeacherByUid: VTeacher;
  /** Reads a single `Year` that is related to this `VService`. */
  year: Year;
};

/** All input for the create `VTeacher` mutation. */
export type CreateVTeacherInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `VTeacher` to be created by this mutation. */
  vTeacher: VTeacherInput;
};

/** The output of our create `VTeacher` mutation. */
export type CreateVTeacherPayload = {
  __typename?: 'CreateVTeacherPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `VTeacher` that was created by this mutation. */
  vTeacher?: Maybe<VTeacher>;
};

/** All input for the create `Year` mutation. */
export type CreateYearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Year` to be created by this mutation. */
  year: YearInput;
};

/** The output of our create `Year` mutation. */
export type CreateYearPayload = {
  __typename?: 'CreateYearPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Year` that was created by this mutation. */
  year?: Maybe<Year>;
};

/** All input for the `createYearServices` mutation. */
export type CreateYearServicesInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  pYear?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our `createYearServices` mutation. */
export type CreateYearServicesPayload = {
  __typename?: 'CreateYearServicesPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  services?: Maybe<Array<Maybe<Service>>>;
};

/** Singleton table that stores the active system phase reference */
export type CurrentPhase = Node & {
  __typename?: 'CurrentPhase';
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Primary key with constraint to ensure only one record exists */
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Reference to the currently active phase identifier */
  value?: Maybe<PhaseEnum>;
};

/**
 * A condition to be used against `CurrentPhase` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CurrentPhaseCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `value` field. */
  value?: InputMaybe<PhaseEnum>;
};

/** An input for mutations affecting `CurrentPhase` */
export type CurrentPhaseInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Reference to the currently active phase identifier */
  value?: InputMaybe<PhaseEnum>;
};

/** Represents an update to a `CurrentPhase`. Fields that are set will be updated. */
export type CurrentPhasePatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Reference to the currently active phase identifier */
  value?: InputMaybe<PhaseEnum>;
};

/** Methods to use when ordering `CurrentPhase`. */
export enum CurrentPhasesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC'
}

/** Academic degrees offered by the institution */
export type Degree = Node & {
  __typename?: 'Degree';
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Unique degree identifier */
  id: Scalars['Int']['output'];
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name: Scalars['String']['output'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Program`. */
  programs: Array<Program>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Controls degree visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Academic degrees offered by the institution */
export type DegreeProgramsArgs = {
  condition?: InputMaybe<ProgramCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProgramsOrderBy>>;
};

/** A condition to be used against `Degree` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DegreeCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nameDisplay` field. */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nameShort` field. */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `visible` field. */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `Degree` */
export type DegreeInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name: Scalars['String']['input'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls degree visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents an update to a `Degree`. Fields that are set will be updated. */
export type DegreePatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls degree visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `Degree`. */
export enum DegreesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NameDisplayAsc = 'NAME_DISPLAY_ASC',
  NameDisplayDesc = 'NAME_DISPLAY_DESC',
  NameShortAsc = 'NAME_SHORT_ASC',
  NameShortDesc = 'NAME_SHORT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VisibleAsc = 'VISIBLE_ASC',
  VisibleDesc = 'VISIBLE_DESC'
}

/** All input for the `deleteAppSettingByNodeId` mutation. */
export type DeleteAppSettingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppSetting` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteAppSetting` mutation. */
export type DeleteAppSettingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Text identifier */
  key: Scalars['String']['input'];
};

/** The output of our delete `AppSetting` mutation. */
export type DeleteAppSettingPayload = {
  __typename?: 'DeleteAppSettingPayload';
  /** The `AppSetting` that was deleted by this mutation. */
  appSetting?: Maybe<AppSetting>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAppSettingNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteCoordinationByNodeId` mutation. */
export type DeleteCoordinationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Coordination` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteCoordinationByUidAndCourseIdAndTrackIdAndProgramId` mutation. */
export type DeleteCoordinationByUidAndCourseIdAndTrackIdAndProgramIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId: Scalars['Int']['input'];
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId: Scalars['Int']['input'];
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId: Scalars['Int']['input'];
  /** Coordinating teacher */
  uid: Scalars['String']['input'];
};

/** All input for the `deleteCoordination` mutation. */
export type DeleteCoordinationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique coordination identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Coordination` mutation. */
export type DeleteCoordinationPayload = {
  __typename?: 'DeleteCoordinationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Coordination` that was deleted by this mutation. */
  coordination?: Maybe<Coordination>;
  /** Reads a single `Course` that is related to this `Coordination`. */
  course?: Maybe<Course>;
  deletedCoordinationNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Program` that is related to this `Coordination`. */
  program?: Maybe<Program>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Teacher` that is related to this `Coordination`. */
  teacher: Teacher;
  /** Reads a single `Track` that is related to this `Coordination`. */
  track?: Maybe<Track>;
};

/** All input for the `deleteCourseByIdAndYearValue` mutation. */
export type DeleteCourseByIdAndYearValueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique course identifier */
  id: Scalars['Int']['input'];
  /** Academic year when the course is offered */
  yearValue: Scalars['Int']['input'];
};

/** All input for the `deleteCourseByNodeId` mutation. */
export type DeleteCourseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Course` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeId` mutation. */
export type DeleteCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Full course name */
  name: Scalars['String']['input'];
  /** Program offering this course */
  programId: Scalars['Int']['input'];
  /** Academic semester (1-6) */
  semester: Scalars['Int']['input'];
  /** Optional track specialization for this course */
  trackId: Scalars['Int']['input'];
  /** Reference to course delivery type affecting workload calculation */
  typeId: Scalars['Int']['input'];
  /** Academic year when the course is offered */
  yearValue: Scalars['Int']['input'];
};

/** All input for the `deleteCourse` mutation. */
export type DeleteCourseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique course identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Course` mutation. */
export type DeleteCoursePayload = {
  __typename?: 'DeleteCoursePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Course` that was deleted by this mutation. */
  course?: Maybe<Course>;
  deletedCourseNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Program` that is related to this `Course`. */
  program: Program;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Track` that is related to this `Course`. */
  trackProgram?: Maybe<Track>;
  /** Reads a single `CourseType` that is related to this `Course`. */
  type: CourseType;
  /** Reads a single `Year` that is related to this `Course`. */
  year: Year;
};

/** All input for the `deleteCourseTypeByLabel` mutation. */
export type DeleteCourseTypeByLabelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['input'];
};

/** All input for the `deleteCourseTypeByNodeId` mutation. */
export type DeleteCourseTypeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CourseType` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteCourseType` mutation. */
export type DeleteCourseTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique course type identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `CourseType` mutation. */
export type DeleteCourseTypePayload = {
  __typename?: 'DeleteCourseTypePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CourseType` that was deleted by this mutation. */
  courseType?: Maybe<CourseType>;
  deletedCourseTypeNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteCurrentPhaseByNodeId` mutation. */
export type DeleteCurrentPhaseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CurrentPhase` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteCurrentPhase` mutation. */
export type DeleteCurrentPhaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Primary key with constraint to ensure only one record exists */
  id: Scalars['Int']['input'];
};

/** The output of our delete `CurrentPhase` mutation. */
export type DeleteCurrentPhasePayload = {
  __typename?: 'DeleteCurrentPhasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CurrentPhase` that was deleted by this mutation. */
  currentPhase?: Maybe<CurrentPhase>;
  deletedCurrentPhaseNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteDegreeByName` mutation. */
export type DeleteDegreeByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name: Scalars['String']['input'];
};

/** All input for the `deleteDegreeByNodeId` mutation. */
export type DeleteDegreeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Degree` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteDegree` mutation. */
export type DeleteDegreeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique degree identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Degree` mutation. */
export type DeleteDegreePayload = {
  __typename?: 'DeleteDegreePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Degree` that was deleted by this mutation. */
  degree?: Maybe<Degree>;
  deletedDegreeNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deletePositionByLabel` mutation. */
export type DeletePositionByLabelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable position name for display purposes, unique */
  label: Scalars['String']['input'];
};

/** All input for the `deletePositionByNodeId` mutation. */
export type DeletePositionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Position` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePosition` mutation. */
export type DeletePositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique position identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Position` mutation. */
export type DeletePositionPayload = {
  __typename?: 'DeletePositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPositionNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Position` that was deleted by this mutation. */
  position?: Maybe<Position>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deletePriorityByNodeId` mutation. */
export type DeletePriorityByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Priority` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePriorityByServiceIdAndCourseId` mutation. */
export type DeletePriorityByServiceIdAndCourseIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Course for which priority is tracked */
  courseId: Scalars['Int']['input'];
  /** Associated teacher service record */
  serviceId: Scalars['Int']['input'];
};

/** All input for the `deletePriority` mutation. */
export type DeletePriorityInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique priority record identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Priority` mutation. */
export type DeletePriorityPayload = {
  __typename?: 'DeletePriorityPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Course` that is related to this `Priority`. */
  courseByYearValueAndCourseId: Course;
  deletedPriorityNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Priority` that was deleted by this mutation. */
  priority?: Maybe<Priority>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Service` that is related to this `Priority`. */
  serviceByYearValueAndServiceId: Service;
  /** Reads a single `Year` that is related to this `Priority`. */
  year: Year;
};

/** All input for the `deleteProgramByDegreeIdAndName` mutation. */
export type DeleteProgramByDegreeIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Parent degree for this program */
  degreeId: Scalars['Int']['input'];
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name: Scalars['String']['input'];
};

/** All input for the `deleteProgramByNodeId` mutation. */
export type DeleteProgramByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Program` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteProgram` mutation. */
export type DeleteProgramInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique program identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Program` mutation. */
export type DeleteProgramPayload = {
  __typename?: 'DeleteProgramPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Degree` that is related to this `Program`. */
  degree: Degree;
  deletedProgramNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Program` that was deleted by this mutation. */
  program?: Maybe<Program>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteRequestByNodeId` mutation. */
export type DeleteRequestByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Request` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteRequestByServiceIdAndCourseIdAndType` mutation. */
export type DeleteRequestByServiceIdAndCourseIdAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Requested or assigned course */
  courseId: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
  /** Type of request (primary choice, backup, or final assignment) */
  type: RequestTypeEnum;
};

/** All input for the `deleteRequest` mutation. */
export type DeleteRequestInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique request identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Request` mutation. */
export type DeleteRequestPayload = {
  __typename?: 'DeleteRequestPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Course` that is related to this `Request`. */
  courseByYearValueAndCourseId: Course;
  deletedRequestNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Request` that was deleted by this mutation. */
  request?: Maybe<Request>;
  /** Reads a single `Service` that is related to this `Request`. */
  serviceByYearValueAndServiceId: Service;
  /** Reads a single `VService` that is related to this `Request`. */
  vServiceByServiceId: VService;
  /** Reads a single `Year` that is related to this `Request`. */
  year: Year;
};

/** All input for the `deleteRoleByNodeId` mutation. */
export type DeleteRoleByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Role` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteRoleByUidAndType` mutation. */
export type DeleteRoleByUidAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Type of privileged role */
  type: RoleTypeEnum;
  /** Teacher identifier with role access */
  uid: Scalars['String']['input'];
};

/** All input for the `deleteRole` mutation. */
export type DeleteRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique role assignment identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Role` mutation. */
export type DeleteRolePayload = {
  __typename?: 'DeleteRolePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRoleNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Role` that was deleted by this mutation. */
  role?: Maybe<Role>;
  /** Reads a single `Teacher` that is related to this `Role`. */
  teacher: Teacher;
};

/** All input for the `deleteServiceByIdAndYearValue` mutation. */
export type DeleteServiceByIdAndYearValueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique service identifier */
  id: Scalars['Int']['input'];
  /** Academic year for this service record */
  yearValue: Scalars['Int']['input'];
};

/** All input for the `deleteServiceByNodeId` mutation. */
export type DeleteServiceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Service` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteServiceByYearValueAndUid` mutation. */
export type DeleteServiceByYearValueAndUidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Teacher identifier linking to teacher table */
  uid: Scalars['String']['input'];
  /** Academic year for this service record */
  yearValue: Scalars['Int']['input'];
};

/** All input for the `deleteService` mutation. */
export type DeleteServiceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique service identifier */
  id: Scalars['Int']['input'];
};

/** All input for the `deleteServiceModificationByNodeId` mutation. */
export type DeleteServiceModificationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ServiceModification` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteServiceModification` mutation. */
export type DeleteServiceModificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique modification identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `ServiceModification` mutation. */
export type DeleteServiceModificationPayload = {
  __typename?: 'DeleteServiceModificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedServiceModificationNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Service` that is related to this `ServiceModification`. */
  service: Service;
  /** The `ServiceModification` that was deleted by this mutation. */
  serviceModification?: Maybe<ServiceModification>;
  /** Reads a single `ServiceModificationType` that is related to this `ServiceModification`. */
  type: ServiceModificationType;
};

/** All input for the `deleteServiceModificationTypeByLabel` mutation. */
export type DeleteServiceModificationTypeByLabelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['input'];
};

/** All input for the `deleteServiceModificationTypeByNodeId` mutation. */
export type DeleteServiceModificationTypeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ServiceModificationType` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteServiceModificationType` mutation. */
export type DeleteServiceModificationTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique modification type identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `ServiceModificationType` mutation. */
export type DeleteServiceModificationTypePayload = {
  __typename?: 'DeleteServiceModificationTypePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedServiceModificationTypeNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ServiceModificationType` that was deleted by this mutation. */
  serviceModificationType?: Maybe<ServiceModificationType>;
};

/** The output of our delete `Service` mutation. */
export type DeleteServicePayload = {
  __typename?: 'DeleteServicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedServiceNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Service` that was deleted by this mutation. */
  service?: Maybe<Service>;
  /** Reads a single `Teacher` that is related to this `Service`. */
  teacher: Teacher;
  /** Reads a single `Year` that is related to this `Service`. */
  year: Year;
};

/** All input for the `deleteTeacherByNodeId` mutation. */
export type DeleteTeacherByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Teacher` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTeacher` mutation. */
export type DeleteTeacherInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's email address (primary key). */
  uid: Scalars['String']['input'];
};

/** The output of our delete `Teacher` mutation. */
export type DeleteTeacherPayload = {
  __typename?: 'DeleteTeacherPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTeacherNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Position` that is related to this `Teacher`. */
  position?: Maybe<Position>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Teacher` that was deleted by this mutation. */
  teacher?: Maybe<Teacher>;
};

/** All input for the `deleteTrackByIdAndProgramId` mutation. */
export type DeleteTrackByIdAndProgramIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique track identifier */
  id: Scalars['Int']['input'];
  /** Parent program for this track */
  programId: Scalars['Int']['input'];
};

/** All input for the `deleteTrackByNodeId` mutation. */
export type DeleteTrackByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Track` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTrackByProgramIdAndName` mutation. */
export type DeleteTrackByProgramIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name: Scalars['String']['input'];
  /** Parent program for this track */
  programId: Scalars['Int']['input'];
};

/** All input for the `deleteTrack` mutation. */
export type DeleteTrackInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique track identifier */
  id: Scalars['Int']['input'];
};

/** The output of our delete `Track` mutation. */
export type DeleteTrackPayload = {
  __typename?: 'DeleteTrackPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTrackNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Program` that is related to this `Track`. */
  program: Program;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Track` that was deleted by this mutation. */
  track?: Maybe<Track>;
};

/** All input for the `deleteYearByNodeId` mutation. */
export type DeleteYearByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Year` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteYear` mutation. */
export type DeleteYearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value: Scalars['Int']['input'];
};

/** The output of our delete `Year` mutation. */
export type DeleteYearPayload = {
  __typename?: 'DeleteYearPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedYearNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Year` that was deleted by this mutation. */
  year?: Maybe<Year>;
};

/** All input for the `dummyMutation` mutation. */
export type DummyMutationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `dummyMutation` mutation. */
export type DummyMutationPayload = {
  __typename?: 'DummyMutationPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Adds created_at and updated_at timestamp columns to the specified table, along with an automatic update trigger for updated_at */
  addTimestampColumns?: Maybe<AddTimestampColumnsPayload>;
  /** Adds created_at and updated_at timestamp columns to all tables in the public schema, along with an automatic update trigger for updated_at */
  addTimestampColumnsToAllTables?: Maybe<AddTimestampColumnsToAllTablesPayload>;
  /** Computes courses seniority and priority status for a given service based on previous year's course assignments */
  computeServicePriorities?: Maybe<ComputeServicePrioritiesPayload>;
  /** Computes seniority and priority status for all services in a given year */
  computeYearPriorities?: Maybe<ComputeYearPrioritiesPayload>;
  /** Creates copies of all courses from the previous year into the specified year */
  copyYearCourses?: Maybe<CopyYearCoursesPayload>;
  /** Creates a single `AppSetting`. */
  createAppSetting?: Maybe<CreateAppSettingPayload>;
  /** Creates a single `Coordination`. */
  createCoordination?: Maybe<CreateCoordinationPayload>;
  /** Creates a single `Course`. */
  createCourse?: Maybe<CreateCoursePayload>;
  /** Creates a single `CourseType`. */
  createCourseType?: Maybe<CreateCourseTypePayload>;
  /** Creates a single `CurrentPhase`. */
  createCurrentPhase?: Maybe<CreateCurrentPhasePayload>;
  /** Creates a single `Degree`. */
  createDegree?: Maybe<CreateDegreePayload>;
  /** Creates a single `Position`. */
  createPosition?: Maybe<CreatePositionPayload>;
  /** Creates a single `Priority`. */
  createPriority?: Maybe<CreatePriorityPayload>;
  /** Creates a single `Program`. */
  createProgram?: Maybe<CreateProgramPayload>;
  /** Creates a single `Request`. */
  createRequest?: Maybe<CreateRequestPayload>;
  /** Creates a single `Role`. */
  createRole?: Maybe<CreateRolePayload>;
  /** Creates a single `Service`. */
  createService?: Maybe<CreateServicePayload>;
  /** Creates a single `ServiceModification`. */
  createServiceModification?: Maybe<CreateServiceModificationPayload>;
  /** Creates a single `ServiceModificationType`. */
  createServiceModificationType?: Maybe<CreateServiceModificationTypePayload>;
  /** Creates a single `Teacher`. */
  createTeacher?: Maybe<CreateTeacherPayload>;
  /** Creates a new service entry for a specific year and teacher with default base hours, using personal base_service_hours if set and position's base_service_hours otherwise */
  createTeacherService?: Maybe<CreateTeacherServicePayload>;
  /** Creates a single `Track`. */
  createTrack?: Maybe<CreateTrackPayload>;
  /** Creates a single `VService`. */
  createVService?: Maybe<CreateVServicePayload>;
  /** Creates a single `VTeacher`. */
  createVTeacher?: Maybe<CreateVTeacherPayload>;
  /** Creates a single `Year`. */
  createYear?: Maybe<CreateYearPayload>;
  /** Creates service entries for all active teachers for a specific year, using personal base_service_hours if set and position's base_service_hours otherwise */
  createYearServices?: Maybe<CreateYearServicesPayload>;
  /** Deletes a single `AppSetting` using a unique key. */
  deleteAppSetting?: Maybe<DeleteAppSettingPayload>;
  /** Deletes a single `AppSetting` using its globally unique id. */
  deleteAppSettingByNodeId?: Maybe<DeleteAppSettingPayload>;
  /** Deletes a single `Coordination` using a unique key. */
  deleteCoordination?: Maybe<DeleteCoordinationPayload>;
  /** Deletes a single `Coordination` using its globally unique id. */
  deleteCoordinationByNodeId?: Maybe<DeleteCoordinationPayload>;
  /** Deletes a single `Coordination` using a unique key. */
  deleteCoordinationByUidAndCourseIdAndTrackIdAndProgramId?: Maybe<DeleteCoordinationPayload>;
  /** Deletes a single `Course` using a unique key. */
  deleteCourse?: Maybe<DeleteCoursePayload>;
  /** Deletes a single `Course` using a unique key. */
  deleteCourseByIdAndYearValue?: Maybe<DeleteCoursePayload>;
  /** Deletes a single `Course` using its globally unique id. */
  deleteCourseByNodeId?: Maybe<DeleteCoursePayload>;
  /** Deletes a single `Course` using a unique key. */
  deleteCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeId?: Maybe<DeleteCoursePayload>;
  /** Deletes a single `CourseType` using a unique key. */
  deleteCourseType?: Maybe<DeleteCourseTypePayload>;
  /** Deletes a single `CourseType` using a unique key. */
  deleteCourseTypeByLabel?: Maybe<DeleteCourseTypePayload>;
  /** Deletes a single `CourseType` using its globally unique id. */
  deleteCourseTypeByNodeId?: Maybe<DeleteCourseTypePayload>;
  /** Deletes a single `CurrentPhase` using a unique key. */
  deleteCurrentPhase?: Maybe<DeleteCurrentPhasePayload>;
  /** Deletes a single `CurrentPhase` using its globally unique id. */
  deleteCurrentPhaseByNodeId?: Maybe<DeleteCurrentPhasePayload>;
  /** Deletes a single `Degree` using a unique key. */
  deleteDegree?: Maybe<DeleteDegreePayload>;
  /** Deletes a single `Degree` using a unique key. */
  deleteDegreeByName?: Maybe<DeleteDegreePayload>;
  /** Deletes a single `Degree` using its globally unique id. */
  deleteDegreeByNodeId?: Maybe<DeleteDegreePayload>;
  /** Deletes a single `Position` using a unique key. */
  deletePosition?: Maybe<DeletePositionPayload>;
  /** Deletes a single `Position` using a unique key. */
  deletePositionByLabel?: Maybe<DeletePositionPayload>;
  /** Deletes a single `Position` using its globally unique id. */
  deletePositionByNodeId?: Maybe<DeletePositionPayload>;
  /** Deletes a single `Priority` using a unique key. */
  deletePriority?: Maybe<DeletePriorityPayload>;
  /** Deletes a single `Priority` using its globally unique id. */
  deletePriorityByNodeId?: Maybe<DeletePriorityPayload>;
  /** Deletes a single `Priority` using a unique key. */
  deletePriorityByServiceIdAndCourseId?: Maybe<DeletePriorityPayload>;
  /** Deletes a single `Program` using a unique key. */
  deleteProgram?: Maybe<DeleteProgramPayload>;
  /** Deletes a single `Program` using a unique key. */
  deleteProgramByDegreeIdAndName?: Maybe<DeleteProgramPayload>;
  /** Deletes a single `Program` using its globally unique id. */
  deleteProgramByNodeId?: Maybe<DeleteProgramPayload>;
  /** Deletes a single `Request` using a unique key. */
  deleteRequest?: Maybe<DeleteRequestPayload>;
  /** Deletes a single `Request` using its globally unique id. */
  deleteRequestByNodeId?: Maybe<DeleteRequestPayload>;
  /** Deletes a single `Request` using a unique key. */
  deleteRequestByServiceIdAndCourseIdAndType?: Maybe<DeleteRequestPayload>;
  /** Deletes a single `Role` using a unique key. */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Deletes a single `Role` using its globally unique id. */
  deleteRoleByNodeId?: Maybe<DeleteRolePayload>;
  /** Deletes a single `Role` using a unique key. */
  deleteRoleByUidAndType?: Maybe<DeleteRolePayload>;
  /** Deletes a single `Service` using a unique key. */
  deleteService?: Maybe<DeleteServicePayload>;
  /** Deletes a single `Service` using a unique key. */
  deleteServiceByIdAndYearValue?: Maybe<DeleteServicePayload>;
  /** Deletes a single `Service` using its globally unique id. */
  deleteServiceByNodeId?: Maybe<DeleteServicePayload>;
  /** Deletes a single `Service` using a unique key. */
  deleteServiceByYearValueAndUid?: Maybe<DeleteServicePayload>;
  /** Deletes a single `ServiceModification` using a unique key. */
  deleteServiceModification?: Maybe<DeleteServiceModificationPayload>;
  /** Deletes a single `ServiceModification` using its globally unique id. */
  deleteServiceModificationByNodeId?: Maybe<DeleteServiceModificationPayload>;
  /** Deletes a single `ServiceModificationType` using a unique key. */
  deleteServiceModificationType?: Maybe<DeleteServiceModificationTypePayload>;
  /** Deletes a single `ServiceModificationType` using a unique key. */
  deleteServiceModificationTypeByLabel?: Maybe<DeleteServiceModificationTypePayload>;
  /** Deletes a single `ServiceModificationType` using its globally unique id. */
  deleteServiceModificationTypeByNodeId?: Maybe<DeleteServiceModificationTypePayload>;
  /** Deletes a single `Teacher` using a unique key. */
  deleteTeacher?: Maybe<DeleteTeacherPayload>;
  /** Deletes a single `Teacher` using its globally unique id. */
  deleteTeacherByNodeId?: Maybe<DeleteTeacherPayload>;
  /** Deletes a single `Track` using a unique key. */
  deleteTrack?: Maybe<DeleteTrackPayload>;
  /** Deletes a single `Track` using a unique key. */
  deleteTrackByIdAndProgramId?: Maybe<DeleteTrackPayload>;
  /** Deletes a single `Track` using its globally unique id. */
  deleteTrackByNodeId?: Maybe<DeleteTrackPayload>;
  /** Deletes a single `Track` using a unique key. */
  deleteTrackByProgramIdAndName?: Maybe<DeleteTrackPayload>;
  /** Deletes a single `Year` using a unique key. */
  deleteYear?: Maybe<DeleteYearPayload>;
  /** Deletes a single `Year` using its globally unique id. */
  deleteYearByNodeId?: Maybe<DeleteYearPayload>;
  /** Dummy mutation that does nothing */
  dummyMutation?: Maybe<DummyMutationPayload>;
  /** Updates a single `AppSetting` using a unique key and a patch. */
  updateAppSetting?: Maybe<UpdateAppSettingPayload>;
  /** Updates a single `AppSetting` using its globally unique id and a patch. */
  updateAppSettingByNodeId?: Maybe<UpdateAppSettingPayload>;
  /** Updates a single `Coordination` using a unique key and a patch. */
  updateCoordination?: Maybe<UpdateCoordinationPayload>;
  /** Updates a single `Coordination` using its globally unique id and a patch. */
  updateCoordinationByNodeId?: Maybe<UpdateCoordinationPayload>;
  /** Updates a single `Coordination` using a unique key and a patch. */
  updateCoordinationByUidAndCourseIdAndTrackIdAndProgramId?: Maybe<UpdateCoordinationPayload>;
  /** Updates a single `Course` using a unique key and a patch. */
  updateCourse?: Maybe<UpdateCoursePayload>;
  /** Updates a single `Course` using a unique key and a patch. */
  updateCourseByIdAndYearValue?: Maybe<UpdateCoursePayload>;
  /** Updates a single `Course` using its globally unique id and a patch. */
  updateCourseByNodeId?: Maybe<UpdateCoursePayload>;
  /** Updates a single `Course` using a unique key and a patch. */
  updateCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeId?: Maybe<UpdateCoursePayload>;
  /** Updates a single `CourseType` using a unique key and a patch. */
  updateCourseType?: Maybe<UpdateCourseTypePayload>;
  /** Updates a single `CourseType` using a unique key and a patch. */
  updateCourseTypeByLabel?: Maybe<UpdateCourseTypePayload>;
  /** Updates a single `CourseType` using its globally unique id and a patch. */
  updateCourseTypeByNodeId?: Maybe<UpdateCourseTypePayload>;
  /** Updates a single `CurrentPhase` using a unique key and a patch. */
  updateCurrentPhase?: Maybe<UpdateCurrentPhasePayload>;
  /** Updates a single `CurrentPhase` using its globally unique id and a patch. */
  updateCurrentPhaseByNodeId?: Maybe<UpdateCurrentPhasePayload>;
  /** Updates a single `Degree` using a unique key and a patch. */
  updateDegree?: Maybe<UpdateDegreePayload>;
  /** Updates a single `Degree` using a unique key and a patch. */
  updateDegreeByName?: Maybe<UpdateDegreePayload>;
  /** Updates a single `Degree` using its globally unique id and a patch. */
  updateDegreeByNodeId?: Maybe<UpdateDegreePayload>;
  /** Updates a single `Position` using a unique key and a patch. */
  updatePosition?: Maybe<UpdatePositionPayload>;
  /** Updates a single `Position` using a unique key and a patch. */
  updatePositionByLabel?: Maybe<UpdatePositionPayload>;
  /** Updates a single `Position` using its globally unique id and a patch. */
  updatePositionByNodeId?: Maybe<UpdatePositionPayload>;
  /** Updates a single `Priority` using a unique key and a patch. */
  updatePriority?: Maybe<UpdatePriorityPayload>;
  /** Updates a single `Priority` using its globally unique id and a patch. */
  updatePriorityByNodeId?: Maybe<UpdatePriorityPayload>;
  /** Updates a single `Priority` using a unique key and a patch. */
  updatePriorityByServiceIdAndCourseId?: Maybe<UpdatePriorityPayload>;
  /** Updates a single `Program` using a unique key and a patch. */
  updateProgram?: Maybe<UpdateProgramPayload>;
  /** Updates a single `Program` using a unique key and a patch. */
  updateProgramByDegreeIdAndName?: Maybe<UpdateProgramPayload>;
  /** Updates a single `Program` using its globally unique id and a patch. */
  updateProgramByNodeId?: Maybe<UpdateProgramPayload>;
  /** Updates a single `Request` using a unique key and a patch. */
  updateRequest?: Maybe<UpdateRequestPayload>;
  /** Updates a single `Request` using its globally unique id and a patch. */
  updateRequestByNodeId?: Maybe<UpdateRequestPayload>;
  /** Updates a single `Request` using a unique key and a patch. */
  updateRequestByServiceIdAndCourseIdAndType?: Maybe<UpdateRequestPayload>;
  /** Updates a single `Role` using a unique key and a patch. */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Updates a single `Role` using its globally unique id and a patch. */
  updateRoleByNodeId?: Maybe<UpdateRolePayload>;
  /** Updates a single `Role` using a unique key and a patch. */
  updateRoleByUidAndType?: Maybe<UpdateRolePayload>;
  /** Updates a single `Service` using a unique key and a patch. */
  updateService?: Maybe<UpdateServicePayload>;
  /** Updates a single `Service` using a unique key and a patch. */
  updateServiceByIdAndYearValue?: Maybe<UpdateServicePayload>;
  /** Updates a single `Service` using its globally unique id and a patch. */
  updateServiceByNodeId?: Maybe<UpdateServicePayload>;
  /** Updates a single `Service` using a unique key and a patch. */
  updateServiceByYearValueAndUid?: Maybe<UpdateServicePayload>;
  /** Updates a single `ServiceModification` using a unique key and a patch. */
  updateServiceModification?: Maybe<UpdateServiceModificationPayload>;
  /** Updates a single `ServiceModification` using its globally unique id and a patch. */
  updateServiceModificationByNodeId?: Maybe<UpdateServiceModificationPayload>;
  /** Updates a single `ServiceModificationType` using a unique key and a patch. */
  updateServiceModificationType?: Maybe<UpdateServiceModificationTypePayload>;
  /** Updates a single `ServiceModificationType` using a unique key and a patch. */
  updateServiceModificationTypeByLabel?: Maybe<UpdateServiceModificationTypePayload>;
  /** Updates a single `ServiceModificationType` using its globally unique id and a patch. */
  updateServiceModificationTypeByNodeId?: Maybe<UpdateServiceModificationTypePayload>;
  /** Updates a single `Teacher` using a unique key and a patch. */
  updateTeacher?: Maybe<UpdateTeacherPayload>;
  /** Updates a single `Teacher` using its globally unique id and a patch. */
  updateTeacherByNodeId?: Maybe<UpdateTeacherPayload>;
  /** Updates a single `Track` using a unique key and a patch. */
  updateTrack?: Maybe<UpdateTrackPayload>;
  /** Updates a single `Track` using a unique key and a patch. */
  updateTrackByIdAndProgramId?: Maybe<UpdateTrackPayload>;
  /** Updates a single `Track` using its globally unique id and a patch. */
  updateTrackByNodeId?: Maybe<UpdateTrackPayload>;
  /** Updates a single `Track` using a unique key and a patch. */
  updateTrackByProgramIdAndName?: Maybe<UpdateTrackPayload>;
  /** Updates a single `Year` using a unique key and a patch. */
  updateYear?: Maybe<UpdateYearPayload>;
  /** Updates a single `Year` using its globally unique id and a patch. */
  updateYearByNodeId?: Maybe<UpdateYearPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAddTimestampColumnsArgs = {
  input: AddTimestampColumnsInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAddTimestampColumnsToAllTablesArgs = {
  input: AddTimestampColumnsToAllTablesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationComputeServicePrioritiesArgs = {
  input: ComputeServicePrioritiesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationComputeYearPrioritiesArgs = {
  input: ComputeYearPrioritiesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCopyYearCoursesArgs = {
  input: CopyYearCoursesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAppSettingArgs = {
  input: CreateAppSettingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCoordinationArgs = {
  input: CreateCoordinationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCourseTypeArgs = {
  input: CreateCourseTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCurrentPhaseArgs = {
  input: CreateCurrentPhaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDegreeArgs = {
  input: CreateDegreeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePositionArgs = {
  input: CreatePositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePriorityArgs = {
  input: CreatePriorityInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProgramArgs = {
  input: CreateProgramInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRequestArgs = {
  input: CreateRequestInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateServiceModificationArgs = {
  input: CreateServiceModificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateServiceModificationTypeArgs = {
  input: CreateServiceModificationTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeacherArgs = {
  input: CreateTeacherInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeacherServiceArgs = {
  input: CreateTeacherServiceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTrackArgs = {
  input: CreateTrackInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVServiceArgs = {
  input: CreateVServiceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVTeacherArgs = {
  input: CreateVTeacherInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateYearArgs = {
  input: CreateYearInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateYearServicesArgs = {
  input: CreateYearServicesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppSettingArgs = {
  input: DeleteAppSettingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppSettingByNodeIdArgs = {
  input: DeleteAppSettingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCoordinationArgs = {
  input: DeleteCoordinationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCoordinationByNodeIdArgs = {
  input: DeleteCoordinationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCoordinationByUidAndCourseIdAndTrackIdAndProgramIdArgs = {
  input: DeleteCoordinationByUidAndCourseIdAndTrackIdAndProgramIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCourseArgs = {
  input: DeleteCourseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCourseByIdAndYearValueArgs = {
  input: DeleteCourseByIdAndYearValueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCourseByNodeIdArgs = {
  input: DeleteCourseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeIdArgs = {
  input: DeleteCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCourseTypeArgs = {
  input: DeleteCourseTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCourseTypeByLabelArgs = {
  input: DeleteCourseTypeByLabelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCourseTypeByNodeIdArgs = {
  input: DeleteCourseTypeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCurrentPhaseArgs = {
  input: DeleteCurrentPhaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCurrentPhaseByNodeIdArgs = {
  input: DeleteCurrentPhaseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDegreeArgs = {
  input: DeleteDegreeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDegreeByNameArgs = {
  input: DeleteDegreeByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDegreeByNodeIdArgs = {
  input: DeleteDegreeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePositionArgs = {
  input: DeletePositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePositionByLabelArgs = {
  input: DeletePositionByLabelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePositionByNodeIdArgs = {
  input: DeletePositionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePriorityArgs = {
  input: DeletePriorityInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePriorityByNodeIdArgs = {
  input: DeletePriorityByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePriorityByServiceIdAndCourseIdArgs = {
  input: DeletePriorityByServiceIdAndCourseIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProgramArgs = {
  input: DeleteProgramInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProgramByDegreeIdAndNameArgs = {
  input: DeleteProgramByDegreeIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProgramByNodeIdArgs = {
  input: DeleteProgramByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRequestArgs = {
  input: DeleteRequestInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRequestByNodeIdArgs = {
  input: DeleteRequestByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRequestByServiceIdAndCourseIdAndTypeArgs = {
  input: DeleteRequestByServiceIdAndCourseIdAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoleArgs = {
  input: DeleteRoleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoleByNodeIdArgs = {
  input: DeleteRoleByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoleByUidAndTypeArgs = {
  input: DeleteRoleByUidAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceArgs = {
  input: DeleteServiceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceByIdAndYearValueArgs = {
  input: DeleteServiceByIdAndYearValueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceByNodeIdArgs = {
  input: DeleteServiceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceByYearValueAndUidArgs = {
  input: DeleteServiceByYearValueAndUidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceModificationArgs = {
  input: DeleteServiceModificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceModificationByNodeIdArgs = {
  input: DeleteServiceModificationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceModificationTypeArgs = {
  input: DeleteServiceModificationTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceModificationTypeByLabelArgs = {
  input: DeleteServiceModificationTypeByLabelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceModificationTypeByNodeIdArgs = {
  input: DeleteServiceModificationTypeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeacherArgs = {
  input: DeleteTeacherInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeacherByNodeIdArgs = {
  input: DeleteTeacherByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTrackArgs = {
  input: DeleteTrackInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTrackByIdAndProgramIdArgs = {
  input: DeleteTrackByIdAndProgramIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTrackByNodeIdArgs = {
  input: DeleteTrackByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTrackByProgramIdAndNameArgs = {
  input: DeleteTrackByProgramIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteYearArgs = {
  input: DeleteYearInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteYearByNodeIdArgs = {
  input: DeleteYearByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDummyMutationArgs = {
  input: DummyMutationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppSettingArgs = {
  input: UpdateAppSettingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppSettingByNodeIdArgs = {
  input: UpdateAppSettingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCoordinationArgs = {
  input: UpdateCoordinationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCoordinationByNodeIdArgs = {
  input: UpdateCoordinationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCoordinationByUidAndCourseIdAndTrackIdAndProgramIdArgs = {
  input: UpdateCoordinationByUidAndCourseIdAndTrackIdAndProgramIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCourseByIdAndYearValueArgs = {
  input: UpdateCourseByIdAndYearValueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCourseByNodeIdArgs = {
  input: UpdateCourseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeIdArgs = {
  input: UpdateCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCourseTypeArgs = {
  input: UpdateCourseTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCourseTypeByLabelArgs = {
  input: UpdateCourseTypeByLabelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCourseTypeByNodeIdArgs = {
  input: UpdateCourseTypeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCurrentPhaseArgs = {
  input: UpdateCurrentPhaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCurrentPhaseByNodeIdArgs = {
  input: UpdateCurrentPhaseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDegreeArgs = {
  input: UpdateDegreeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDegreeByNameArgs = {
  input: UpdateDegreeByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDegreeByNodeIdArgs = {
  input: UpdateDegreeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePositionArgs = {
  input: UpdatePositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePositionByLabelArgs = {
  input: UpdatePositionByLabelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePositionByNodeIdArgs = {
  input: UpdatePositionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePriorityArgs = {
  input: UpdatePriorityInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePriorityByNodeIdArgs = {
  input: UpdatePriorityByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePriorityByServiceIdAndCourseIdArgs = {
  input: UpdatePriorityByServiceIdAndCourseIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProgramArgs = {
  input: UpdateProgramInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProgramByDegreeIdAndNameArgs = {
  input: UpdateProgramByDegreeIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProgramByNodeIdArgs = {
  input: UpdateProgramByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRequestArgs = {
  input: UpdateRequestInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRequestByNodeIdArgs = {
  input: UpdateRequestByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRequestByServiceIdAndCourseIdAndTypeArgs = {
  input: UpdateRequestByServiceIdAndCourseIdAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoleByNodeIdArgs = {
  input: UpdateRoleByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoleByUidAndTypeArgs = {
  input: UpdateRoleByUidAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceArgs = {
  input: UpdateServiceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceByIdAndYearValueArgs = {
  input: UpdateServiceByIdAndYearValueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceByNodeIdArgs = {
  input: UpdateServiceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceByYearValueAndUidArgs = {
  input: UpdateServiceByYearValueAndUidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceModificationArgs = {
  input: UpdateServiceModificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceModificationByNodeIdArgs = {
  input: UpdateServiceModificationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceModificationTypeArgs = {
  input: UpdateServiceModificationTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceModificationTypeByLabelArgs = {
  input: UpdateServiceModificationTypeByLabelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceModificationTypeByNodeIdArgs = {
  input: UpdateServiceModificationTypeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeacherArgs = {
  input: UpdateTeacherInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeacherByNodeIdArgs = {
  input: UpdateTeacherByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTrackArgs = {
  input: UpdateTrackInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTrackByIdAndProgramIdArgs = {
  input: UpdateTrackByIdAndProgramIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTrackByNodeIdArgs = {
  input: UpdateTrackByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTrackByProgramIdAndNameArgs = {
  input: UpdateTrackByProgramIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateYearArgs = {
  input: UpdateYearInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateYearByNodeIdArgs = {
  input: UpdateYearByNodeIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

export enum PhaseEnum {
  /** The course assignment committee reviews requests and makes final teaching assignments, during which teachers can view but not modify their requests. */
  Assignments = 'ASSIGNMENTS',
  /** Teachers submit their teaching preferences by making primary and secondary course requests, while also confirming their required teaching hours and any service modifications. */
  Requests = 'REQUESTS',
  /** Teachers can view their final course assignments for the upcoming year, along with historical assignments from previous years. */
  Results = 'RESULTS',
  /** System is temporarily closed, typically between academic years or during maintenance periods. */
  Shutdown = 'SHUTDOWN'
}

/** Teaching positions with associated service hour requirements */
export type Position = Node & {
  __typename?: 'Position';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Optional description of the position */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique position identifier */
  id: Scalars['Int']['output'];
  /** Human-readable position name for display purposes, unique */
  label: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Teacher`. */
  teachers: Array<Teacher>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
};


/** Teaching positions with associated service hour requirements */
export type PositionTeachersArgs = {
  condition?: InputMaybe<TeacherCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeachersOrderBy>>;
};

/**
 * A condition to be used against `Position` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PositionCondition = {
  /** Checks for equality with the object’s `baseServiceHours` field. */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `label` field. */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `Position` */
export type PositionInput = {
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Optional description of the position */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable position name for display purposes, unique */
  label: Scalars['String']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Represents an update to a `Position`. Fields that are set will be updated. */
export type PositionPatch = {
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Optional description of the position */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable position name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Position`. */
export enum PositionsOrderBy {
  BaseServiceHoursAsc = 'BASE_SERVICE_HOURS_ASC',
  BaseServiceHoursDesc = 'BASE_SERVICE_HOURS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LabelAsc = 'LABEL_ASC',
  LabelDesc = 'LABEL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Methods to use when ordering `Priority`. */
export enum PrioritiesOrderBy {
  ComputedAsc = 'COMPUTED_ASC',
  ComputedDesc = 'COMPUTED_DESC',
  CourseIdAsc = 'COURSE_ID_ASC',
  CourseIdDesc = 'COURSE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsPriorityAsc = 'IS_PRIORITY_ASC',
  IsPriorityDesc = 'IS_PRIORITY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SeniorityAsc = 'SENIORITY_ASC',
  SeniorityDesc = 'SENIORITY_DESC',
  ServiceIdAsc = 'SERVICE_ID_ASC',
  ServiceIdDesc = 'SERVICE_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  YearValueAsc = 'YEAR_VALUE_ASC',
  YearValueDesc = 'YEAR_VALUE_DESC'
}

/** Teacher course assignment history and priority status */
export type Priority = Node & {
  __typename?: 'Priority';
  /** Flag indicating whether the seniority value was automatically computed rather than manually assigned */
  computed: Scalars['Boolean']['output'];
  /** Reads a single `Course` that is related to this `Priority`. */
  courseByYearValueAndCourseId: Course;
  /** Course for which priority is tracked */
  courseId: Scalars['Int']['output'];
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Unique priority record identifier */
  id: Scalars['Int']['output'];
  /** Current priority status based on seniority and course rules */
  isPriority?: Maybe<Scalars['Boolean']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Service` that is related to this `Priority`. */
  serviceByYearValueAndServiceId: Service;
  /** Associated teacher service record */
  serviceId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `Year` that is related to this `Priority`. */
  year: Year;
  /** Year of the priority (must match service's and course's year) */
  yearValue: Scalars['Int']['output'];
};

/**
 * A condition to be used against `Priority` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PriorityCondition = {
  /** Checks for equality with the object’s `computed` field. */
  computed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `courseId` field. */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `isPriority` field. */
  isPriority?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `seniority` field. */
  seniority?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `serviceId` field. */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `yearValue` field. */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Priority` */
export type PriorityInput = {
  /** Flag indicating whether the seniority value was automatically computed rather than manually assigned */
  computed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Course for which priority is tracked */
  courseId: Scalars['Int']['input'];
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current priority status based on seniority and course rules */
  isPriority?: InputMaybe<Scalars['Boolean']['input']>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<Scalars['Int']['input']>;
  /** Associated teacher service record */
  serviceId: Scalars['Int']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Year of the priority (must match service's and course's year) */
  yearValue: Scalars['Int']['input'];
};

/** Represents an update to a `Priority`. Fields that are set will be updated. */
export type PriorityPatch = {
  /** Flag indicating whether the seniority value was automatically computed rather than manually assigned */
  computed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Course for which priority is tracked */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current priority status based on seniority and course rules */
  isPriority?: InputMaybe<Scalars['Boolean']['input']>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<Scalars['Int']['input']>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Year of the priority (must match service's and course's year) */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

/** Academic programs within each degree */
export type Program = Node & {
  __typename?: 'Program';
  /** Reads and enables pagination through a set of `Coordination`. */
  coordinations: Array<Coordination>;
  /** Reads and enables pagination through a set of `Course`. */
  courses: Array<Course>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Reads a single `Degree` that is related to this `Program`. */
  degree: Degree;
  /** Parent degree for this program */
  degreeId: Scalars['Int']['output'];
  /** Unique program identifier */
  id: Scalars['Int']['output'];
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name: Scalars['String']['output'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated program name */
  nameShort?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Track`. */
  tracks: Array<Track>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Controls program visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Academic programs within each degree */
export type ProgramCoordinationsArgs = {
  condition?: InputMaybe<CoordinationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationsOrderBy>>;
};


/** Academic programs within each degree */
export type ProgramCoursesArgs = {
  condition?: InputMaybe<CourseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoursesOrderBy>>;
};


/** Academic programs within each degree */
export type ProgramTracksArgs = {
  condition?: InputMaybe<TrackCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TracksOrderBy>>;
};

/** A condition to be used against `Program` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProgramCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `degreeId` field. */
  degreeId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nameDisplay` field. */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nameShort` field. */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `visible` field. */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `Program` */
export type ProgramInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Parent degree for this program */
  degreeId: Scalars['Int']['input'];
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name: Scalars['String']['input'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated program name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls program visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents an update to a `Program`. Fields that are set will be updated. */
export type ProgramPatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Parent degree for this program */
  degreeId?: InputMaybe<Scalars['Int']['input']>;
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated program name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls program visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `Program`. */
export enum ProgramsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DegreeIdAsc = 'DEGREE_ID_ASC',
  DegreeIdDesc = 'DEGREE_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NameDisplayAsc = 'NAME_DISPLAY_ASC',
  NameDisplayDesc = 'NAME_DISPLAY_DESC',
  NameShortAsc = 'NAME_SHORT_ASC',
  NameShortDesc = 'NAME_SHORT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VisibleAsc = 'VISIBLE_ASC',
  VisibleDesc = 'VISIBLE_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `AppSetting`. */
  appSetting?: Maybe<AppSetting>;
  /** Reads a single `AppSetting` using its globally unique `ID`. */
  appSettingByNodeId?: Maybe<AppSetting>;
  /** Reads a set of `AppSetting`. */
  appSettings?: Maybe<Array<AppSetting>>;
  /** Get a single `Coordination`. */
  coordination?: Maybe<Coordination>;
  /** Reads a single `Coordination` using its globally unique `ID`. */
  coordinationByNodeId?: Maybe<Coordination>;
  /** Get a single `Coordination`. */
  coordinationByUidAndCourseIdAndTrackIdAndProgramId?: Maybe<Coordination>;
  /** Reads a set of `Coordination`. */
  coordinations?: Maybe<Array<Coordination>>;
  /** Get a single `Course`. */
  course?: Maybe<Course>;
  /** Get a single `Course`. */
  courseByIdAndYearValue?: Maybe<Course>;
  /** Reads a single `Course` using its globally unique `ID`. */
  courseByNodeId?: Maybe<Course>;
  /** Get a single `Course`. */
  courseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeId?: Maybe<Course>;
  /** Get a single `CourseType`. */
  courseType?: Maybe<CourseType>;
  /** Get a single `CourseType`. */
  courseTypeByLabel?: Maybe<CourseType>;
  /** Reads a single `CourseType` using its globally unique `ID`. */
  courseTypeByNodeId?: Maybe<CourseType>;
  /** Reads a set of `CourseType`. */
  courseTypes?: Maybe<Array<CourseType>>;
  /** Reads a set of `Course`. */
  courses?: Maybe<Array<Course>>;
  /** Get a single `CurrentPhase`. */
  currentPhase?: Maybe<CurrentPhase>;
  /** Reads a single `CurrentPhase` using its globally unique `ID`. */
  currentPhaseByNodeId?: Maybe<CurrentPhase>;
  /** Reads a set of `CurrentPhase`. */
  currentPhases?: Maybe<Array<CurrentPhase>>;
  /** Get a single `Degree`. */
  degree?: Maybe<Degree>;
  /** Get a single `Degree`. */
  degreeByName?: Maybe<Degree>;
  /** Reads a single `Degree` using its globally unique `ID`. */
  degreeByNodeId?: Maybe<Degree>;
  /** Reads a set of `Degree`. */
  degrees?: Maybe<Array<Degree>>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  /** Get a single `Position`. */
  position?: Maybe<Position>;
  /** Get a single `Position`. */
  positionByLabel?: Maybe<Position>;
  /** Reads a single `Position` using its globally unique `ID`. */
  positionByNodeId?: Maybe<Position>;
  /** Reads a set of `Position`. */
  positions?: Maybe<Array<Position>>;
  /** Reads a set of `Priority`. */
  priorities?: Maybe<Array<Priority>>;
  /** Get a single `Priority`. */
  priority?: Maybe<Priority>;
  /** Reads a single `Priority` using its globally unique `ID`. */
  priorityByNodeId?: Maybe<Priority>;
  /** Get a single `Priority`. */
  priorityByServiceIdAndCourseId?: Maybe<Priority>;
  /** Get a single `Program`. */
  program?: Maybe<Program>;
  /** Get a single `Program`. */
  programByDegreeIdAndName?: Maybe<Program>;
  /** Reads a single `Program` using its globally unique `ID`. */
  programByNodeId?: Maybe<Program>;
  /** Reads a set of `Program`. */
  programs?: Maybe<Array<Program>>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `Request`. */
  request?: Maybe<Request>;
  /** Reads a single `Request` using its globally unique `ID`. */
  requestByNodeId?: Maybe<Request>;
  /** Get a single `Request`. */
  requestByServiceIdAndCourseIdAndType?: Maybe<Request>;
  /** Reads a set of `Request`. */
  requests?: Maybe<Array<Request>>;
  /** Get a single `Role`. */
  role?: Maybe<Role>;
  /** Reads a single `Role` using its globally unique `ID`. */
  roleByNodeId?: Maybe<Role>;
  /** Get a single `Role`. */
  roleByUidAndType?: Maybe<Role>;
  /** Reads a set of `Role`. */
  roles?: Maybe<Array<Role>>;
  /** Get a single `Service`. */
  service?: Maybe<Service>;
  /** Get a single `Service`. */
  serviceByIdAndYearValue?: Maybe<Service>;
  /** Reads a single `Service` using its globally unique `ID`. */
  serviceByNodeId?: Maybe<Service>;
  /** Get a single `Service`. */
  serviceByYearValueAndUid?: Maybe<Service>;
  /** Get a single `ServiceModification`. */
  serviceModification?: Maybe<ServiceModification>;
  /** Reads a single `ServiceModification` using its globally unique `ID`. */
  serviceModificationByNodeId?: Maybe<ServiceModification>;
  /** Get a single `ServiceModificationType`. */
  serviceModificationType?: Maybe<ServiceModificationType>;
  /** Get a single `ServiceModificationType`. */
  serviceModificationTypeByLabel?: Maybe<ServiceModificationType>;
  /** Reads a single `ServiceModificationType` using its globally unique `ID`. */
  serviceModificationTypeByNodeId?: Maybe<ServiceModificationType>;
  /** Reads a set of `ServiceModificationType`. */
  serviceModificationTypes?: Maybe<Array<ServiceModificationType>>;
  /** Reads a set of `ServiceModification`. */
  serviceModifications?: Maybe<Array<ServiceModification>>;
  /** Reads a set of `Service`. */
  services?: Maybe<Array<Service>>;
  /** Get a single `Teacher`. */
  teacher?: Maybe<Teacher>;
  /** Reads a single `Teacher` using its globally unique `ID`. */
  teacherByNodeId?: Maybe<Teacher>;
  /** Reads a set of `Teacher`. */
  teachers?: Maybe<Array<Teacher>>;
  /** Get a single `Track`. */
  track?: Maybe<Track>;
  /** Get a single `Track`. */
  trackByIdAndProgramId?: Maybe<Track>;
  /** Reads a single `Track` using its globally unique `ID`. */
  trackByNodeId?: Maybe<Track>;
  /** Get a single `Track`. */
  trackByProgramIdAndName?: Maybe<Track>;
  /** Reads a set of `Track`. */
  tracks?: Maybe<Array<Track>>;
  /** Reads a set of `VService`. */
  vServices?: Maybe<Array<VService>>;
  /** Reads a set of `VTeacher`. */
  vTeachers?: Maybe<Array<VTeacher>>;
  /** Get a single `Year`. */
  year?: Maybe<Year>;
  /** Reads a single `Year` using its globally unique `ID`. */
  yearByNodeId?: Maybe<Year>;
  /** Reads a set of `Year`. */
  years?: Maybe<Array<Year>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppSettingArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppSettingByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppSettingsArgs = {
  condition?: InputMaybe<AppSettingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCoordinationArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCoordinationByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCoordinationByUidAndCourseIdAndTrackIdAndProgramIdArgs = {
  courseId: Scalars['Int']['input'];
  programId: Scalars['Int']['input'];
  trackId: Scalars['Int']['input'];
  uid: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCoordinationsArgs = {
  condition?: InputMaybe<CoordinationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCourseArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCourseByIdAndYearValueArgs = {
  id: Scalars['Int']['input'];
  yearValue: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCourseByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeIdArgs = {
  name: Scalars['String']['input'];
  programId: Scalars['Int']['input'];
  semester: Scalars['Int']['input'];
  trackId: Scalars['Int']['input'];
  typeId: Scalars['Int']['input'];
  yearValue: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCourseTypeArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCourseTypeByLabelArgs = {
  label: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCourseTypeByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCourseTypesArgs = {
  condition?: InputMaybe<CourseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCoursesArgs = {
  condition?: InputMaybe<CourseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoursesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCurrentPhaseArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCurrentPhaseByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCurrentPhasesArgs = {
  condition?: InputMaybe<CurrentPhaseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurrentPhasesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDegreeArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDegreeByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDegreeByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDegreesArgs = {
  condition?: InputMaybe<DegreeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DegreesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPositionArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPositionByLabelArgs = {
  label: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPositionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPositionsArgs = {
  condition?: InputMaybe<PositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PositionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPrioritiesArgs = {
  condition?: InputMaybe<PriorityCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PrioritiesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPriorityArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPriorityByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPriorityByServiceIdAndCourseIdArgs = {
  courseId: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProgramArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProgramByDegreeIdAndNameArgs = {
  degreeId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProgramByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProgramsArgs = {
  condition?: InputMaybe<ProgramCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProgramsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRequestArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRequestByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRequestByServiceIdAndCourseIdAndTypeArgs = {
  courseId: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
  type: RequestTypeEnum;
};


/** The root query type which gives access points into the data universe. */
export type QueryRequestsArgs = {
  condition?: InputMaybe<RequestCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRoleByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRoleByUidAndTypeArgs = {
  type: RoleTypeEnum;
  uid: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRolesArgs = {
  condition?: InputMaybe<RoleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceByIdAndYearValueArgs = {
  id: Scalars['Int']['input'];
  yearValue: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceByYearValueAndUidArgs = {
  uid: Scalars['String']['input'];
  yearValue: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceModificationArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceModificationByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceModificationTypeArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceModificationTypeByLabelArgs = {
  label: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceModificationTypeByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceModificationTypesArgs = {
  condition?: InputMaybe<ServiceModificationTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceModificationsArgs = {
  condition?: InputMaybe<ServiceModificationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryServicesArgs = {
  condition?: InputMaybe<ServiceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServicesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeacherArgs = {
  uid: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeacherByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeachersArgs = {
  condition?: InputMaybe<TeacherCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeachersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTrackArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTrackByIdAndProgramIdArgs = {
  id: Scalars['Int']['input'];
  programId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTrackByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTrackByProgramIdAndNameArgs = {
  name: Scalars['String']['input'];
  programId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTracksArgs = {
  condition?: InputMaybe<TrackCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TracksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVServicesArgs = {
  condition?: InputMaybe<VServiceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VServicesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVTeachersArgs = {
  condition?: InputMaybe<VTeacherCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VTeachersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryYearArgs = {
  value: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryYearByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryYearsArgs = {
  condition?: InputMaybe<YearCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<YearsOrderBy>>;
};

/** Teacher requests and assignments for courses */
export type Request = Node & {
  __typename?: 'Request';
  /** Reads a single `Course` that is related to this `Request`. */
  courseByYearValueAndCourseId: Course;
  /** Requested or assigned course */
  courseId: Scalars['Int']['output'];
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Requested or assigned teaching hours */
  hours: Scalars['Float']['output'];
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id: Scalars['Int']['output'];
  isPriority?: Maybe<Scalars['Boolean']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Service` that is related to this `Request`. */
  serviceByYearValueAndServiceId: Service;
  serviceId: Scalars['Int']['output'];
  /** Type of request (primary choice, backup, or final assignment) */
  type: RequestTypeEnum;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `VService` that is related to this `Request`. */
  vServiceByServiceId: VService;
  /** Reads a single `Year` that is related to this `Request`. */
  year: Year;
  /** Year of the request (must match service's and course's year) */
  yearValue: Scalars['Int']['output'];
};

/** A condition to be used against `Request` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type RequestCondition = {
  /** Checks for equality with the object’s `courseId` field. */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `hours` field. */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `serviceId` field. */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<RequestTypeEnum>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `yearValue` field. */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Request` */
export type RequestInput = {
  /** Requested or assigned course */
  courseId: Scalars['Int']['input'];
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Requested or assigned teaching hours */
  hours: Scalars['Float']['input'];
  serviceId: Scalars['Int']['input'];
  /** Type of request (primary choice, backup, or final assignment) */
  type: RequestTypeEnum;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Year of the request (must match service's and course's year) */
  yearValue: Scalars['Int']['input'];
};

/** Represents an update to a `Request`. Fields that are set will be updated. */
export type RequestPatch = {
  /** Requested or assigned course */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<Scalars['Float']['input']>;
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Type of request (primary choice, backup, or final assignment) */
  type?: InputMaybe<RequestTypeEnum>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Year of the request (must match service's and course's year) */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

export enum RequestTypeEnum {
  /** Final course assignment made by the committee during the assignments phase */
  Assignment = 'ASSIGNMENT',
  /** Teacher's preferred course choices submitted during the requests phase */
  Primary = 'PRIMARY',
  /** Teacher's backup course choices submitted during the requests phase */
  Secondary = 'SECONDARY'
}

/** Methods to use when ordering `Request`. */
export enum RequestsOrderBy {
  CourseIdAsc = 'COURSE_ID_ASC',
  CourseIdDesc = 'COURSE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  HoursAsc = 'HOURS_ASC',
  HoursDesc = 'HOURS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ServiceIdAsc = 'SERVICE_ID_ASC',
  ServiceIdDesc = 'SERVICE_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  YearValueAsc = 'YEAR_VALUE_ASC',
  YearValueDesc = 'YEAR_VALUE_DESC'
}

/** Teacher role assignments for system privileges */
export type Role = Node & {
  __typename?: 'Role';
  /** Additional information about this privilege assignment */
  comment?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Unique role assignment identifier */
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Teacher` that is related to this `Role`. */
  teacher: Teacher;
  /** Type of privileged role */
  type: RoleTypeEnum;
  /** Teacher identifier with role access */
  uid: Scalars['String']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
};

/** A condition to be used against `Role` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type RoleCondition = {
  /** Checks for equality with the object’s `comment` field. */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<RoleTypeEnum>;
  /** Checks for equality with the object’s `uid` field. */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `Role` */
export type RoleInput = {
  /** Additional information about this privilege assignment */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Type of privileged role */
  type: RoleTypeEnum;
  /** Teacher identifier with role access */
  uid: Scalars['String']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Represents an update to a `Role`. Fields that are set will be updated. */
export type RolePatch = {
  /** Additional information about this privilege assignment */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Type of privileged role */
  type?: InputMaybe<RoleTypeEnum>;
  /** Teacher identifier with role access */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum RoleTypeEnum {
  /** Full system administration access with ability to manage users, roles, and system configuration */
  Admin = 'ADMIN',
  /** Member of the course assignment committee with extra abilities during the assignments phase */
  Commissioner = 'COMMISSIONER',
  /** Base role with limited abilities */
  Teacher = 'TEACHER'
}

/** Methods to use when ordering `Role`. */
export enum RolesOrderBy {
  CommentAsc = 'COMMENT_ASC',
  CommentDesc = 'COMMENT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UidAsc = 'UID_ASC',
  UidDesc = 'UID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Annual teaching service records tracking required hours and modifications */
export type Service = Node & {
  __typename?: 'Service';
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Required teaching hours for the year before modifications */
  hours: Scalars['Float']['output'];
  /** Unique service identifier */
  id: Scalars['Int']['output'];
  /** Optional message from teacher to course assignment committee */
  message?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Priority`. */
  prioritiesByYearValueAndServiceId: Array<Priority>;
  /** Reads and enables pagination through a set of `Request`. */
  requestsByYearValueAndServiceId: Array<Request>;
  /** Reads and enables pagination through a set of `ServiceModification`. */
  serviceModifications: Array<ServiceModification>;
  /** Reads a single `Teacher` that is related to this `Service`. */
  teacher: Teacher;
  /** Teacher identifier linking to teacher table */
  uid: Scalars['String']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `Year` that is related to this `Service`. */
  year: Year;
  /** Academic year for this service record */
  yearValue: Scalars['Int']['output'];
};


/** Annual teaching service records tracking required hours and modifications */
export type ServicePrioritiesByYearValueAndServiceIdArgs = {
  condition?: InputMaybe<PriorityCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PrioritiesOrderBy>>;
};


/** Annual teaching service records tracking required hours and modifications */
export type ServiceRequestsByYearValueAndServiceIdArgs = {
  condition?: InputMaybe<RequestCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestsOrderBy>>;
};


/** Annual teaching service records tracking required hours and modifications */
export type ServiceServiceModificationsArgs = {
  condition?: InputMaybe<ServiceModificationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationsOrderBy>>;
};

/** A condition to be used against `Service` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ServiceCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `hours` field. */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `message` field. */
  message?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `uid` field. */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `yearValue` field. */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Service` */
export type ServiceInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Required teaching hours for the year before modifications */
  hours: Scalars['Float']['input'];
  /** Optional message from teacher to course assignment committee */
  message?: InputMaybe<Scalars['String']['input']>;
  /** Teacher identifier linking to teacher table */
  uid: Scalars['String']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Academic year for this service record */
  yearValue: Scalars['Int']['input'];
};

/** Individual modifications to base teaching service hours */
export type ServiceModification = Node & {
  __typename?: 'ServiceModification';
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Hour adjustment amount (negative values increase required hours) */
  hours: Scalars['Float']['output'];
  /** Unique modification identifier */
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Service` that is related to this `ServiceModification`. */
  service: Service;
  /** Reference to affected service record */
  serviceId: Scalars['Int']['output'];
  /** Reads a single `ServiceModificationType` that is related to this `ServiceModification`. */
  type: ServiceModificationType;
  /** Reference to service modification type */
  typeId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `ServiceModification` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type ServiceModificationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `hours` field. */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `serviceId` field. */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `typeId` field. */
  typeId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `ServiceModification` */
export type ServiceModificationInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours: Scalars['Float']['input'];
  /** Reference to affected service record */
  serviceId: Scalars['Int']['input'];
  /** Reference to service modification type */
  typeId: Scalars['Int']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Represents an update to a `ServiceModification`. Fields that are set will be updated. */
export type ServiceModificationPatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to service modification type */
  typeId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Categories of service hour modifications */
export type ServiceModificationType = Node & {
  __typename?: 'ServiceModificationType';
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Detailed explanation of the modification type and its application */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique modification type identifier */
  id: Scalars['Int']['output'];
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `ServiceModification`. */
  serviceModificationsByTypeId: Array<ServiceModification>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
};


/** Categories of service hour modifications */
export type ServiceModificationTypeServiceModificationsByTypeIdArgs = {
  condition?: InputMaybe<ServiceModificationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationsOrderBy>>;
};

/**
 * A condition to be used against `ServiceModificationType` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type ServiceModificationTypeCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `label` field. */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `ServiceModificationType` */
export type ServiceModificationTypeInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Detailed explanation of the modification type and its application */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Represents an update to a `ServiceModificationType`. Fields that are set will be updated. */
export type ServiceModificationTypePatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Detailed explanation of the modification type and its application */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `ServiceModificationType`. */
export enum ServiceModificationTypesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LabelAsc = 'LABEL_ASC',
  LabelDesc = 'LABEL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Methods to use when ordering `ServiceModification`. */
export enum ServiceModificationsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  HoursAsc = 'HOURS_ASC',
  HoursDesc = 'HOURS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ServiceIdAsc = 'SERVICE_ID_ASC',
  ServiceIdDesc = 'SERVICE_ID_DESC',
  TypeIdAsc = 'TYPE_ID_ASC',
  TypeIdDesc = 'TYPE_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Service`. Fields that are set will be updated. */
export type ServicePatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Optional message from teacher to course assignment committee */
  message?: InputMaybe<Scalars['String']['input']>;
  /** Teacher identifier linking to teacher table */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Academic year for this service record */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

/** Methods to use when ordering `Service`. */
export enum ServicesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  HoursAsc = 'HOURS_ASC',
  HoursDesc = 'HOURS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MessageAsc = 'MESSAGE_ASC',
  MessageDesc = 'MESSAGE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UidAsc = 'UID_ASC',
  UidDesc = 'UID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  YearValueAsc = 'YEAR_VALUE_ASC',
  YearValueDesc = 'YEAR_VALUE_DESC'
}

/** Core teacher information and status */
export type Teacher = Node & {
  __typename?: 'Teacher';
  /** Controls system access and automatic service creation for upcoming years */
  active: Scalars['Boolean']['output'];
  /** Optional display name, used instead of first/last name when set */
  alias?: Maybe<Scalars['String']['output']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Reads and enables pagination through a set of `Coordination`. */
  coordinationsByUid: Array<Coordination>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: Maybe<Scalars['String']['output']>;
  /** Teacher's first name */
  firstname: Scalars['String']['output'];
  /** Teacher's last name */
  lastname: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Position` that is related to this `Teacher`. */
  position?: Maybe<Position>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Int']['output']>;
  /** Reads and enables pagination through a set of `Role`. */
  rolesByUid: Array<Role>;
  /** Reads and enables pagination through a set of `Service`. */
  servicesByUid: Array<Service>;
  /** Teacher's email address (primary key). */
  uid: Scalars['String']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Controls teacher visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Core teacher information and status */
export type TeacherCoordinationsByUidArgs = {
  condition?: InputMaybe<CoordinationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationsOrderBy>>;
};


/** Core teacher information and status */
export type TeacherRolesByUidArgs = {
  condition?: InputMaybe<RoleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolesOrderBy>>;
};


/** Core teacher information and status */
export type TeacherServicesByUidArgs = {
  condition?: InputMaybe<ServiceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServicesOrderBy>>;
};

/** A condition to be used against `Teacher` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TeacherCondition = {
  /** Checks for equality with the object’s `active` field. */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `alias` field. */
  alias?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `baseServiceHours` field. */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `displayname` field. */
  displayname?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `firstname` field. */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lastname` field. */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionId` field. */
  positionId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `uid` field. */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `visible` field. */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `Teacher` */
export type TeacherInput = {
  /** Controls system access and automatic service creation for upcoming years */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional display name, used instead of first/last name when set */
  alias?: InputMaybe<Scalars['String']['input']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's first name */
  firstname: Scalars['String']['input'];
  /** Teacher's last name */
  lastname: Scalars['String']['input'];
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<Scalars['Int']['input']>;
  /** Teacher's email address (primary key). */
  uid: Scalars['String']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls teacher visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents an update to a `Teacher`. Fields that are set will be updated. */
export type TeacherPatch = {
  /** Controls system access and automatic service creation for upcoming years */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional display name, used instead of first/last name when set */
  alias?: InputMaybe<Scalars['String']['input']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's first name */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's last name */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<Scalars['Int']['input']>;
  /** Teacher's email address (primary key). */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls teacher visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `Teacher`. */
export enum TeachersOrderBy {
  ActiveAsc = 'ACTIVE_ASC',
  ActiveDesc = 'ACTIVE_DESC',
  AliasAsc = 'ALIAS_ASC',
  AliasDesc = 'ALIAS_DESC',
  BaseServiceHoursAsc = 'BASE_SERVICE_HOURS_ASC',
  BaseServiceHoursDesc = 'BASE_SERVICE_HOURS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DisplaynameAsc = 'DISPLAYNAME_ASC',
  DisplaynameDesc = 'DISPLAYNAME_DESC',
  FirstnameAsc = 'FIRSTNAME_ASC',
  FirstnameDesc = 'FIRSTNAME_DESC',
  LastnameAsc = 'LASTNAME_ASC',
  LastnameDesc = 'LASTNAME_DESC',
  Natural = 'NATURAL',
  PositionIdAsc = 'POSITION_ID_ASC',
  PositionIdDesc = 'POSITION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UidAsc = 'UID_ASC',
  UidDesc = 'UID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VisibleAsc = 'VISIBLE_ASC',
  VisibleDesc = 'VISIBLE_DESC'
}

/** Specialization tracks within academic programs */
export type Track = Node & {
  __typename?: 'Track';
  /** Reads and enables pagination through a set of `Coordination`. */
  coordinations: Array<Coordination>;
  /** Reads and enables pagination through a set of `Course`. */
  coursesByTrackIdAndProgramId: Array<Course>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Unique track identifier */
  id: Scalars['Int']['output'];
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name: Scalars['String']['output'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated track name */
  nameShort?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Program` that is related to this `Track`. */
  program: Program;
  /** Parent program for this track */
  programId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Controls track visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Specialization tracks within academic programs */
export type TrackCoordinationsArgs = {
  condition?: InputMaybe<CoordinationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationsOrderBy>>;
};


/** Specialization tracks within academic programs */
export type TrackCoursesByTrackIdAndProgramIdArgs = {
  condition?: InputMaybe<CourseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoursesOrderBy>>;
};

/** A condition to be used against `Track` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TrackCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nameDisplay` field. */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nameShort` field. */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `programId` field. */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `visible` field. */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `Track` */
export type TrackInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name: Scalars['String']['input'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated track name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Parent program for this track */
  programId: Scalars['Int']['input'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls track visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents an update to a `Track`. Fields that are set will be updated. */
export type TrackPatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated track name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Parent program for this track */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Controls track visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `Track`. */
export enum TracksOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NameDisplayAsc = 'NAME_DISPLAY_ASC',
  NameDisplayDesc = 'NAME_DISPLAY_DESC',
  NameShortAsc = 'NAME_SHORT_ASC',
  NameShortDesc = 'NAME_SHORT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProgramIdAsc = 'PROGRAM_ID_ASC',
  ProgramIdDesc = 'PROGRAM_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VisibleAsc = 'VISIBLE_ASC',
  VisibleDesc = 'VISIBLE_DESC'
}

/** All input for the `updateAppSettingByNodeId` mutation. */
export type UpdateAppSettingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppSetting` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AppSetting` being updated. */
  patch: AppSettingPatch;
};

/** All input for the `updateAppSetting` mutation. */
export type UpdateAppSettingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Text identifier */
  key: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `AppSetting` being updated. */
  patch: AppSettingPatch;
};

/** The output of our update `AppSetting` mutation. */
export type UpdateAppSettingPayload = {
  __typename?: 'UpdateAppSettingPayload';
  /** The `AppSetting` that was updated by this mutation. */
  appSetting?: Maybe<AppSetting>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateCoordinationByNodeId` mutation. */
export type UpdateCoordinationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Coordination` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Coordination` being updated. */
  patch: CoordinationPatch;
};

/** All input for the `updateCoordinationByUidAndCourseIdAndTrackIdAndProgramId` mutation. */
export type UpdateCoordinationByUidAndCourseIdAndTrackIdAndProgramIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Coordination` being updated. */
  patch: CoordinationPatch;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId: Scalars['Int']['input'];
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId: Scalars['Int']['input'];
  /** Coordinating teacher */
  uid: Scalars['String']['input'];
};

/** All input for the `updateCoordination` mutation. */
export type UpdateCoordinationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique coordination identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Coordination` being updated. */
  patch: CoordinationPatch;
};

/** The output of our update `Coordination` mutation. */
export type UpdateCoordinationPayload = {
  __typename?: 'UpdateCoordinationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Coordination` that was updated by this mutation. */
  coordination?: Maybe<Coordination>;
  /** Reads a single `Course` that is related to this `Coordination`. */
  course?: Maybe<Course>;
  /** Reads a single `Program` that is related to this `Coordination`. */
  program?: Maybe<Program>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Teacher` that is related to this `Coordination`. */
  teacher: Teacher;
  /** Reads a single `Track` that is related to this `Coordination`. */
  track?: Maybe<Track>;
};

/** All input for the `updateCourseByIdAndYearValue` mutation. */
export type UpdateCourseByIdAndYearValueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique course identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Course` being updated. */
  patch: CoursePatch;
  /** Academic year when the course is offered */
  yearValue: Scalars['Int']['input'];
};

/** All input for the `updateCourseByNodeId` mutation. */
export type UpdateCourseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Course` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Course` being updated. */
  patch: CoursePatch;
};

/** All input for the `updateCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeId` mutation. */
export type UpdateCourseByYearValueAndProgramIdAndTrackIdAndNameAndSemesterAndTypeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Full course name */
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Course` being updated. */
  patch: CoursePatch;
  /** Program offering this course */
  programId: Scalars['Int']['input'];
  /** Academic semester (1-6) */
  semester: Scalars['Int']['input'];
  /** Optional track specialization for this course */
  trackId: Scalars['Int']['input'];
  /** Reference to course delivery type affecting workload calculation */
  typeId: Scalars['Int']['input'];
  /** Academic year when the course is offered */
  yearValue: Scalars['Int']['input'];
};

/** All input for the `updateCourse` mutation. */
export type UpdateCourseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique course identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Course` being updated. */
  patch: CoursePatch;
};

/** The output of our update `Course` mutation. */
export type UpdateCoursePayload = {
  __typename?: 'UpdateCoursePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Course` that was updated by this mutation. */
  course?: Maybe<Course>;
  /** Reads a single `Program` that is related to this `Course`. */
  program: Program;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Track` that is related to this `Course`. */
  trackProgram?: Maybe<Track>;
  /** Reads a single `CourseType` that is related to this `Course`. */
  type: CourseType;
  /** Reads a single `Year` that is related to this `Course`. */
  year: Year;
};

/** All input for the `updateCourseTypeByLabel` mutation. */
export type UpdateCourseTypeByLabelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `CourseType` being updated. */
  patch: CourseTypePatch;
};

/** All input for the `updateCourseTypeByNodeId` mutation. */
export type UpdateCourseTypeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CourseType` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `CourseType` being updated. */
  patch: CourseTypePatch;
};

/** All input for the `updateCourseType` mutation. */
export type UpdateCourseTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique course type identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `CourseType` being updated. */
  patch: CourseTypePatch;
};

/** The output of our update `CourseType` mutation. */
export type UpdateCourseTypePayload = {
  __typename?: 'UpdateCourseTypePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CourseType` that was updated by this mutation. */
  courseType?: Maybe<CourseType>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateCurrentPhaseByNodeId` mutation. */
export type UpdateCurrentPhaseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CurrentPhase` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `CurrentPhase` being updated. */
  patch: CurrentPhasePatch;
};

/** All input for the `updateCurrentPhase` mutation. */
export type UpdateCurrentPhaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Primary key with constraint to ensure only one record exists */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `CurrentPhase` being updated. */
  patch: CurrentPhasePatch;
};

/** The output of our update `CurrentPhase` mutation. */
export type UpdateCurrentPhasePayload = {
  __typename?: 'UpdateCurrentPhasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CurrentPhase` that was updated by this mutation. */
  currentPhase?: Maybe<CurrentPhase>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateDegreeByName` mutation. */
export type UpdateDegreeByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Degree` being updated. */
  patch: DegreePatch;
};

/** All input for the `updateDegreeByNodeId` mutation. */
export type UpdateDegreeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Degree` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Degree` being updated. */
  patch: DegreePatch;
};

/** All input for the `updateDegree` mutation. */
export type UpdateDegreeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique degree identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Degree` being updated. */
  patch: DegreePatch;
};

/** The output of our update `Degree` mutation. */
export type UpdateDegreePayload = {
  __typename?: 'UpdateDegreePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Degree` that was updated by this mutation. */
  degree?: Maybe<Degree>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updatePositionByLabel` mutation. */
export type UpdatePositionByLabelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable position name for display purposes, unique */
  label: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Position` being updated. */
  patch: PositionPatch;
};

/** All input for the `updatePositionByNodeId` mutation. */
export type UpdatePositionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Position` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Position` being updated. */
  patch: PositionPatch;
};

/** All input for the `updatePosition` mutation. */
export type UpdatePositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique position identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Position` being updated. */
  patch: PositionPatch;
};

/** The output of our update `Position` mutation. */
export type UpdatePositionPayload = {
  __typename?: 'UpdatePositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Position` that was updated by this mutation. */
  position?: Maybe<Position>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updatePriorityByNodeId` mutation. */
export type UpdatePriorityByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Priority` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Priority` being updated. */
  patch: PriorityPatch;
};

/** All input for the `updatePriorityByServiceIdAndCourseId` mutation. */
export type UpdatePriorityByServiceIdAndCourseIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Course for which priority is tracked */
  courseId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Priority` being updated. */
  patch: PriorityPatch;
  /** Associated teacher service record */
  serviceId: Scalars['Int']['input'];
};

/** All input for the `updatePriority` mutation. */
export type UpdatePriorityInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique priority record identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Priority` being updated. */
  patch: PriorityPatch;
};

/** The output of our update `Priority` mutation. */
export type UpdatePriorityPayload = {
  __typename?: 'UpdatePriorityPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Course` that is related to this `Priority`. */
  courseByYearValueAndCourseId: Course;
  /** The `Priority` that was updated by this mutation. */
  priority?: Maybe<Priority>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Service` that is related to this `Priority`. */
  serviceByYearValueAndServiceId: Service;
  /** Reads a single `Year` that is related to this `Priority`. */
  year: Year;
};

/** All input for the `updateProgramByDegreeIdAndName` mutation. */
export type UpdateProgramByDegreeIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Parent degree for this program */
  degreeId: Scalars['Int']['input'];
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Program` being updated. */
  patch: ProgramPatch;
};

/** All input for the `updateProgramByNodeId` mutation. */
export type UpdateProgramByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Program` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Program` being updated. */
  patch: ProgramPatch;
};

/** All input for the `updateProgram` mutation. */
export type UpdateProgramInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique program identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Program` being updated. */
  patch: ProgramPatch;
};

/** The output of our update `Program` mutation. */
export type UpdateProgramPayload = {
  __typename?: 'UpdateProgramPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Degree` that is related to this `Program`. */
  degree: Degree;
  /** The `Program` that was updated by this mutation. */
  program?: Maybe<Program>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateRequestByNodeId` mutation. */
export type UpdateRequestByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Request` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Request` being updated. */
  patch: RequestPatch;
};

/** All input for the `updateRequestByServiceIdAndCourseIdAndType` mutation. */
export type UpdateRequestByServiceIdAndCourseIdAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Requested or assigned course */
  courseId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Request` being updated. */
  patch: RequestPatch;
  serviceId: Scalars['Int']['input'];
  /** Type of request (primary choice, backup, or final assignment) */
  type: RequestTypeEnum;
};

/** All input for the `updateRequest` mutation. */
export type UpdateRequestInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique request identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Request` being updated. */
  patch: RequestPatch;
};

/** The output of our update `Request` mutation. */
export type UpdateRequestPayload = {
  __typename?: 'UpdateRequestPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Course` that is related to this `Request`. */
  courseByYearValueAndCourseId: Course;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Request` that was updated by this mutation. */
  request?: Maybe<Request>;
  /** Reads a single `Service` that is related to this `Request`. */
  serviceByYearValueAndServiceId: Service;
  /** Reads a single `VService` that is related to this `Request`. */
  vServiceByServiceId: VService;
  /** Reads a single `Year` that is related to this `Request`. */
  year: Year;
};

/** All input for the `updateRoleByNodeId` mutation. */
export type UpdateRoleByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Role` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Role` being updated. */
  patch: RolePatch;
};

/** All input for the `updateRoleByUidAndType` mutation. */
export type UpdateRoleByUidAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Role` being updated. */
  patch: RolePatch;
  /** Type of privileged role */
  type: RoleTypeEnum;
  /** Teacher identifier with role access */
  uid: Scalars['String']['input'];
};

/** All input for the `updateRole` mutation. */
export type UpdateRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique role assignment identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Role` being updated. */
  patch: RolePatch;
};

/** The output of our update `Role` mutation. */
export type UpdateRolePayload = {
  __typename?: 'UpdateRolePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Role` that was updated by this mutation. */
  role?: Maybe<Role>;
  /** Reads a single `Teacher` that is related to this `Role`. */
  teacher: Teacher;
};

/** All input for the `updateServiceByIdAndYearValue` mutation. */
export type UpdateServiceByIdAndYearValueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique service identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Service` being updated. */
  patch: ServicePatch;
  /** Academic year for this service record */
  yearValue: Scalars['Int']['input'];
};

/** All input for the `updateServiceByNodeId` mutation. */
export type UpdateServiceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Service` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Service` being updated. */
  patch: ServicePatch;
};

/** All input for the `updateServiceByYearValueAndUid` mutation. */
export type UpdateServiceByYearValueAndUidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Service` being updated. */
  patch: ServicePatch;
  /** Teacher identifier linking to teacher table */
  uid: Scalars['String']['input'];
  /** Academic year for this service record */
  yearValue: Scalars['Int']['input'];
};

/** All input for the `updateService` mutation. */
export type UpdateServiceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique service identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Service` being updated. */
  patch: ServicePatch;
};

/** All input for the `updateServiceModificationByNodeId` mutation. */
export type UpdateServiceModificationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ServiceModification` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `ServiceModification` being updated. */
  patch: ServiceModificationPatch;
};

/** All input for the `updateServiceModification` mutation. */
export type UpdateServiceModificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique modification identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `ServiceModification` being updated. */
  patch: ServiceModificationPatch;
};

/** The output of our update `ServiceModification` mutation. */
export type UpdateServiceModificationPayload = {
  __typename?: 'UpdateServiceModificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Service` that is related to this `ServiceModification`. */
  service: Service;
  /** The `ServiceModification` that was updated by this mutation. */
  serviceModification?: Maybe<ServiceModification>;
  /** Reads a single `ServiceModificationType` that is related to this `ServiceModification`. */
  type: ServiceModificationType;
};

/** All input for the `updateServiceModificationTypeByLabel` mutation. */
export type UpdateServiceModificationTypeByLabelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `ServiceModificationType` being updated. */
  patch: ServiceModificationTypePatch;
};

/** All input for the `updateServiceModificationTypeByNodeId` mutation. */
export type UpdateServiceModificationTypeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ServiceModificationType` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `ServiceModificationType` being updated. */
  patch: ServiceModificationTypePatch;
};

/** All input for the `updateServiceModificationType` mutation. */
export type UpdateServiceModificationTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique modification type identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `ServiceModificationType` being updated. */
  patch: ServiceModificationTypePatch;
};

/** The output of our update `ServiceModificationType` mutation. */
export type UpdateServiceModificationTypePayload = {
  __typename?: 'UpdateServiceModificationTypePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ServiceModificationType` that was updated by this mutation. */
  serviceModificationType?: Maybe<ServiceModificationType>;
};

/** The output of our update `Service` mutation. */
export type UpdateServicePayload = {
  __typename?: 'UpdateServicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Service` that was updated by this mutation. */
  service?: Maybe<Service>;
  /** Reads a single `Teacher` that is related to this `Service`. */
  teacher: Teacher;
  /** Reads a single `Year` that is related to this `Service`. */
  year: Year;
};

/** All input for the `updateTeacherByNodeId` mutation. */
export type UpdateTeacherByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Teacher` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Teacher` being updated. */
  patch: TeacherPatch;
};

/** All input for the `updateTeacher` mutation. */
export type UpdateTeacherInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Teacher` being updated. */
  patch: TeacherPatch;
  /** Teacher's email address (primary key). */
  uid: Scalars['String']['input'];
};

/** The output of our update `Teacher` mutation. */
export type UpdateTeacherPayload = {
  __typename?: 'UpdateTeacherPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Position` that is related to this `Teacher`. */
  position?: Maybe<Position>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Teacher` that was updated by this mutation. */
  teacher?: Maybe<Teacher>;
};

/** All input for the `updateTrackByIdAndProgramId` mutation. */
export type UpdateTrackByIdAndProgramIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique track identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Track` being updated. */
  patch: TrackPatch;
  /** Parent program for this track */
  programId: Scalars['Int']['input'];
};

/** All input for the `updateTrackByNodeId` mutation. */
export type UpdateTrackByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Track` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Track` being updated. */
  patch: TrackPatch;
};

/** All input for the `updateTrackByProgramIdAndName` mutation. */
export type UpdateTrackByProgramIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Track` being updated. */
  patch: TrackPatch;
  /** Parent program for this track */
  programId: Scalars['Int']['input'];
};

/** All input for the `updateTrack` mutation. */
export type UpdateTrackInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique track identifier */
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Track` being updated. */
  patch: TrackPatch;
};

/** The output of our update `Track` mutation. */
export type UpdateTrackPayload = {
  __typename?: 'UpdateTrackPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Program` that is related to this `Track`. */
  program: Program;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Track` that was updated by this mutation. */
  track?: Maybe<Track>;
};

/** All input for the `updateYearByNodeId` mutation. */
export type UpdateYearByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Year` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Year` being updated. */
  patch: YearPatch;
};

/** All input for the `updateYear` mutation. */
export type UpdateYearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Year` being updated. */
  patch: YearPatch;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value: Scalars['Int']['input'];
};

/** The output of our update `Year` mutation. */
export type UpdateYearPayload = {
  __typename?: 'UpdateYearPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Year` that was updated by this mutation. */
  year?: Maybe<Year>;
};

/** Non-sensitive service data for general user access */
export type VService = {
  __typename?: 'VService';
  id?: Maybe<Scalars['Int']['output']>;
  /** Reads and enables pagination through a set of `Request`. */
  requestsByServiceId: Array<Request>;
  uid: Scalars['String']['output'];
  /** Reads a single `VTeacher` that is related to this `VService`. */
  vTeacherByUid: VTeacher;
  /** Reads a single `Year` that is related to this `VService`. */
  year: Year;
  yearValue: Scalars['Int']['output'];
};


/** Non-sensitive service data for general user access */
export type VServiceRequestsByServiceIdArgs = {
  condition?: InputMaybe<RequestCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestsOrderBy>>;
};

/**
 * A condition to be used against `VService` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type VServiceCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `uid` field. */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `yearValue` field. */
  yearValue?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `VService` */
export type VServiceInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  uid: Scalars['String']['input'];
  yearValue: Scalars['Int']['input'];
};

/** Methods to use when ordering `VService`. */
export enum VServicesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  UidAsc = 'UID_ASC',
  UidDesc = 'UID_DESC',
  YearValueAsc = 'YEAR_VALUE_ASC',
  YearValueDesc = 'YEAR_VALUE_DESC'
}

/** Non-sensitive teacher data for general user access */
export type VTeacher = {
  __typename?: 'VTeacher';
  alias?: Maybe<Scalars['String']['output']>;
  displayname: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  uid: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `VService`. */
  vServicesByUid: Array<VService>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};


/** Non-sensitive teacher data for general user access */
export type VTeacherVServicesByUidArgs = {
  condition?: InputMaybe<VServiceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VServicesOrderBy>>;
};

/**
 * A condition to be used against `VTeacher` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type VTeacherCondition = {
  /** Checks for equality with the object’s `alias` field. */
  alias?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `displayname` field. */
  displayname?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `firstname` field. */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lastname` field. */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `uid` field. */
  uid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `visible` field. */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `VTeacher` */
export type VTeacherInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  displayname: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `VTeacher`. */
export enum VTeachersOrderBy {
  AliasAsc = 'ALIAS_ASC',
  AliasDesc = 'ALIAS_DESC',
  DisplaynameAsc = 'DISPLAYNAME_ASC',
  DisplaynameDesc = 'DISPLAYNAME_DESC',
  FirstnameAsc = 'FIRSTNAME_ASC',
  FirstnameDesc = 'FIRSTNAME_DESC',
  LastnameAsc = 'LASTNAME_ASC',
  LastnameDesc = 'LASTNAME_DESC',
  Natural = 'NATURAL',
  UidAsc = 'UID_ASC',
  UidDesc = 'UID_DESC',
  VisibleAsc = 'VISIBLE_ASC',
  VisibleDesc = 'VISIBLE_DESC'
}

/** Academic year definitions with current year designation and visibility settings */
export type Year = Node & {
  __typename?: 'Year';
  /** Reads and enables pagination through a set of `Course`. */
  coursesByYearValue: Array<Course>;
  /** Timestamp when the record was created */
  createdAt: Scalars['Datetime']['output'];
  /** Current academic year flag. Constrained to have at most one current year */
  current: Scalars['Boolean']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Priority`. */
  prioritiesByYearValue: Array<Priority>;
  /** Reads and enables pagination through a set of `Request`. */
  requestsByYearValue: Array<Request>;
  /** Reads and enables pagination through a set of `Service`. */
  servicesByYearValue: Array<Service>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['Datetime']['output'];
  /** Reads and enables pagination through a set of `VService`. */
  vServicesByYearValue: Array<VService>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value: Scalars['Int']['output'];
  /** Controls visibility of the year in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Academic year definitions with current year designation and visibility settings */
export type YearCoursesByYearValueArgs = {
  condition?: InputMaybe<CourseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoursesOrderBy>>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearPrioritiesByYearValueArgs = {
  condition?: InputMaybe<PriorityCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PrioritiesOrderBy>>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearRequestsByYearValueArgs = {
  condition?: InputMaybe<RequestCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestsOrderBy>>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearServicesByYearValueArgs = {
  condition?: InputMaybe<ServiceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServicesOrderBy>>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearVServicesByYearValueArgs = {
  condition?: InputMaybe<VServiceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VServicesOrderBy>>;
};

/** A condition to be used against `Year` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type YearCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `current` field. */
  current?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `value` field. */
  value?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `visible` field. */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `Year` */
export type YearInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current academic year flag. Constrained to have at most one current year */
  current?: InputMaybe<Scalars['Boolean']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value: Scalars['Int']['input'];
  /** Controls visibility of the year in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents an update to a `Year`. Fields that are set will be updated. */
export type YearPatch = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current academic year flag. Constrained to have at most one current year */
  current?: InputMaybe<Scalars['Boolean']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: InputMaybe<Scalars['Int']['input']>;
  /** Controls visibility of the year in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `Year`. */
export enum YearsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CurrentAsc = 'CURRENT_ASC',
  CurrentDesc = 'CURRENT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC',
  VisibleAsc = 'VISIBLE_ASC',
  VisibleDesc = 'VISIBLE_DESC'
}

export type GetAppDataQueryVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type GetAppDataQuery = { __typename?: 'Query', currentPhase?: { __typename?: 'CurrentPhase', value?: PhaseEnum | null } | null, years?: Array<{ __typename?: 'Year', value: number, current: boolean, visible: boolean }> | null, appSettings?: Array<{ __typename?: 'AppSetting', key: string, value?: string | null }> | null, services?: Array<{ __typename?: 'Service', id: number, year: number }> | null };

export type CourseRowFragment = { __typename?: 'Course', id: number, visible: boolean, semester: number, name?: string | null, hoursPerGroup?: number | null, numberOfGroups?: number | null, program: { __typename?: 'Program', id: number, visible: boolean, name?: string | null, degree: { __typename?: 'Degree', visible: boolean, name?: string | null } }, track?: { __typename?: 'Track', visible: boolean, name?: string | null } | null, type: { __typename?: 'CourseType', label: string, coefficient: number }, requests: Array<{ __typename?: 'Request', serviceId: number, type: RequestTypeEnum, hours: number, isPriority?: boolean | null }> } & { ' $fragmentName'?: 'CourseRowFragment' };

export type TableCoursesVServiceFragment = { __typename?: 'VService', id?: number | null, teacher: { __typename?: 'VTeacher', displayname: string } } & { ' $fragmentName'?: 'TableCoursesVServiceFragment' };

export type ServiceRowFragment = { __typename?: 'Service', id: number, hours: number, message?: string | null, teacher: { __typename?: 'Teacher', firstname: string, lastname: string, alias?: string | null, visible: boolean }, modifications: Array<{ __typename?: 'ServiceModification', hours: number }>, requests: Array<{ __typename?: 'Request', type: RequestTypeEnum, hoursWeighted?: number | null }> } & { ' $fragmentName'?: 'ServiceRowFragment' };

export type TeacherServiceDetailsFragment = { __typename?: 'Service', id: number, uid: string, yearValue: number, hours: number, modifications: Array<{ __typename?: 'ServiceModification', id: number, hours: number, modificationType: { __typename?: 'ServiceModificationType', label: string } }> } & { ' $fragmentName'?: 'TeacherServiceDetailsFragment' };

export type UpdateServiceMutationVariables = Exact<{
  year: Scalars['Int']['input'];
  uid: Scalars['String']['input'];
  hours: Scalars['Float']['input'];
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateServiceByYearValueAndUid?: { __typename?: 'UpdateServicePayload', service?: { __typename?: 'Service', id: number } | null } | null };

export type GetModificationTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModificationTypesQuery = { __typename?: 'Query', modificationTypes?: Array<{ __typename?: 'ServiceModificationType', id: number, label: string, description?: string | null }> | null };

export type InsertModificationMutationVariables = Exact<{
  serviceId: Scalars['Int']['input'];
  modificationTypeId: Scalars['Int']['input'];
  hours: Scalars['Float']['input'];
}>;


export type InsertModificationMutation = { __typename?: 'Mutation', createServiceModification?: { __typename?: 'CreateServiceModificationPayload', serviceModification?: { __typename?: 'ServiceModification', id: number } | null } | null };

export type DeleteModificationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteModificationMutation = { __typename?: 'Mutation', deleteServiceModification?: { __typename?: 'DeleteServiceModificationPayload', serviceModification?: { __typename?: 'ServiceModification', id: number } | null } | null };

export type TeacherServiceMessageFragment = { __typename?: 'Service', id: number, uid: string, message?: string | null } & { ' $fragmentName'?: 'TeacherServiceMessageFragment' };

export type UpdateMessageMutationVariables = Exact<{
  serviceId: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateService?: { __typename?: 'UpdateServicePayload', service?: { __typename?: 'Service', id: number } | null } | null };

export type TeacherCoordinationsFragment = { __typename?: 'Teacher', coordinations: Array<{ __typename?: 'Coordination', id: number, comment?: string | null, program?: { __typename?: 'Program', id: number, name?: string | null, degree: { __typename?: 'Degree', name?: string | null } } | null, track?: { __typename?: 'Track', id: number, name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } } } | null, course?: { __typename?: 'Course', id: number, yearValue: number, name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } }, track?: { __typename?: 'Track', name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } } } | null } | null }> } & { ' $fragmentName'?: 'TeacherCoordinationsFragment' };

export type GetRequestsQueryVariables = Exact<{
  condition?: InputMaybe<RequestCondition>;
}>;


export type GetRequestsQuery = { __typename?: 'Query', requests?: Array<{ __typename?: 'Request', course: { __typename?: 'Course', id: number, semester: number, name?: string | null, program: { __typename?: 'Program', id: number, name?: string | null, degree: { __typename?: 'Degree', id: number, name?: string | null } }, track?: { __typename?: 'Track', id: number, name?: string | null, program: { __typename?: 'Program', id: number, name?: string | null, degree: { __typename?: 'Degree', id: number, name?: string | null } } } | null, type: { __typename?: 'CourseType', label: string } }, service: { __typename?: 'VService', teacher: { __typename?: 'VTeacher', uid: string, firstname?: string | null, lastname?: string | null, displayname: string } } }> | null };

export type DummyMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type DummyMutationMutation = { __typename?: 'Mutation', dummyMutation?: { __typename?: 'DummyMutationPayload', clientMutationId?: string | null } | null };

export const CourseRowFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseRow"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"track"},"name":{"kind":"Name","value":"trackProgram"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"coefficient"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}},{"kind":"Field","alias":{"kind":"Name","value":"numberOfGroups"},"name":{"kind":"Name","value":"groupsEffective"}},{"kind":"Field","alias":{"kind":"Name","value":"requests"},"name":{"kind":"Name","value":"requestsByYearValueAndCourseId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}}]}}]} as unknown as DocumentNode<CourseRowFragment, unknown>;
export const TableCoursesVServiceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TableCoursesVService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VService"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"teacher"},"name":{"kind":"Name","value":"vTeacherByUid"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]} as unknown as DocumentNode<TableCoursesVServiceFragment, unknown>;
export const ServiceRowFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceRow"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","alias":{"kind":"Name","value":"modifications"},"name":{"kind":"Name","value":"serviceModifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"requests"},"name":{"kind":"Name","value":"requestsByYearValueAndServiceId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<ServiceRowFragment, unknown>;
export const TeacherServiceDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherServiceDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"yearValue"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","alias":{"kind":"Name","value":"modifications"},"name":{"kind":"Name","value":"serviceModifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"TYPE_ID_ASC"},{"kind":"EnumValue","value":"HOURS_ASC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"modificationType"},"name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}}]}}]} as unknown as DocumentNode<TeacherServiceDetailsFragment, unknown>;
export const TeacherServiceMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherServiceMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<TeacherServiceMessageFragment, unknown>;
export const TeacherCoordinationsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherCoordinations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"coordinations"},"name":{"kind":"Name","value":"coordinationsByUid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"PROGRAM_ID_ASC"},{"kind":"EnumValue","value":"TRACK_ID_ASC"},{"kind":"EnumValue","value":"COURSE_ID_ASC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yearValue"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"track"},"name":{"kind":"Name","value":"trackProgram"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<TeacherCoordinationsFragment, unknown>;
export const GetAppDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPhase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"years"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"VALUE_DESC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"appSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"KEY_ASC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"services"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"year"},"name":{"kind":"Name","value":"yearValue"}}]}}]}}]} as unknown as DocumentNode<GetAppDataQuery, GetAppDataQueryVariables>;
export const UpdateServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hours"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateServiceByYearValueAndUid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"yearValue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patch"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hours"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const GetModificationTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetModificationTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"modificationTypes"},"name":{"kind":"Name","value":"serviceModificationTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"LABEL_ASC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetModificationTypesQuery, GetModificationTypesQueryVariables>;
export const InsertModificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertModification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modificationTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hours"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createServiceModification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"serviceModification"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"typeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modificationTypeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hours"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceModification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertModificationMutation, InsertModificationMutationVariables>;
export const DeleteModificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteModification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteServiceModification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceModification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteModificationMutation, DeleteModificationMutationVariables>;
export const UpdateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patch"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const GetRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"condition"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestCondition"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"requests"},"name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"condition"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"course"},"name":{"kind":"Name","value":"courseByYearValueAndCourseId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"track"},"name":{"kind":"Name","value":"trackProgram"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"service"},"name":{"kind":"Name","value":"vServiceByServiceId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"teacher"},"name":{"kind":"Name","value":"vTeacherByUid"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRequestsQuery, GetRequestsQueryVariables>;
export const DummyMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DummyMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dummyMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientMutationId"}}]}}]}}]} as unknown as DocumentNode<DummyMutationMutation, DummyMutationMutationVariables>;