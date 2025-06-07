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
  service_scalar: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

/** Application settings (e.g., custom UI parameters) */
export type AppSetting = {
  __typename?: 'AppSetting';
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Text identifier */
  key: Scalars['String']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Text content */
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "app_setting" */
export type AppSettingAggregate = {
  __typename?: 'AppSettingAggregate';
  aggregate?: Maybe<AppSettingAggregateFields>;
  nodes: Array<AppSetting>;
};

/** aggregate fields of "app_setting" */
export type AppSettingAggregateFields = {
  __typename?: 'AppSettingAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<AppSettingMaxFields>;
  min?: Maybe<AppSettingMinFields>;
};


/** aggregate fields of "app_setting" */
export type AppSettingAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<AppSettingSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "app_setting". All fields are combined with a logical 'AND'. */
export type AppSettingBoolExp = {
  _and?: InputMaybe<Array<AppSettingBoolExp>>;
  _not?: InputMaybe<AppSettingBoolExp>;
  _or?: InputMaybe<Array<AppSettingBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  key?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "app_setting" */
export enum AppSettingConstraint {
  /** unique or primary key constraint on columns "key" */
  AppSettingPkey = 'app_setting_pkey'
}

/** input type for inserting data into table "app_setting" */
export type AppSettingInsertInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Text identifier */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Text content */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type AppSettingMaxFields = {
  __typename?: 'AppSettingMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Text identifier */
  key?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Text content */
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type AppSettingMinFields = {
  __typename?: 'AppSettingMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Text identifier */
  key?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Text content */
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "app_setting" */
export type AppSettingMutationResponse = {
  __typename?: 'AppSettingMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AppSetting>;
};

/** on_conflict condition type for table "app_setting" */
export type AppSettingOnConflict = {
  constraint: AppSettingConstraint;
  updateColumns?: Array<AppSettingUpdateColumn>;
  where?: InputMaybe<AppSettingBoolExp>;
};

/** Ordering options when selecting data from "app_setting". */
export type AppSettingOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  key?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: app_setting */
export type AppSettingPkColumnsInput = {
  /** Text identifier */
  key: Scalars['String']['input'];
};

/** select columns of table "app_setting" */
export enum AppSettingSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Key = 'key',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "app_setting" */
export type AppSettingSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Text identifier */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Text content */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "app_setting" */
export type AppSettingStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AppSettingStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AppSettingStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Text identifier */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Text content */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "app_setting" */
export enum AppSettingUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Key = 'key',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value'
}

export type AppSettingUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AppSettingSetInput>;
  /** filter the rows which have to be updated */
  where: AppSettingBoolExp;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Academic coordination assignments at program, track, or course level */
export type Coordination = {
  __typename?: 'Coordination';
  /** Additional coordination details */
  comment?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  course?: Maybe<Course>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Unique coordination identifier */
  id: Scalars['Int']['output'];
  /** An object relationship */
  program?: Maybe<Program>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  teacher: Teacher;
  /** Coordinating teacher */
  teacherId: Scalars['Int']['output'];
  /** An object relationship */
  track?: Maybe<Track>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "coordination" */
export type CoordinationAggregate = {
  __typename?: 'CoordinationAggregate';
  aggregate?: Maybe<CoordinationAggregateFields>;
  nodes: Array<Coordination>;
};

export type CoordinationAggregateBoolExp = {
  count?: InputMaybe<CoordinationAggregateBoolExpCount>;
};

/** aggregate fields of "coordination" */
export type CoordinationAggregateFields = {
  __typename?: 'CoordinationAggregateFields';
  avg?: Maybe<CoordinationAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CoordinationMaxFields>;
  min?: Maybe<CoordinationMinFields>;
  stddev?: Maybe<CoordinationStddevFields>;
  stddevPop?: Maybe<CoordinationStddevPopFields>;
  stddevSamp?: Maybe<CoordinationStddevSampFields>;
  sum?: Maybe<CoordinationSumFields>;
  varPop?: Maybe<CoordinationVarPopFields>;
  varSamp?: Maybe<CoordinationVarSampFields>;
  variance?: Maybe<CoordinationVarianceFields>;
};


/** aggregate fields of "coordination" */
export type CoordinationAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CoordinationSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "coordination" */
export type CoordinationAggregateOrderBy = {
  avg?: InputMaybe<CoordinationAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CoordinationMaxOrderBy>;
  min?: InputMaybe<CoordinationMinOrderBy>;
  stddev?: InputMaybe<CoordinationStddevOrderBy>;
  stddevPop?: InputMaybe<CoordinationStddevPopOrderBy>;
  stddevSamp?: InputMaybe<CoordinationStddevSampOrderBy>;
  sum?: InputMaybe<CoordinationSumOrderBy>;
  varPop?: InputMaybe<CoordinationVarPopOrderBy>;
  varSamp?: InputMaybe<CoordinationVarSampOrderBy>;
  variance?: InputMaybe<CoordinationVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "coordination" */
export type CoordinationArrRelInsertInput = {
  data: Array<CoordinationInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<CoordinationOnConflict>;
};

/** aggregate avg on columns */
export type CoordinationAvgFields = {
  __typename?: 'CoordinationAvgFields';
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "coordination" */
export type CoordinationAvgOrderBy = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "coordination". All fields are combined with a logical 'AND'. */
export type CoordinationBoolExp = {
  _and?: InputMaybe<Array<CoordinationBoolExp>>;
  _not?: InputMaybe<CoordinationBoolExp>;
  _or?: InputMaybe<Array<CoordinationBoolExp>>;
  comment?: InputMaybe<StringComparisonExp>;
  course?: InputMaybe<CourseBoolExp>;
  courseId?: InputMaybe<IntComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  program?: InputMaybe<ProgramBoolExp>;
  programId?: InputMaybe<IntComparisonExp>;
  teacher?: InputMaybe<TeacherBoolExp>;
  teacherId?: InputMaybe<IntComparisonExp>;
  track?: InputMaybe<TrackBoolExp>;
  trackId?: InputMaybe<IntComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "coordination" */
export enum CoordinationConstraint {
  /** unique or primary key constraint on columns "id" */
  CoordinationPkey = 'coordination_pkey',
  /** unique or primary key constraint on columns "teacher_id", "track_id", "course_id", "program_id" */
  CoordinationTeacherIdCourseIdTrackIdProgramIdKey = 'coordination_teacher_id_course_id_track_id_program_id_key'
}

/** input type for incrementing numeric columns in table "coordination" */
export type CoordinationIncInput = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "coordination" */
export type CoordinationInsertInput = {
  /** Additional coordination details */
  comment?: InputMaybe<Scalars['String']['input']>;
  course?: InputMaybe<CourseObjRelInsertInput>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  program?: InputMaybe<ProgramObjRelInsertInput>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<Scalars['Int']['input']>;
  teacher?: InputMaybe<TeacherObjRelInsertInput>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  track?: InputMaybe<TrackObjRelInsertInput>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type CoordinationMaxFields = {
  __typename?: 'CoordinationMaxFields';
  /** Additional coordination details */
  comment?: Maybe<Scalars['String']['output']>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Int']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "coordination" */
export type CoordinationMaxOrderBy = {
  /** Additional coordination details */
  comment?: InputMaybe<OrderBy>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CoordinationMinFields = {
  __typename?: 'CoordinationMinFields';
  /** Additional coordination details */
  comment?: Maybe<Scalars['String']['output']>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Int']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "coordination" */
export type CoordinationMinOrderBy = {
  /** Additional coordination details */
  comment?: InputMaybe<OrderBy>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "coordination" */
export type CoordinationMutationResponse = {
  __typename?: 'CoordinationMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Coordination>;
};

/** on_conflict condition type for table "coordination" */
export type CoordinationOnConflict = {
  constraint: CoordinationConstraint;
  updateColumns?: Array<CoordinationUpdateColumn>;
  where?: InputMaybe<CoordinationBoolExp>;
};

/** Ordering options when selecting data from "coordination". */
export type CoordinationOrderBy = {
  comment?: InputMaybe<OrderBy>;
  course?: InputMaybe<CourseOrderBy>;
  courseId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  program?: InputMaybe<ProgramOrderBy>;
  programId?: InputMaybe<OrderBy>;
  teacher?: InputMaybe<TeacherOrderBy>;
  teacherId?: InputMaybe<OrderBy>;
  track?: InputMaybe<TrackOrderBy>;
  trackId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: coordination */
export type CoordinationPkColumnsInput = {
  /** Unique coordination identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "coordination" */
export enum CoordinationSelectColumn {
  /** column name */
  Comment = 'comment',
  /** column name */
  CourseId = 'courseId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProgramId = 'programId',
  /** column name */
  TeacherId = 'teacherId',
  /** column name */
  TrackId = 'trackId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "coordination" */
export type CoordinationSetInput = {
  /** Additional coordination details */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type CoordinationStddevFields = {
  __typename?: 'CoordinationStddevFields';
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "coordination" */
export type CoordinationStddevOrderBy = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type CoordinationStddevPopFields = {
  __typename?: 'CoordinationStddevPopFields';
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "coordination" */
export type CoordinationStddevPopOrderBy = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type CoordinationStddevSampFields = {
  __typename?: 'CoordinationStddevSampFields';
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "coordination" */
export type CoordinationStddevSampOrderBy = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "coordination" */
export type CoordinationStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: CoordinationStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CoordinationStreamCursorValueInput = {
  /** Additional coordination details */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Unique coordination identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type CoordinationSumFields = {
  __typename?: 'CoordinationSumFields';
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Int']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "coordination" */
export type CoordinationSumOrderBy = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
};

/** update columns of table "coordination" */
export enum CoordinationUpdateColumn {
  /** column name */
  Comment = 'comment',
  /** column name */
  CourseId = 'courseId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ProgramId = 'programId',
  /** column name */
  TeacherId = 'teacherId',
  /** column name */
  TrackId = 'trackId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type CoordinationUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CoordinationIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CoordinationSetInput>;
  /** filter the rows which have to be updated */
  where: CoordinationBoolExp;
};

/** aggregate varPop on columns */
export type CoordinationVarPopFields = {
  __typename?: 'CoordinationVarPopFields';
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "coordination" */
export type CoordinationVarPopOrderBy = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type CoordinationVarSampFields = {
  __typename?: 'CoordinationVarSampFields';
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "coordination" */
export type CoordinationVarSampOrderBy = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CoordinationVarianceFields = {
  __typename?: 'CoordinationVarianceFields';
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique coordination identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Coordinating teacher */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "coordination" */
export type CoordinationVarianceOrderBy = {
  /** Course being coordinated (mutually exclusive with program_id and track_id) */
  courseId?: InputMaybe<OrderBy>;
  /** Unique coordination identifier */
  id?: InputMaybe<OrderBy>;
  /** Program being coordinated (mutually exclusive with track_id and course_id) */
  programId?: InputMaybe<OrderBy>;
  /** Coordinating teacher */
  teacherId?: InputMaybe<OrderBy>;
  /** Track being coordinated (mutually exclusive with program_id and course_id) */
  trackId?: InputMaybe<OrderBy>;
};

/** Detailed course definitions and configurations */
export type Course = {
  __typename?: 'Course';
  /** An array relationship */
  coordinations: Array<Coordination>;
  /** An aggregate relationship */
  coordinationsAggregate: CoordinationAggregate;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Computed study year (1-3) based on semester */
  cycleYear: Scalars['Int']['output'];
  /** Course description */
  description?: Maybe<Scalars['String']['output']>;
  ensIdImport?: Maybe<Scalars['String']['output']>;
  formationIdImport?: Maybe<Scalars['String']['output']>;
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
  nomImport?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  priorities: Array<Priority>;
  /** An aggregate relationship */
  prioritiesAggregate: PriorityAggregate;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  program: Program;
  /** Program offering this course */
  programId: Scalars['Int']['output'];
  /** An array relationship */
  requests: Array<Request>;
  /** An aggregate relationship */
  requestsAggregate: RequestAggregate;
  /** Academic semester (1-6) */
  semester: Scalars['Int']['output'];
  /** An object relationship */
  track?: Maybe<Track>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  type: CourseType;
  /** Reference to course delivery type affecting workload calculation */
  typeId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Controls course visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
  /** Academic year when the course is offered */
  year: Scalars['Int']['output'];
  /** An object relationship */
  yearByYear: Year;
};


/** Detailed course definitions and configurations */
export type CourseCoordinationsArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


/** Detailed course definitions and configurations */
export type CourseCoordinationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


/** Detailed course definitions and configurations */
export type CoursePrioritiesArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


/** Detailed course definitions and configurations */
export type CoursePrioritiesAggregateArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


/** Detailed course definitions and configurations */
export type CourseRequestsArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


/** Detailed course definitions and configurations */
export type CourseRequestsAggregateArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};

/** aggregated selection of "course" */
export type CourseAggregate = {
  __typename?: 'CourseAggregate';
  aggregate?: Maybe<CourseAggregateFields>;
  nodes: Array<Course>;
};

export type CourseAggregateBoolExp = {
  bool_and?: InputMaybe<CourseAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<CourseAggregateBoolExpBool_Or>;
  count?: InputMaybe<CourseAggregateBoolExpCount>;
};

/** aggregate fields of "course" */
export type CourseAggregateFields = {
  __typename?: 'CourseAggregateFields';
  avg?: Maybe<CourseAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CourseMaxFields>;
  min?: Maybe<CourseMinFields>;
  stddev?: Maybe<CourseStddevFields>;
  stddevPop?: Maybe<CourseStddevPopFields>;
  stddevSamp?: Maybe<CourseStddevSampFields>;
  sum?: Maybe<CourseSumFields>;
  varPop?: Maybe<CourseVarPopFields>;
  varSamp?: Maybe<CourseVarSampFields>;
  variance?: Maybe<CourseVarianceFields>;
};


/** aggregate fields of "course" */
export type CourseAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CourseSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "course" */
export type CourseAggregateOrderBy = {
  avg?: InputMaybe<CourseAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CourseMaxOrderBy>;
  min?: InputMaybe<CourseMinOrderBy>;
  stddev?: InputMaybe<CourseStddevOrderBy>;
  stddevPop?: InputMaybe<CourseStddevPopOrderBy>;
  stddevSamp?: InputMaybe<CourseStddevSampOrderBy>;
  sum?: InputMaybe<CourseSumOrderBy>;
  varPop?: InputMaybe<CourseVarPopOrderBy>;
  varSamp?: InputMaybe<CourseVarSampOrderBy>;
  variance?: InputMaybe<CourseVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "course" */
export type CourseArrRelInsertInput = {
  data: Array<CourseInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<CourseOnConflict>;
};

/** aggregate avg on columns */
export type CourseAvgFields = {
  __typename?: 'CourseAvgFields';
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Float']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Float']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Float']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Float']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Float']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Float']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Float']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Float']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "course" */
export type CourseAvgOrderBy = {
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "course". All fields are combined with a logical 'AND'. */
export type CourseBoolExp = {
  _and?: InputMaybe<Array<CourseBoolExp>>;
  _not?: InputMaybe<CourseBoolExp>;
  _or?: InputMaybe<Array<CourseBoolExp>>;
  coordinations?: InputMaybe<CoordinationBoolExp>;
  coordinationsAggregate?: InputMaybe<CoordinationAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  cycleYear?: InputMaybe<IntComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  ensIdImport?: InputMaybe<StringComparisonExp>;
  formationIdImport?: InputMaybe<StringComparisonExp>;
  groups?: InputMaybe<IntComparisonExp>;
  groupsAdjusted?: InputMaybe<IntComparisonExp>;
  groupsEffective?: InputMaybe<IntComparisonExp>;
  hours?: InputMaybe<FloatComparisonExp>;
  hoursAdjusted?: InputMaybe<FloatComparisonExp>;
  hoursEffective?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  nameDisplay?: InputMaybe<StringComparisonExp>;
  nameShort?: InputMaybe<StringComparisonExp>;
  nomImport?: InputMaybe<StringComparisonExp>;
  priorities?: InputMaybe<PriorityBoolExp>;
  prioritiesAggregate?: InputMaybe<PriorityAggregateBoolExp>;
  priorityRule?: InputMaybe<IntComparisonExp>;
  program?: InputMaybe<ProgramBoolExp>;
  programId?: InputMaybe<IntComparisonExp>;
  requests?: InputMaybe<RequestBoolExp>;
  requestsAggregate?: InputMaybe<RequestAggregateBoolExp>;
  semester?: InputMaybe<IntComparisonExp>;
  track?: InputMaybe<TrackBoolExp>;
  trackId?: InputMaybe<IntComparisonExp>;
  type?: InputMaybe<CourseTypeBoolExp>;
  typeId?: InputMaybe<IntComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  visible?: InputMaybe<BooleanComparisonExp>;
  year?: InputMaybe<IntComparisonExp>;
  yearByYear?: InputMaybe<YearBoolExp>;
};

/** unique or primary key constraints on table "course" */
export enum CourseConstraint {
  /** unique or primary key constraint on columns "ens_id_import" */
  CourseEnsIdImportKey = 'course_ens_id_import_key',
  /** unique or primary key constraint on columns "id", "year" */
  CourseIdYearKey = 'course_id_year_key',
  /** unique or primary key constraint on columns "id" */
  CoursePkey = 'course_pkey',
  /** unique or primary key constraint on columns "track_id", "semester", "program_id", "name", "year", "type_id" */
  CourseYearProgramIdTrackIdNameSemesterTypeIdKey = 'course_year_program_id_track_id_name_semester_type_id_key'
}

/** input type for incrementing numeric columns in table "course" */
export type CourseIncInput = {
  /** Standard number of student groups */
  groups?: InputMaybe<Scalars['Int']['input']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<Scalars['Int']['input']>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<Scalars['Float']['input']>;
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
  /** Academic year when the course is offered */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "course" */
export type CourseInsertInput = {
  coordinations?: InputMaybe<CoordinationArrRelInsertInput>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Course description */
  description?: InputMaybe<Scalars['String']['input']>;
  ensIdImport?: InputMaybe<Scalars['String']['input']>;
  formationIdImport?: InputMaybe<Scalars['String']['input']>;
  /** Standard number of student groups */
  groups?: InputMaybe<Scalars['Int']['input']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<Scalars['Int']['input']>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<Scalars['Float']['input']>;
  /** Full course name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated course name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
  priorities?: InputMaybe<PriorityArrRelInsertInput>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<Scalars['Int']['input']>;
  program?: InputMaybe<ProgramObjRelInsertInput>;
  /** Program offering this course */
  programId?: InputMaybe<Scalars['Int']['input']>;
  requests?: InputMaybe<RequestArrRelInsertInput>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<Scalars['Int']['input']>;
  track?: InputMaybe<TrackObjRelInsertInput>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<CourseTypeObjRelInsertInput>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls course visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Academic year when the course is offered */
  year?: InputMaybe<Scalars['Int']['input']>;
  yearByYear?: InputMaybe<YearObjRelInsertInput>;
};

/** aggregate max on columns */
export type CourseMaxFields = {
  __typename?: 'CourseMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Int']['output']>;
  /** Course description */
  description?: Maybe<Scalars['String']['output']>;
  ensIdImport?: Maybe<Scalars['String']['output']>;
  formationIdImport?: Maybe<Scalars['String']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Int']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Int']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Int']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Int']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Full course name */
  name?: Maybe<Scalars['String']['output']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated course name */
  nameShort?: Maybe<Scalars['String']['output']>;
  nomImport?: Maybe<Scalars['String']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Int']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Int']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "course" */
export type CourseMaxOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Course description */
  description?: InputMaybe<OrderBy>;
  ensIdImport?: InputMaybe<OrderBy>;
  formationIdImport?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Full course name */
  name?: InputMaybe<OrderBy>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<OrderBy>;
  /** Abbreviated course name */
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CourseMinFields = {
  __typename?: 'CourseMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Int']['output']>;
  /** Course description */
  description?: Maybe<Scalars['String']['output']>;
  ensIdImport?: Maybe<Scalars['String']['output']>;
  formationIdImport?: Maybe<Scalars['String']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Int']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Int']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Int']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Int']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Full course name */
  name?: Maybe<Scalars['String']['output']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated course name */
  nameShort?: Maybe<Scalars['String']['output']>;
  nomImport?: Maybe<Scalars['String']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Int']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Int']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "course" */
export type CourseMinOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Course description */
  description?: InputMaybe<OrderBy>;
  ensIdImport?: InputMaybe<OrderBy>;
  formationIdImport?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Full course name */
  name?: InputMaybe<OrderBy>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<OrderBy>;
  /** Abbreviated course name */
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "course" */
export type CourseMutationResponse = {
  __typename?: 'CourseMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Course>;
};

/** input type for inserting object relation for remote table "course" */
export type CourseObjRelInsertInput = {
  data: CourseInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<CourseOnConflict>;
};

/** on_conflict condition type for table "course" */
export type CourseOnConflict = {
  constraint: CourseConstraint;
  updateColumns?: Array<CourseUpdateColumn>;
  where?: InputMaybe<CourseBoolExp>;
};

/** Ordering options when selecting data from "course". */
export type CourseOrderBy = {
  coordinationsAggregate?: InputMaybe<CoordinationAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  cycleYear?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  ensIdImport?: InputMaybe<OrderBy>;
  formationIdImport?: InputMaybe<OrderBy>;
  groups?: InputMaybe<OrderBy>;
  groupsAdjusted?: InputMaybe<OrderBy>;
  groupsEffective?: InputMaybe<OrderBy>;
  hours?: InputMaybe<OrderBy>;
  hoursAdjusted?: InputMaybe<OrderBy>;
  hoursEffective?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  nameDisplay?: InputMaybe<OrderBy>;
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  prioritiesAggregate?: InputMaybe<PriorityAggregateOrderBy>;
  priorityRule?: InputMaybe<OrderBy>;
  program?: InputMaybe<ProgramOrderBy>;
  programId?: InputMaybe<OrderBy>;
  requestsAggregate?: InputMaybe<RequestAggregateOrderBy>;
  semester?: InputMaybe<OrderBy>;
  track?: InputMaybe<TrackOrderBy>;
  trackId?: InputMaybe<OrderBy>;
  type?: InputMaybe<CourseTypeOrderBy>;
  typeId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  visible?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
  yearByYear?: InputMaybe<YearOrderBy>;
};

/** primary key columns input for table: course */
export type CoursePkColumnsInput = {
  /** Unique course identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "course" */
export enum CourseSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CycleYear = 'cycleYear',
  /** column name */
  Description = 'description',
  /** column name */
  EnsIdImport = 'ensIdImport',
  /** column name */
  FormationIdImport = 'formationIdImport',
  /** column name */
  Groups = 'groups',
  /** column name */
  GroupsAdjusted = 'groupsAdjusted',
  /** column name */
  GroupsEffective = 'groupsEffective',
  /** column name */
  Hours = 'hours',
  /** column name */
  HoursAdjusted = 'hoursAdjusted',
  /** column name */
  HoursEffective = 'hoursEffective',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  NameDisplay = 'nameDisplay',
  /** column name */
  NameShort = 'nameShort',
  /** column name */
  NomImport = 'nomImport',
  /** column name */
  PriorityRule = 'priorityRule',
  /** column name */
  ProgramId = 'programId',
  /** column name */
  Semester = 'semester',
  /** column name */
  TrackId = 'trackId',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible',
  /** column name */
  Year = 'year'
}

/** select "courseAggregateBoolExpBool_andArgumentsColumns" columns of table "course" */
export enum CourseSelectColumnCourseAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  Visible = 'visible'
}

/** select "courseAggregateBoolExpBool_orArgumentsColumns" columns of table "course" */
export enum CourseSelectColumnCourseAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "course" */
export type CourseSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Course description */
  description?: InputMaybe<Scalars['String']['input']>;
  ensIdImport?: InputMaybe<Scalars['String']['input']>;
  formationIdImport?: InputMaybe<Scalars['String']['input']>;
  /** Standard number of student groups */
  groups?: InputMaybe<Scalars['Int']['input']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<Scalars['Int']['input']>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<Scalars['Float']['input']>;
  /** Full course name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated course name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
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
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls course visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Academic year when the course is offered */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type CourseStddevFields = {
  __typename?: 'CourseStddevFields';
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Float']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Float']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Float']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Float']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Float']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Float']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Float']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Float']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "course" */
export type CourseStddevOrderBy = {
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type CourseStddevPopFields = {
  __typename?: 'CourseStddevPopFields';
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Float']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Float']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Float']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Float']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Float']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Float']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Float']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Float']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "course" */
export type CourseStddevPopOrderBy = {
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type CourseStddevSampFields = {
  __typename?: 'CourseStddevSampFields';
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Float']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Float']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Float']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Float']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Float']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Float']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Float']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Float']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "course" */
export type CourseStddevSampOrderBy = {
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "course" */
export type CourseStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: CourseStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CourseStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<Scalars['Int']['input']>;
  /** Course description */
  description?: InputMaybe<Scalars['String']['input']>;
  ensIdImport?: InputMaybe<Scalars['String']['input']>;
  formationIdImport?: InputMaybe<Scalars['String']['input']>;
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
  /** Unique course identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Full course name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated course name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
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
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls course visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Academic year when the course is offered */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type CourseSumFields = {
  __typename?: 'CourseSumFields';
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Int']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Int']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Int']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Int']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Int']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Int']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Int']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Int']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Int']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "course" */
export type CourseSumOrderBy = {
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** Types of course delivery with associated workload coefficients */
export type CourseType = {
  __typename?: 'CourseType';
  /** Workload multiplier for service hour calculations */
  coefficient: Scalars['Float']['output'];
  /** An array relationship */
  courses: Array<Course>;
  /** An aggregate relationship */
  coursesAggregate: CourseAggregate;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Description of the course type and its characteristics */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique course type identifier */
  id: Scalars['Int']['output'];
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
};


/** Types of course delivery with associated workload coefficients */
export type CourseTypeCoursesArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


/** Types of course delivery with associated workload coefficients */
export type CourseTypeCoursesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};

/** aggregated selection of "course_type" */
export type CourseTypeAggregate = {
  __typename?: 'CourseTypeAggregate';
  aggregate?: Maybe<CourseTypeAggregateFields>;
  nodes: Array<CourseType>;
};

/** aggregate fields of "course_type" */
export type CourseTypeAggregateFields = {
  __typename?: 'CourseTypeAggregateFields';
  avg?: Maybe<CourseTypeAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CourseTypeMaxFields>;
  min?: Maybe<CourseTypeMinFields>;
  stddev?: Maybe<CourseTypeStddevFields>;
  stddevPop?: Maybe<CourseTypeStddevPopFields>;
  stddevSamp?: Maybe<CourseTypeStddevSampFields>;
  sum?: Maybe<CourseTypeSumFields>;
  varPop?: Maybe<CourseTypeVarPopFields>;
  varSamp?: Maybe<CourseTypeVarSampFields>;
  variance?: Maybe<CourseTypeVarianceFields>;
};


/** aggregate fields of "course_type" */
export type CourseTypeAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CourseTypeSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CourseTypeAvgFields = {
  __typename?: 'CourseTypeAvgFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "course_type". All fields are combined with a logical 'AND'. */
export type CourseTypeBoolExp = {
  _and?: InputMaybe<Array<CourseTypeBoolExp>>;
  _not?: InputMaybe<CourseTypeBoolExp>;
  _or?: InputMaybe<Array<CourseTypeBoolExp>>;
  coefficient?: InputMaybe<FloatComparisonExp>;
  courses?: InputMaybe<CourseBoolExp>;
  coursesAggregate?: InputMaybe<CourseAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  label?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "course_type" */
export enum CourseTypeConstraint {
  /** unique or primary key constraint on columns "label" */
  CourseTypeLabelKey = 'course_type_label_key',
  /** unique or primary key constraint on columns "id" */
  CourseTypePkey = 'course_type_pkey'
}

/** input type for incrementing numeric columns in table "course_type" */
export type CourseTypeIncInput = {
  /** Workload multiplier for service hour calculations */
  coefficient?: InputMaybe<Scalars['Float']['input']>;
};

/** input type for inserting data into table "course_type" */
export type CourseTypeInsertInput = {
  /** Workload multiplier for service hour calculations */
  coefficient?: InputMaybe<Scalars['Float']['input']>;
  courses?: InputMaybe<CourseArrRelInsertInput>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Description of the course type and its characteristics */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type CourseTypeMaxFields = {
  __typename?: 'CourseTypeMaxFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Description of the course type and its characteristics */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Human-readable type name for display purposes, unique */
  label?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type CourseTypeMinFields = {
  __typename?: 'CourseTypeMinFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Description of the course type and its characteristics */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Human-readable type name for display purposes, unique */
  label?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "course_type" */
export type CourseTypeMutationResponse = {
  __typename?: 'CourseTypeMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CourseType>;
};

/** input type for inserting object relation for remote table "course_type" */
export type CourseTypeObjRelInsertInput = {
  data: CourseTypeInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<CourseTypeOnConflict>;
};

/** on_conflict condition type for table "course_type" */
export type CourseTypeOnConflict = {
  constraint: CourseTypeConstraint;
  updateColumns?: Array<CourseTypeUpdateColumn>;
  where?: InputMaybe<CourseTypeBoolExp>;
};

/** Ordering options when selecting data from "course_type". */
export type CourseTypeOrderBy = {
  coefficient?: InputMaybe<OrderBy>;
  coursesAggregate?: InputMaybe<CourseAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  label?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: course_type */
export type CourseTypePkColumnsInput = {
  /** Unique course type identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "course_type" */
export enum CourseTypeSelectColumn {
  /** column name */
  Coefficient = 'coefficient',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "course_type" */
export type CourseTypeSetInput = {
  /** Workload multiplier for service hour calculations */
  coefficient?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Description of the course type and its characteristics */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type CourseTypeStddevFields = {
  __typename?: 'CourseTypeStddevFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevPop on columns */
export type CourseTypeStddevPopFields = {
  __typename?: 'CourseTypeStddevPopFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevSamp on columns */
export type CourseTypeStddevSampFields = {
  __typename?: 'CourseTypeStddevSampFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "course_type" */
export type CourseTypeStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: CourseTypeStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CourseTypeStreamCursorValueInput = {
  /** Workload multiplier for service hour calculations */
  coefficient?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Description of the course type and its characteristics */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Unique course type identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Human-readable type name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type CourseTypeSumFields = {
  __typename?: 'CourseTypeSumFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "course_type" */
export enum CourseTypeUpdateColumn {
  /** column name */
  Coefficient = 'coefficient',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Label = 'label',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type CourseTypeUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CourseTypeIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CourseTypeSetInput>;
  /** filter the rows which have to be updated */
  where: CourseTypeBoolExp;
};

/** aggregate varPop on columns */
export type CourseTypeVarPopFields = {
  __typename?: 'CourseTypeVarPopFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate varSamp on columns */
export type CourseTypeVarSampFields = {
  __typename?: 'CourseTypeVarSampFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CourseTypeVarianceFields = {
  __typename?: 'CourseTypeVarianceFields';
  /** Workload multiplier for service hour calculations */
  coefficient?: Maybe<Scalars['Float']['output']>;
  /** Unique course type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** update columns of table "course" */
export enum CourseUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  EnsIdImport = 'ensIdImport',
  /** column name */
  FormationIdImport = 'formationIdImport',
  /** column name */
  Groups = 'groups',
  /** column name */
  GroupsAdjusted = 'groupsAdjusted',
  /** column name */
  Hours = 'hours',
  /** column name */
  HoursAdjusted = 'hoursAdjusted',
  /** column name */
  Name = 'name',
  /** column name */
  NameShort = 'nameShort',
  /** column name */
  NomImport = 'nomImport',
  /** column name */
  PriorityRule = 'priorityRule',
  /** column name */
  ProgramId = 'programId',
  /** column name */
  Semester = 'semester',
  /** column name */
  TrackId = 'trackId',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible',
  /** column name */
  Year = 'year'
}

export type CourseUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CourseIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CourseSetInput>;
  /** filter the rows which have to be updated */
  where: CourseBoolExp;
};

/** aggregate varPop on columns */
export type CourseVarPopFields = {
  __typename?: 'CourseVarPopFields';
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Float']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Float']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Float']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Float']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Float']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Float']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Float']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Float']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "course" */
export type CourseVarPopOrderBy = {
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type CourseVarSampFields = {
  __typename?: 'CourseVarSampFields';
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Float']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Float']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Float']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Float']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Float']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Float']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Float']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Float']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "course" */
export type CourseVarSampOrderBy = {
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CourseVarianceFields = {
  __typename?: 'CourseVarianceFields';
  /** Computed study year (1-3) based on semester */
  cycleYear?: Maybe<Scalars['Float']['output']>;
  /** Standard number of student groups */
  groups?: Maybe<Scalars['Float']['output']>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: Maybe<Scalars['Float']['output']>;
  /** Standard teaching hours per group */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: Maybe<Scalars['Float']['output']>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: Maybe<Scalars['Float']['output']>;
  /** Unique course identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: Maybe<Scalars['Float']['output']>;
  /** Program offering this course */
  programId?: Maybe<Scalars['Float']['output']>;
  /** Academic semester (1-6) */
  semester?: Maybe<Scalars['Float']['output']>;
  /** Optional track specialization for this course */
  trackId?: Maybe<Scalars['Float']['output']>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: Maybe<Scalars['Float']['output']>;
  /** Academic year when the course is offered */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "course" */
export type CourseVarianceOrderBy = {
  /** Computed study year (1-3) based on semester */
  cycleYear?: InputMaybe<OrderBy>;
  /** Standard number of student groups */
  groups?: InputMaybe<OrderBy>;
  /** Modified number of groups if different from standard */
  groupsAdjusted?: InputMaybe<OrderBy>;
  /** Actual number of groups used, defaulting to standard if no adjustment */
  groupsEffective?: InputMaybe<OrderBy>;
  /** Standard teaching hours per group */
  hours?: InputMaybe<OrderBy>;
  /** Modified teaching hours per group if different from standard */
  hoursAdjusted?: InputMaybe<OrderBy>;
  /** Actual teaching hours used, defaulting to standard if no adjustment */
  hoursEffective?: InputMaybe<OrderBy>;
  /** Unique course identifier */
  id?: InputMaybe<OrderBy>;
  /** Priority duration in years (1=none, 0=permanent, NULL=disabled) */
  priorityRule?: InputMaybe<OrderBy>;
  /** Program offering this course */
  programId?: InputMaybe<OrderBy>;
  /** Academic semester (1-6) */
  semester?: InputMaybe<OrderBy>;
  /** Optional track specialization for this course */
  trackId?: InputMaybe<OrderBy>;
  /** Reference to course delivery type affecting workload calculation */
  typeId?: InputMaybe<OrderBy>;
  /** Academic year when the course is offered */
  year?: InputMaybe<OrderBy>;
};

/** Singleton table that stores the active system phase reference */
export type CurrentPhase = {
  __typename?: 'CurrentPhase';
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Primary key with constraint to ensure only one record exists */
  id: Scalars['Int']['output'];
  /** An object relationship */
  phase?: Maybe<Phase>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Reference to the currently active phase identifier */
  value?: Maybe<PhaseEnum>;
};

/** aggregated selection of "current_phase" */
export type CurrentPhaseAggregate = {
  __typename?: 'CurrentPhaseAggregate';
  aggregate?: Maybe<CurrentPhaseAggregateFields>;
  nodes: Array<CurrentPhase>;
};

export type CurrentPhaseAggregateBoolExp = {
  count?: InputMaybe<CurrentPhaseAggregateBoolExpCount>;
};

/** aggregate fields of "current_phase" */
export type CurrentPhaseAggregateFields = {
  __typename?: 'CurrentPhaseAggregateFields';
  avg?: Maybe<CurrentPhaseAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CurrentPhaseMaxFields>;
  min?: Maybe<CurrentPhaseMinFields>;
  stddev?: Maybe<CurrentPhaseStddevFields>;
  stddevPop?: Maybe<CurrentPhaseStddevPopFields>;
  stddevSamp?: Maybe<CurrentPhaseStddevSampFields>;
  sum?: Maybe<CurrentPhaseSumFields>;
  varPop?: Maybe<CurrentPhaseVarPopFields>;
  varSamp?: Maybe<CurrentPhaseVarSampFields>;
  variance?: Maybe<CurrentPhaseVarianceFields>;
};


/** aggregate fields of "current_phase" */
export type CurrentPhaseAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CurrentPhaseSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "current_phase" */
export type CurrentPhaseAggregateOrderBy = {
  avg?: InputMaybe<CurrentPhaseAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CurrentPhaseMaxOrderBy>;
  min?: InputMaybe<CurrentPhaseMinOrderBy>;
  stddev?: InputMaybe<CurrentPhaseStddevOrderBy>;
  stddevPop?: InputMaybe<CurrentPhaseStddevPopOrderBy>;
  stddevSamp?: InputMaybe<CurrentPhaseStddevSampOrderBy>;
  sum?: InputMaybe<CurrentPhaseSumOrderBy>;
  varPop?: InputMaybe<CurrentPhaseVarPopOrderBy>;
  varSamp?: InputMaybe<CurrentPhaseVarSampOrderBy>;
  variance?: InputMaybe<CurrentPhaseVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "current_phase" */
export type CurrentPhaseArrRelInsertInput = {
  data: Array<CurrentPhaseInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<CurrentPhaseOnConflict>;
};

/** aggregate avg on columns */
export type CurrentPhaseAvgFields = {
  __typename?: 'CurrentPhaseAvgFields';
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "current_phase" */
export type CurrentPhaseAvgOrderBy = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "current_phase". All fields are combined with a logical 'AND'. */
export type CurrentPhaseBoolExp = {
  _and?: InputMaybe<Array<CurrentPhaseBoolExp>>;
  _not?: InputMaybe<CurrentPhaseBoolExp>;
  _or?: InputMaybe<Array<CurrentPhaseBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  phase?: InputMaybe<PhaseBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  value?: InputMaybe<PhaseEnumComparisonExp>;
};

/** unique or primary key constraints on table "current_phase" */
export enum CurrentPhaseConstraint {
  /** unique or primary key constraint on columns "id" */
  CurrentPhasePkey = 'current_phase_pkey'
}

/** input type for incrementing numeric columns in table "current_phase" */
export type CurrentPhaseIncInput = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "current_phase" */
export type CurrentPhaseInsertInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<Scalars['Int']['input']>;
  phase?: InputMaybe<PhaseObjRelInsertInput>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Reference to the currently active phase identifier */
  value?: InputMaybe<PhaseEnum>;
};

/** aggregate max on columns */
export type CurrentPhaseMaxFields = {
  __typename?: 'CurrentPhaseMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "current_phase" */
export type CurrentPhaseMaxOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CurrentPhaseMinFields = {
  __typename?: 'CurrentPhaseMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "current_phase" */
export type CurrentPhaseMinOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "current_phase" */
export type CurrentPhaseMutationResponse = {
  __typename?: 'CurrentPhaseMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CurrentPhase>;
};

/** on_conflict condition type for table "current_phase" */
export type CurrentPhaseOnConflict = {
  constraint: CurrentPhaseConstraint;
  updateColumns?: Array<CurrentPhaseUpdateColumn>;
  where?: InputMaybe<CurrentPhaseBoolExp>;
};

/** Ordering options when selecting data from "current_phase". */
export type CurrentPhaseOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  phase?: InputMaybe<PhaseOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: current_phase */
export type CurrentPhasePkColumnsInput = {
  /** Primary key with constraint to ensure only one record exists */
  id: Scalars['Int']['input'];
};

/** select columns of table "current_phase" */
export enum CurrentPhaseSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "current_phase" */
export type CurrentPhaseSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Reference to the currently active phase identifier */
  value?: InputMaybe<PhaseEnum>;
};

/** aggregate stddev on columns */
export type CurrentPhaseStddevFields = {
  __typename?: 'CurrentPhaseStddevFields';
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "current_phase" */
export type CurrentPhaseStddevOrderBy = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type CurrentPhaseStddevPopFields = {
  __typename?: 'CurrentPhaseStddevPopFields';
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "current_phase" */
export type CurrentPhaseStddevPopOrderBy = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type CurrentPhaseStddevSampFields = {
  __typename?: 'CurrentPhaseStddevSampFields';
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "current_phase" */
export type CurrentPhaseStddevSampOrderBy = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "current_phase" */
export type CurrentPhaseStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: CurrentPhaseStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CurrentPhaseStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Reference to the currently active phase identifier */
  value?: InputMaybe<PhaseEnum>;
};

/** aggregate sum on columns */
export type CurrentPhaseSumFields = {
  __typename?: 'CurrentPhaseSumFields';
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "current_phase" */
export type CurrentPhaseSumOrderBy = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
};

/** update columns of table "current_phase" */
export enum CurrentPhaseUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value'
}

export type CurrentPhaseUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CurrentPhaseIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CurrentPhaseSetInput>;
  /** filter the rows which have to be updated */
  where: CurrentPhaseBoolExp;
};

/** aggregate varPop on columns */
export type CurrentPhaseVarPopFields = {
  __typename?: 'CurrentPhaseVarPopFields';
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "current_phase" */
export type CurrentPhaseVarPopOrderBy = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type CurrentPhaseVarSampFields = {
  __typename?: 'CurrentPhaseVarSampFields';
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "current_phase" */
export type CurrentPhaseVarSampOrderBy = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CurrentPhaseVarianceFields = {
  __typename?: 'CurrentPhaseVarianceFields';
  /** Primary key with constraint to ensure only one record exists */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "current_phase" */
export type CurrentPhaseVarianceOrderBy = {
  /** Primary key with constraint to ensure only one record exists */
  id?: InputMaybe<OrderBy>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Academic degrees offered by the institution */
export type Degree = {
  __typename?: 'Degree';
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Unique degree identifier */
  id: Scalars['Int']['output'];
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name: Scalars['String']['output'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  programs: Array<Program>;
  /** An aggregate relationship */
  programsAggregate: ProgramAggregate;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Controls degree visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Academic degrees offered by the institution */
export type DegreeProgramsArgs = {
  distinctOn?: InputMaybe<Array<ProgramSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProgramOrderBy>>;
  where?: InputMaybe<ProgramBoolExp>;
};


/** Academic degrees offered by the institution */
export type DegreeProgramsAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProgramSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProgramOrderBy>>;
  where?: InputMaybe<ProgramBoolExp>;
};

/** aggregated selection of "degree" */
export type DegreeAggregate = {
  __typename?: 'DegreeAggregate';
  aggregate?: Maybe<DegreeAggregateFields>;
  nodes: Array<Degree>;
};

/** aggregate fields of "degree" */
export type DegreeAggregateFields = {
  __typename?: 'DegreeAggregateFields';
  avg?: Maybe<DegreeAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<DegreeMaxFields>;
  min?: Maybe<DegreeMinFields>;
  stddev?: Maybe<DegreeStddevFields>;
  stddevPop?: Maybe<DegreeStddevPopFields>;
  stddevSamp?: Maybe<DegreeStddevSampFields>;
  sum?: Maybe<DegreeSumFields>;
  varPop?: Maybe<DegreeVarPopFields>;
  varSamp?: Maybe<DegreeVarSampFields>;
  variance?: Maybe<DegreeVarianceFields>;
};


/** aggregate fields of "degree" */
export type DegreeAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<DegreeSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type DegreeAvgFields = {
  __typename?: 'DegreeAvgFields';
  /** Unique degree identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "degree". All fields are combined with a logical 'AND'. */
export type DegreeBoolExp = {
  _and?: InputMaybe<Array<DegreeBoolExp>>;
  _not?: InputMaybe<DegreeBoolExp>;
  _or?: InputMaybe<Array<DegreeBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  nameDisplay?: InputMaybe<StringComparisonExp>;
  nameShort?: InputMaybe<StringComparisonExp>;
  programs?: InputMaybe<ProgramBoolExp>;
  programsAggregate?: InputMaybe<ProgramAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  visible?: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "degree" */
export enum DegreeConstraint {
  /** unique or primary key constraint on columns "name" */
  DegreeNameKey = 'degree_name_key',
  /** unique or primary key constraint on columns "id" */
  DegreePkey = 'degree_pkey'
}

/** input type for inserting data into table "degree" */
export type DegreeInsertInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  programs?: InputMaybe<ProgramArrRelInsertInput>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls degree visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type DegreeMaxFields = {
  __typename?: 'DegreeMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique degree identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name?: Maybe<Scalars['String']['output']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type DegreeMinFields = {
  __typename?: 'DegreeMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique degree identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name?: Maybe<Scalars['String']['output']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "degree" */
export type DegreeMutationResponse = {
  __typename?: 'DegreeMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Degree>;
};

/** input type for inserting object relation for remote table "degree" */
export type DegreeObjRelInsertInput = {
  data: DegreeInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<DegreeOnConflict>;
};

/** on_conflict condition type for table "degree" */
export type DegreeOnConflict = {
  constraint: DegreeConstraint;
  updateColumns?: Array<DegreeUpdateColumn>;
  where?: InputMaybe<DegreeBoolExp>;
};

/** Ordering options when selecting data from "degree". */
export type DegreeOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  nameDisplay?: InputMaybe<OrderBy>;
  nameShort?: InputMaybe<OrderBy>;
  programsAggregate?: InputMaybe<ProgramAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  visible?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: degree */
export type DegreePkColumnsInput = {
  /** Unique degree identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "degree" */
export enum DegreeSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  NameDisplay = 'nameDisplay',
  /** column name */
  NameShort = 'nameShort',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "degree" */
export type DegreeSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls degree visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type DegreeStddevFields = {
  __typename?: 'DegreeStddevFields';
  /** Unique degree identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevPop on columns */
export type DegreeStddevPopFields = {
  __typename?: 'DegreeStddevPopFields';
  /** Unique degree identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevSamp on columns */
export type DegreeStddevSampFields = {
  __typename?: 'DegreeStddevSampFields';
  /** Unique degree identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "degree" */
export type DegreeStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: DegreeStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type DegreeStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Unique degree identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Full degree name, unique (e.g., Bachelor of Science) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated degree name (e.g., BSc) */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls degree visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type DegreeSumFields = {
  __typename?: 'DegreeSumFields';
  /** Unique degree identifier */
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "degree" */
export enum DegreeUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Name = 'name',
  /** column name */
  NameShort = 'nameShort',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible'
}

export type DegreeUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<DegreeSetInput>;
  /** filter the rows which have to be updated */
  where: DegreeBoolExp;
};

/** aggregate varPop on columns */
export type DegreeVarPopFields = {
  __typename?: 'DegreeVarPopFields';
  /** Unique degree identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate varSamp on columns */
export type DegreeVarSampFields = {
  __typename?: 'DegreeVarSampFields';
  /** Unique degree identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type DegreeVarianceFields = {
  __typename?: 'DegreeVarianceFields';
  /** Unique degree identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'. */
export type FloatComparisonExp = {
  _eq?: InputMaybe<Scalars['Float']['input']>;
  _gt?: InputMaybe<Scalars['Float']['input']>;
  _gte?: InputMaybe<Scalars['Float']['input']>;
  _in?: InputMaybe<Array<Scalars['Float']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Float']['input']>;
  _lte?: InputMaybe<Scalars['Float']['input']>;
  _neq?: InputMaybe<Scalars['Float']['input']>;
  _nin?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Message to the assignment committee attached to a service */
export type Message = {
  __typename?: 'Message';
  /** Content of the message */
  content: Scalars['String']['output'];
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Unique message identifier */
  id: Scalars['Int']['output'];
  /** An object relationship */
  service: Service;
  /** Identifier of the corresponding service */
  serviceId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "message" */
export type MessageAggregate = {
  __typename?: 'MessageAggregate';
  aggregate?: Maybe<MessageAggregateFields>;
  nodes: Array<Message>;
};

/** aggregate fields of "message" */
export type MessageAggregateFields = {
  __typename?: 'MessageAggregateFields';
  avg?: Maybe<MessageAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<MessageMaxFields>;
  min?: Maybe<MessageMinFields>;
  stddev?: Maybe<MessageStddevFields>;
  stddevPop?: Maybe<MessageStddevPopFields>;
  stddevSamp?: Maybe<MessageStddevSampFields>;
  sum?: Maybe<MessageSumFields>;
  varPop?: Maybe<MessageVarPopFields>;
  varSamp?: Maybe<MessageVarSampFields>;
  variance?: Maybe<MessageVarianceFields>;
};


/** aggregate fields of "message" */
export type MessageAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MessageSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type MessageAvgFields = {
  __typename?: 'MessageAvgFields';
  /** Unique message identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "message". All fields are combined with a logical 'AND'. */
export type MessageBoolExp = {
  _and?: InputMaybe<Array<MessageBoolExp>>;
  _not?: InputMaybe<MessageBoolExp>;
  _or?: InputMaybe<Array<MessageBoolExp>>;
  content?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  service?: InputMaybe<ServiceBoolExp>;
  serviceId?: InputMaybe<IntComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "message" */
export enum MessageConstraint {
  /** unique or primary key constraint on columns "id" */
  MessagePkey = 'message_pkey',
  /** unique or primary key constraint on columns "service_id" */
  MessageServiceIdKey = 'message_service_id_key'
}

/** input type for incrementing numeric columns in table "message" */
export type MessageIncInput = {
  /** Identifier of the corresponding service */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "message" */
export type MessageInsertInput = {
  /** Content of the message */
  content?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  service?: InputMaybe<ServiceObjRelInsertInput>;
  /** Identifier of the corresponding service */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type MessageMaxFields = {
  __typename?: 'MessageMaxFields';
  /** Content of the message */
  content?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique message identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type MessageMinFields = {
  __typename?: 'MessageMinFields';
  /** Content of the message */
  content?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique message identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "message" */
export type MessageMutationResponse = {
  __typename?: 'MessageMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Message>;
};

/** input type for inserting object relation for remote table "message" */
export type MessageObjRelInsertInput = {
  data: MessageInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<MessageOnConflict>;
};

/** on_conflict condition type for table "message" */
export type MessageOnConflict = {
  constraint: MessageConstraint;
  updateColumns?: Array<MessageUpdateColumn>;
  where?: InputMaybe<MessageBoolExp>;
};

/** Ordering options when selecting data from "message". */
export type MessageOrderBy = {
  content?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  service?: InputMaybe<ServiceOrderBy>;
  serviceId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: message */
export type MessagePkColumnsInput = {
  /** Unique message identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "message" */
export enum MessageSelectColumn {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ServiceId = 'serviceId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "message" */
export type MessageSetInput = {
  /** Content of the message */
  content?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Identifier of the corresponding service */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type MessageStddevFields = {
  __typename?: 'MessageStddevFields';
  /** Unique message identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevPop on columns */
export type MessageStddevPopFields = {
  __typename?: 'MessageStddevPopFields';
  /** Unique message identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevSamp on columns */
export type MessageStddevSampFields = {
  __typename?: 'MessageStddevSampFields';
  /** Unique message identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "message" */
export type MessageStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: MessageStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MessageStreamCursorValueInput = {
  /** Content of the message */
  content?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Unique message identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Identifier of the corresponding service */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type MessageSumFields = {
  __typename?: 'MessageSumFields';
  /** Unique message identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "message" */
export enum MessageUpdateColumn {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ServiceId = 'serviceId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type MessageUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<MessageIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<MessageSetInput>;
  /** filter the rows which have to be updated */
  where: MessageBoolExp;
};

/** aggregate varPop on columns */
export type MessageVarPopFields = {
  __typename?: 'MessageVarPopFields';
  /** Unique message identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Float']['output']>;
};

/** aggregate varSamp on columns */
export type MessageVarSampFields = {
  __typename?: 'MessageVarSampFields';
  /** Unique message identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type MessageVarianceFields = {
  __typename?: 'MessageVarianceFields';
  /** Unique message identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Identifier of the corresponding service */
  serviceId?: Maybe<Scalars['Float']['output']>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** System phases controlling the course assignment workflow */
export type Phase = {
  __typename?: 'Phase';
  /** An array relationship */
  currentPhases: Array<CurrentPhase>;
  /** An aggregate relationship */
  currentPhasesAggregate: CurrentPhaseAggregate;
  /** Summary of activities and permissions during this phase */
  description?: Maybe<Scalars['String']['output']>;
  /** Phase identifier */
  value: Scalars['String']['output'];
};


/** System phases controlling the course assignment workflow */
export type PhaseCurrentPhasesArgs = {
  distinctOn?: InputMaybe<Array<CurrentPhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurrentPhaseOrderBy>>;
  where?: InputMaybe<CurrentPhaseBoolExp>;
};


/** System phases controlling the course assignment workflow */
export type PhaseCurrentPhasesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CurrentPhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurrentPhaseOrderBy>>;
  where?: InputMaybe<CurrentPhaseBoolExp>;
};

/** aggregated selection of "phase" */
export type PhaseAggregate = {
  __typename?: 'PhaseAggregate';
  aggregate?: Maybe<PhaseAggregateFields>;
  nodes: Array<Phase>;
};

/** aggregate fields of "phase" */
export type PhaseAggregateFields = {
  __typename?: 'PhaseAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<PhaseMaxFields>;
  min?: Maybe<PhaseMinFields>;
};


/** aggregate fields of "phase" */
export type PhaseAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<PhaseSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "phase". All fields are combined with a logical 'AND'. */
export type PhaseBoolExp = {
  _and?: InputMaybe<Array<PhaseBoolExp>>;
  _not?: InputMaybe<PhaseBoolExp>;
  _or?: InputMaybe<Array<PhaseBoolExp>>;
  currentPhases?: InputMaybe<CurrentPhaseBoolExp>;
  currentPhasesAggregate?: InputMaybe<CurrentPhaseAggregateBoolExp>;
  description?: InputMaybe<StringComparisonExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "phase" */
export enum PhaseConstraint {
  /** unique or primary key constraint on columns "value" */
  PhasePkey = 'phase_pkey'
}

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

/** Boolean expression to compare columns of type "PhaseEnum". All fields are combined with logical 'AND'. */
export type PhaseEnumComparisonExp = {
  _eq?: InputMaybe<PhaseEnum>;
  _in?: InputMaybe<Array<PhaseEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<PhaseEnum>;
  _nin?: InputMaybe<Array<PhaseEnum>>;
};

/** input type for inserting data into table "phase" */
export type PhaseInsertInput = {
  currentPhases?: InputMaybe<CurrentPhaseArrRelInsertInput>;
  /** Summary of activities and permissions during this phase */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Phase identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type PhaseMaxFields = {
  __typename?: 'PhaseMaxFields';
  /** Summary of activities and permissions during this phase */
  description?: Maybe<Scalars['String']['output']>;
  /** Phase identifier */
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type PhaseMinFields = {
  __typename?: 'PhaseMinFields';
  /** Summary of activities and permissions during this phase */
  description?: Maybe<Scalars['String']['output']>;
  /** Phase identifier */
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "phase" */
export type PhaseMutationResponse = {
  __typename?: 'PhaseMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Phase>;
};

/** input type for inserting object relation for remote table "phase" */
export type PhaseObjRelInsertInput = {
  data: PhaseInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<PhaseOnConflict>;
};

/** on_conflict condition type for table "phase" */
export type PhaseOnConflict = {
  constraint: PhaseConstraint;
  updateColumns?: Array<PhaseUpdateColumn>;
  where?: InputMaybe<PhaseBoolExp>;
};

/** Ordering options when selecting data from "phase". */
export type PhaseOrderBy = {
  currentPhasesAggregate?: InputMaybe<CurrentPhaseAggregateOrderBy>;
  description?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: phase */
export type PhasePkColumnsInput = {
  /** Phase identifier */
  value: Scalars['String']['input'];
};

/** select columns of table "phase" */
export enum PhaseSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "phase" */
export type PhaseSetInput = {
  /** Summary of activities and permissions during this phase */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Phase identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "phase" */
export type PhaseStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: PhaseStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type PhaseStreamCursorValueInput = {
  /** Summary of activities and permissions during this phase */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Phase identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "phase" */
export enum PhaseUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type PhaseUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<PhaseSetInput>;
  /** filter the rows which have to be updated */
  where: PhaseBoolExp;
};

/** Teaching positions with associated service hour requirements */
export type Position = {
  __typename?: 'Position';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Optional description of the position */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique position identifier */
  id: Scalars['Int']['output'];
  /** Human-readable position name for display purposes, unique */
  label: Scalars['String']['output'];
  /** An array relationship */
  teachers: Array<Teacher>;
  /** An aggregate relationship */
  teachersAggregate: TeacherAggregate;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
};


/** Teaching positions with associated service hour requirements */
export type PositionTeachersArgs = {
  distinctOn?: InputMaybe<Array<TeacherSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeacherOrderBy>>;
  where?: InputMaybe<TeacherBoolExp>;
};


/** Teaching positions with associated service hour requirements */
export type PositionTeachersAggregateArgs = {
  distinctOn?: InputMaybe<Array<TeacherSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeacherOrderBy>>;
  where?: InputMaybe<TeacherBoolExp>;
};

/** aggregated selection of "position" */
export type PositionAggregate = {
  __typename?: 'PositionAggregate';
  aggregate?: Maybe<PositionAggregateFields>;
  nodes: Array<Position>;
};

/** aggregate fields of "position" */
export type PositionAggregateFields = {
  __typename?: 'PositionAggregateFields';
  avg?: Maybe<PositionAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<PositionMaxFields>;
  min?: Maybe<PositionMinFields>;
  stddev?: Maybe<PositionStddevFields>;
  stddevPop?: Maybe<PositionStddevPopFields>;
  stddevSamp?: Maybe<PositionStddevSampFields>;
  sum?: Maybe<PositionSumFields>;
  varPop?: Maybe<PositionVarPopFields>;
  varSamp?: Maybe<PositionVarSampFields>;
  variance?: Maybe<PositionVarianceFields>;
};


/** aggregate fields of "position" */
export type PositionAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<PositionSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type PositionAvgFields = {
  __typename?: 'PositionAvgFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "position". All fields are combined with a logical 'AND'. */
export type PositionBoolExp = {
  _and?: InputMaybe<Array<PositionBoolExp>>;
  _not?: InputMaybe<PositionBoolExp>;
  _or?: InputMaybe<Array<PositionBoolExp>>;
  baseServiceHours?: InputMaybe<FloatComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  label?: InputMaybe<StringComparisonExp>;
  teachers?: InputMaybe<TeacherBoolExp>;
  teachersAggregate?: InputMaybe<TeacherAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "position" */
export enum PositionConstraint {
  /** unique or primary key constraint on columns "label" */
  PositionLabelKey = 'position_label_key',
  /** unique or primary key constraint on columns "id" */
  PositionPkey = 'position_pkey'
}

/** input type for incrementing numeric columns in table "position" */
export type PositionIncInput = {
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
};

/** input type for inserting data into table "position" */
export type PositionInsertInput = {
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Optional description of the position */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable position name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  teachers?: InputMaybe<TeacherArrRelInsertInput>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type PositionMaxFields = {
  __typename?: 'PositionMaxFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Optional description of the position */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Human-readable position name for display purposes, unique */
  label?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type PositionMinFields = {
  __typename?: 'PositionMinFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Optional description of the position */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Human-readable position name for display purposes, unique */
  label?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "position" */
export type PositionMutationResponse = {
  __typename?: 'PositionMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Position>;
};

/** input type for inserting object relation for remote table "position" */
export type PositionObjRelInsertInput = {
  data: PositionInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<PositionOnConflict>;
};

/** on_conflict condition type for table "position" */
export type PositionOnConflict = {
  constraint: PositionConstraint;
  updateColumns?: Array<PositionUpdateColumn>;
  where?: InputMaybe<PositionBoolExp>;
};

/** Ordering options when selecting data from "position". */
export type PositionOrderBy = {
  baseServiceHours?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  label?: InputMaybe<OrderBy>;
  teachersAggregate?: InputMaybe<TeacherAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: position */
export type PositionPkColumnsInput = {
  /** Unique position identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "position" */
export enum PositionSelectColumn {
  /** column name */
  BaseServiceHours = 'baseServiceHours',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "position" */
export type PositionSetInput = {
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Optional description of the position */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable position name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type PositionStddevFields = {
  __typename?: 'PositionStddevFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevPop on columns */
export type PositionStddevPopFields = {
  __typename?: 'PositionStddevPopFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevSamp on columns */
export type PositionStddevSampFields = {
  __typename?: 'PositionStddevSampFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "position" */
export type PositionStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: PositionStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type PositionStreamCursorValueInput = {
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Optional description of the position */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Unique position identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Human-readable position name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type PositionSumFields = {
  __typename?: 'PositionSumFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "position" */
export enum PositionUpdateColumn {
  /** column name */
  BaseServiceHours = 'baseServiceHours',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Label = 'label',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type PositionUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<PositionIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<PositionSetInput>;
  /** filter the rows which have to be updated */
  where: PositionBoolExp;
};

/** aggregate varPop on columns */
export type PositionVarPopFields = {
  __typename?: 'PositionVarPopFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate varSamp on columns */
export type PositionVarSampFields = {
  __typename?: 'PositionVarSampFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type PositionVarianceFields = {
  __typename?: 'PositionVarianceFields';
  /** Default annual teaching hours required for this position, can be overridden per teacher */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique position identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Teacher course assignment history and priority status */
export type Priority = {
  __typename?: 'Priority';
  /** Flag indicating whether the seniority value was automatically computed rather than manually assigned */
  computed: Scalars['Boolean']['output'];
  /** An object relationship */
  course: Course;
  /** Course for which priority is tracked */
  courseId: Scalars['Int']['output'];
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Unique priority record identifier */
  id: Scalars['Int']['output'];
  /** Current priority status based on seniority and course rules */
  isPriority?: Maybe<Scalars['Boolean']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  service: Service;
  /** Associated teacher service record */
  serviceId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Year of the priority (must match service's and course's year) */
  year: Scalars['Int']['output'];
  /** An object relationship */
  yearByYear: Year;
};

/** aggregated selection of "priority" */
export type PriorityAggregate = {
  __typename?: 'PriorityAggregate';
  aggregate?: Maybe<PriorityAggregateFields>;
  nodes: Array<Priority>;
};

export type PriorityAggregateBoolExp = {
  bool_and?: InputMaybe<PriorityAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<PriorityAggregateBoolExpBool_Or>;
  count?: InputMaybe<PriorityAggregateBoolExpCount>;
};

/** aggregate fields of "priority" */
export type PriorityAggregateFields = {
  __typename?: 'PriorityAggregateFields';
  avg?: Maybe<PriorityAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<PriorityMaxFields>;
  min?: Maybe<PriorityMinFields>;
  stddev?: Maybe<PriorityStddevFields>;
  stddevPop?: Maybe<PriorityStddevPopFields>;
  stddevSamp?: Maybe<PriorityStddevSampFields>;
  sum?: Maybe<PrioritySumFields>;
  varPop?: Maybe<PriorityVarPopFields>;
  varSamp?: Maybe<PriorityVarSampFields>;
  variance?: Maybe<PriorityVarianceFields>;
};


/** aggregate fields of "priority" */
export type PriorityAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<PrioritySelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "priority" */
export type PriorityAggregateOrderBy = {
  avg?: InputMaybe<PriorityAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<PriorityMaxOrderBy>;
  min?: InputMaybe<PriorityMinOrderBy>;
  stddev?: InputMaybe<PriorityStddevOrderBy>;
  stddevPop?: InputMaybe<PriorityStddevPopOrderBy>;
  stddevSamp?: InputMaybe<PriorityStddevSampOrderBy>;
  sum?: InputMaybe<PrioritySumOrderBy>;
  varPop?: InputMaybe<PriorityVarPopOrderBy>;
  varSamp?: InputMaybe<PriorityVarSampOrderBy>;
  variance?: InputMaybe<PriorityVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "priority" */
export type PriorityArrRelInsertInput = {
  data: Array<PriorityInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<PriorityOnConflict>;
};

/** aggregate avg on columns */
export type PriorityAvgFields = {
  __typename?: 'PriorityAvgFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "priority" */
export type PriorityAvgOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "priority". All fields are combined with a logical 'AND'. */
export type PriorityBoolExp = {
  _and?: InputMaybe<Array<PriorityBoolExp>>;
  _not?: InputMaybe<PriorityBoolExp>;
  _or?: InputMaybe<Array<PriorityBoolExp>>;
  computed?: InputMaybe<BooleanComparisonExp>;
  course?: InputMaybe<CourseBoolExp>;
  courseId?: InputMaybe<IntComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  isPriority?: InputMaybe<BooleanComparisonExp>;
  seniority?: InputMaybe<IntComparisonExp>;
  service?: InputMaybe<ServiceBoolExp>;
  serviceId?: InputMaybe<IntComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  year?: InputMaybe<IntComparisonExp>;
  yearByYear?: InputMaybe<YearBoolExp>;
};

/** unique or primary key constraints on table "priority" */
export enum PriorityConstraint {
  /** unique or primary key constraint on columns "id" */
  PriorityPkey = 'priority_pkey',
  /** unique or primary key constraint on columns "course_id", "service_id" */
  PriorityServiceIdCourseIdKey = 'priority_service_id_course_id_key'
}

/** input type for incrementing numeric columns in table "priority" */
export type PriorityIncInput = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<Scalars['Int']['input']>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "priority" */
export type PriorityInsertInput = {
  /** Flag indicating whether the seniority value was automatically computed rather than manually assigned */
  computed?: InputMaybe<Scalars['Boolean']['input']>;
  course?: InputMaybe<CourseObjRelInsertInput>;
  /** Course for which priority is tracked */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Current priority status based on seniority and course rules */
  isPriority?: InputMaybe<Scalars['Boolean']['input']>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<Scalars['Int']['input']>;
  service?: InputMaybe<ServiceObjRelInsertInput>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<Scalars['Int']['input']>;
  yearByYear?: InputMaybe<YearObjRelInsertInput>;
};

/** aggregate max on columns */
export type PriorityMaxFields = {
  __typename?: 'PriorityMaxFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Int']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "priority" */
export type PriorityMaxOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type PriorityMinFields = {
  __typename?: 'PriorityMinFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Int']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "priority" */
export type PriorityMinOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "priority" */
export type PriorityMutationResponse = {
  __typename?: 'PriorityMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Priority>;
};

/** on_conflict condition type for table "priority" */
export type PriorityOnConflict = {
  constraint: PriorityConstraint;
  updateColumns?: Array<PriorityUpdateColumn>;
  where?: InputMaybe<PriorityBoolExp>;
};

/** Ordering options when selecting data from "priority". */
export type PriorityOrderBy = {
  computed?: InputMaybe<OrderBy>;
  course?: InputMaybe<CourseOrderBy>;
  courseId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  isPriority?: InputMaybe<OrderBy>;
  seniority?: InputMaybe<OrderBy>;
  service?: InputMaybe<ServiceOrderBy>;
  serviceId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
  yearByYear?: InputMaybe<YearOrderBy>;
};

/** primary key columns input for table: priority */
export type PriorityPkColumnsInput = {
  /** Unique priority record identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "priority" */
export enum PrioritySelectColumn {
  /** column name */
  Computed = 'computed',
  /** column name */
  CourseId = 'courseId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsPriority = 'isPriority',
  /** column name */
  Seniority = 'seniority',
  /** column name */
  ServiceId = 'serviceId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Year = 'year'
}

/** select "priorityAggregateBoolExpBool_andArgumentsColumns" columns of table "priority" */
export enum PrioritySelectColumnPriorityAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  Computed = 'computed',
  /** column name */
  IsPriority = 'isPriority'
}

/** select "priorityAggregateBoolExpBool_orArgumentsColumns" columns of table "priority" */
export enum PrioritySelectColumnPriorityAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  Computed = 'computed',
  /** column name */
  IsPriority = 'isPriority'
}

/** input type for updating data in table "priority" */
export type PrioritySetInput = {
  /** Flag indicating whether the seniority value was automatically computed rather than manually assigned */
  computed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Course for which priority is tracked */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Current priority status based on seniority and course rules */
  isPriority?: InputMaybe<Scalars['Boolean']['input']>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<Scalars['Int']['input']>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type PriorityStddevFields = {
  __typename?: 'PriorityStddevFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "priority" */
export type PriorityStddevOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type PriorityStddevPopFields = {
  __typename?: 'PriorityStddevPopFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "priority" */
export type PriorityStddevPopOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type PriorityStddevSampFields = {
  __typename?: 'PriorityStddevSampFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "priority" */
export type PriorityStddevSampOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "priority" */
export type PriorityStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: PriorityStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type PriorityStreamCursorValueInput = {
  /** Flag indicating whether the seniority value was automatically computed rather than manually assigned */
  computed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Course for which priority is tracked */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Unique priority record identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Current priority status based on seniority and course rules */
  isPriority?: InputMaybe<Scalars['Boolean']['input']>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<Scalars['Int']['input']>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type PrioritySumFields = {
  __typename?: 'PrioritySumFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Int']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "priority" */
export type PrioritySumOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** update columns of table "priority" */
export enum PriorityUpdateColumn {
  /** column name */
  Computed = 'computed',
  /** column name */
  CourseId = 'courseId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  IsPriority = 'isPriority',
  /** column name */
  Seniority = 'seniority',
  /** column name */
  ServiceId = 'serviceId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Year = 'year'
}

export type PriorityUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<PriorityIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<PrioritySetInput>;
  /** filter the rows which have to be updated */
  where: PriorityBoolExp;
};

/** aggregate varPop on columns */
export type PriorityVarPopFields = {
  __typename?: 'PriorityVarPopFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "priority" */
export type PriorityVarPopOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type PriorityVarSampFields = {
  __typename?: 'PriorityVarSampFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "priority" */
export type PriorityVarSampOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type PriorityVarianceFields = {
  __typename?: 'PriorityVarianceFields';
  /** Course for which priority is tracked */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Unique priority record identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Consecutive years teaching this course before current year */
  seniority?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the priority (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "priority" */
export type PriorityVarianceOrderBy = {
  /** Course for which priority is tracked */
  courseId?: InputMaybe<OrderBy>;
  /** Unique priority record identifier */
  id?: InputMaybe<OrderBy>;
  /** Consecutive years teaching this course before current year */
  seniority?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the priority (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** Academic programs within each degree */
export type Program = {
  __typename?: 'Program';
  /** An array relationship */
  coordinations: Array<Coordination>;
  /** An aggregate relationship */
  coordinationsAggregate: CoordinationAggregate;
  /** An array relationship */
  courses: Array<Course>;
  /** An aggregate relationship */
  coursesAggregate: CourseAggregate;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** An object relationship */
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
  nomImport?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  tracks: Array<Track>;
  /** An aggregate relationship */
  tracksAggregate: TrackAggregate;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Controls program visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Academic programs within each degree */
export type ProgramCoordinationsArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


/** Academic programs within each degree */
export type ProgramCoordinationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


/** Academic programs within each degree */
export type ProgramCoursesArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


/** Academic programs within each degree */
export type ProgramCoursesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


/** Academic programs within each degree */
export type ProgramTracksArgs = {
  distinctOn?: InputMaybe<Array<TrackSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TrackOrderBy>>;
  where?: InputMaybe<TrackBoolExp>;
};


/** Academic programs within each degree */
export type ProgramTracksAggregateArgs = {
  distinctOn?: InputMaybe<Array<TrackSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TrackOrderBy>>;
  where?: InputMaybe<TrackBoolExp>;
};

/** aggregated selection of "program" */
export type ProgramAggregate = {
  __typename?: 'ProgramAggregate';
  aggregate?: Maybe<ProgramAggregateFields>;
  nodes: Array<Program>;
};

export type ProgramAggregateBoolExp = {
  bool_and?: InputMaybe<ProgramAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<ProgramAggregateBoolExpBool_Or>;
  count?: InputMaybe<ProgramAggregateBoolExpCount>;
};

/** aggregate fields of "program" */
export type ProgramAggregateFields = {
  __typename?: 'ProgramAggregateFields';
  avg?: Maybe<ProgramAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<ProgramMaxFields>;
  min?: Maybe<ProgramMinFields>;
  stddev?: Maybe<ProgramStddevFields>;
  stddevPop?: Maybe<ProgramStddevPopFields>;
  stddevSamp?: Maybe<ProgramStddevSampFields>;
  sum?: Maybe<ProgramSumFields>;
  varPop?: Maybe<ProgramVarPopFields>;
  varSamp?: Maybe<ProgramVarSampFields>;
  variance?: Maybe<ProgramVarianceFields>;
};


/** aggregate fields of "program" */
export type ProgramAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ProgramSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "program" */
export type ProgramAggregateOrderBy = {
  avg?: InputMaybe<ProgramAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ProgramMaxOrderBy>;
  min?: InputMaybe<ProgramMinOrderBy>;
  stddev?: InputMaybe<ProgramStddevOrderBy>;
  stddevPop?: InputMaybe<ProgramStddevPopOrderBy>;
  stddevSamp?: InputMaybe<ProgramStddevSampOrderBy>;
  sum?: InputMaybe<ProgramSumOrderBy>;
  varPop?: InputMaybe<ProgramVarPopOrderBy>;
  varSamp?: InputMaybe<ProgramVarSampOrderBy>;
  variance?: InputMaybe<ProgramVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "program" */
export type ProgramArrRelInsertInput = {
  data: Array<ProgramInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<ProgramOnConflict>;
};

/** aggregate avg on columns */
export type ProgramAvgFields = {
  __typename?: 'ProgramAvgFields';
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Float']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "program" */
export type ProgramAvgOrderBy = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "program". All fields are combined with a logical 'AND'. */
export type ProgramBoolExp = {
  _and?: InputMaybe<Array<ProgramBoolExp>>;
  _not?: InputMaybe<ProgramBoolExp>;
  _or?: InputMaybe<Array<ProgramBoolExp>>;
  coordinations?: InputMaybe<CoordinationBoolExp>;
  coordinationsAggregate?: InputMaybe<CoordinationAggregateBoolExp>;
  courses?: InputMaybe<CourseBoolExp>;
  coursesAggregate?: InputMaybe<CourseAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  degree?: InputMaybe<DegreeBoolExp>;
  degreeId?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  nameDisplay?: InputMaybe<StringComparisonExp>;
  nameShort?: InputMaybe<StringComparisonExp>;
  nomImport?: InputMaybe<StringComparisonExp>;
  tracks?: InputMaybe<TrackBoolExp>;
  tracksAggregate?: InputMaybe<TrackAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  visible?: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "program" */
export enum ProgramConstraint {
  /** unique or primary key constraint on columns "degree_id", "name" */
  ProgramDegreeIdNameKey = 'program_degree_id_name_key',
  /** unique or primary key constraint on columns "id" */
  ProgramPkey = 'program_pkey'
}

/** input type for incrementing numeric columns in table "program" */
export type ProgramIncInput = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "program" */
export type ProgramInsertInput = {
  coordinations?: InputMaybe<CoordinationArrRelInsertInput>;
  courses?: InputMaybe<CourseArrRelInsertInput>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  degree?: InputMaybe<DegreeObjRelInsertInput>;
  /** Parent degree for this program */
  degreeId?: InputMaybe<Scalars['Int']['input']>;
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated program name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
  tracks?: InputMaybe<TrackArrRelInsertInput>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls program visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type ProgramMaxFields = {
  __typename?: 'ProgramMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Int']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name?: Maybe<Scalars['String']['output']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated program name */
  nameShort?: Maybe<Scalars['String']['output']>;
  nomImport?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "program" */
export type ProgramMaxOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name?: InputMaybe<OrderBy>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<OrderBy>;
  /** Abbreviated program name */
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type ProgramMinFields = {
  __typename?: 'ProgramMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Int']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name?: Maybe<Scalars['String']['output']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated program name */
  nameShort?: Maybe<Scalars['String']['output']>;
  nomImport?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "program" */
export type ProgramMinOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name?: InputMaybe<OrderBy>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<OrderBy>;
  /** Abbreviated program name */
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "program" */
export type ProgramMutationResponse = {
  __typename?: 'ProgramMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Program>;
};

/** input type for inserting object relation for remote table "program" */
export type ProgramObjRelInsertInput = {
  data: ProgramInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<ProgramOnConflict>;
};

/** on_conflict condition type for table "program" */
export type ProgramOnConflict = {
  constraint: ProgramConstraint;
  updateColumns?: Array<ProgramUpdateColumn>;
  where?: InputMaybe<ProgramBoolExp>;
};

/** Ordering options when selecting data from "program". */
export type ProgramOrderBy = {
  coordinationsAggregate?: InputMaybe<CoordinationAggregateOrderBy>;
  coursesAggregate?: InputMaybe<CourseAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  degree?: InputMaybe<DegreeOrderBy>;
  degreeId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  nameDisplay?: InputMaybe<OrderBy>;
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  tracksAggregate?: InputMaybe<TrackAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  visible?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: program */
export type ProgramPkColumnsInput = {
  /** Unique program identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "program" */
export enum ProgramSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DegreeId = 'degreeId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  NameDisplay = 'nameDisplay',
  /** column name */
  NameShort = 'nameShort',
  /** column name */
  NomImport = 'nomImport',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible'
}

/** select "programAggregateBoolExpBool_andArgumentsColumns" columns of table "program" */
export enum ProgramSelectColumnProgramAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  Visible = 'visible'
}

/** select "programAggregateBoolExpBool_orArgumentsColumns" columns of table "program" */
export enum ProgramSelectColumnProgramAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "program" */
export type ProgramSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Parent degree for this program */
  degreeId?: InputMaybe<Scalars['Int']['input']>;
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated program name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls program visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type ProgramStddevFields = {
  __typename?: 'ProgramStddevFields';
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Float']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "program" */
export type ProgramStddevOrderBy = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type ProgramStddevPopFields = {
  __typename?: 'ProgramStddevPopFields';
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Float']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "program" */
export type ProgramStddevPopOrderBy = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type ProgramStddevSampFields = {
  __typename?: 'ProgramStddevSampFields';
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Float']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "program" */
export type ProgramStddevSampOrderBy = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "program" */
export type ProgramStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ProgramStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ProgramStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Parent degree for this program */
  degreeId?: InputMaybe<Scalars['Int']['input']>;
  /** Unique program identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Full program name, unique within its degree (e.g., Mathematics) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated program name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls program visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type ProgramSumFields = {
  __typename?: 'ProgramSumFields';
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Int']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "program" */
export type ProgramSumOrderBy = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
};

/** update columns of table "program" */
export enum ProgramUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DegreeId = 'degreeId',
  /** column name */
  Name = 'name',
  /** column name */
  NameShort = 'nameShort',
  /** column name */
  NomImport = 'nomImport',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible'
}

export type ProgramUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<ProgramIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ProgramSetInput>;
  /** filter the rows which have to be updated */
  where: ProgramBoolExp;
};

/** aggregate varPop on columns */
export type ProgramVarPopFields = {
  __typename?: 'ProgramVarPopFields';
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Float']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "program" */
export type ProgramVarPopOrderBy = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type ProgramVarSampFields = {
  __typename?: 'ProgramVarSampFields';
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Float']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "program" */
export type ProgramVarSampOrderBy = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type ProgramVarianceFields = {
  __typename?: 'ProgramVarianceFields';
  /** Parent degree for this program */
  degreeId?: Maybe<Scalars['Float']['output']>;
  /** Unique program identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "program" */
export type ProgramVarianceOrderBy = {
  /** Parent degree for this program */
  degreeId?: InputMaybe<OrderBy>;
  /** Unique program identifier */
  id?: InputMaybe<OrderBy>;
};

/** Teacher requests and assignments for courses */
export type Request = {
  __typename?: 'Request';
  /** An object relationship */
  course: Course;
  /** Requested or assigned course */
  courseId: Scalars['Int']['output'];
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Requested or assigned teaching hours */
  hours: Scalars['Float']['output'];
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id: Scalars['Int']['output'];
  /** Determines the priority status of a request based on teaching history and course priority rules */
  isPriority?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  requestType: RequestType;
  /** An object relationship */
  service: Service;
  /** Associated teacher service record */
  serviceId: Scalars['Int']['output'];
  /** Type of request (primary choice, backup, or final assignment) */
  type: RequestTypeEnum;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Year of the request (must match service's and course's year) */
  year: Scalars['Int']['output'];
  /** An object relationship */
  yearByYear: Year;
};

/** aggregated selection of "request" */
export type RequestAggregate = {
  __typename?: 'RequestAggregate';
  aggregate?: Maybe<RequestAggregateFields>;
  nodes: Array<Request>;
};

export type RequestAggregateBoolExp = {
  count?: InputMaybe<RequestAggregateBoolExpCount>;
};

/** aggregate fields of "request" */
export type RequestAggregateFields = {
  __typename?: 'RequestAggregateFields';
  avg?: Maybe<RequestAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<RequestMaxFields>;
  min?: Maybe<RequestMinFields>;
  stddev?: Maybe<RequestStddevFields>;
  stddevPop?: Maybe<RequestStddevPopFields>;
  stddevSamp?: Maybe<RequestStddevSampFields>;
  sum?: Maybe<RequestSumFields>;
  varPop?: Maybe<RequestVarPopFields>;
  varSamp?: Maybe<RequestVarSampFields>;
  variance?: Maybe<RequestVarianceFields>;
};


/** aggregate fields of "request" */
export type RequestAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<RequestSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "request" */
export type RequestAggregateOrderBy = {
  avg?: InputMaybe<RequestAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<RequestMaxOrderBy>;
  min?: InputMaybe<RequestMinOrderBy>;
  stddev?: InputMaybe<RequestStddevOrderBy>;
  stddevPop?: InputMaybe<RequestStddevPopOrderBy>;
  stddevSamp?: InputMaybe<RequestStddevSampOrderBy>;
  sum?: InputMaybe<RequestSumOrderBy>;
  varPop?: InputMaybe<RequestVarPopOrderBy>;
  varSamp?: InputMaybe<RequestVarSampOrderBy>;
  variance?: InputMaybe<RequestVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "request" */
export type RequestArrRelInsertInput = {
  data: Array<RequestInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<RequestOnConflict>;
};

/** aggregate avg on columns */
export type RequestAvgFields = {
  __typename?: 'RequestAvgFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "request" */
export type RequestAvgOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "request". All fields are combined with a logical 'AND'. */
export type RequestBoolExp = {
  _and?: InputMaybe<Array<RequestBoolExp>>;
  _not?: InputMaybe<RequestBoolExp>;
  _or?: InputMaybe<Array<RequestBoolExp>>;
  course?: InputMaybe<CourseBoolExp>;
  courseId?: InputMaybe<IntComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  hours?: InputMaybe<FloatComparisonExp>;
  hoursWeighted?: InputMaybe<FloatComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  isPriority?: InputMaybe<BooleanComparisonExp>;
  requestType?: InputMaybe<RequestTypeBoolExp>;
  service?: InputMaybe<ServiceBoolExp>;
  serviceId?: InputMaybe<IntComparisonExp>;
  type?: InputMaybe<RequestTypeEnumComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  year?: InputMaybe<IntComparisonExp>;
  yearByYear?: InputMaybe<YearBoolExp>;
};

/** unique or primary key constraints on table "request" */
export enum RequestConstraint {
  /** unique or primary key constraint on columns "id" */
  RequestPkey = 'request_pkey',
  /** unique or primary key constraint on columns "type", "course_id", "service_id" */
  RequestServiceIdCourseIdTypeKey = 'request_service_id_course_id_type_key'
}

/** input type for incrementing numeric columns in table "request" */
export type RequestIncInput = {
  /** Requested or assigned course */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "request" */
export type RequestInsertInput = {
  course?: InputMaybe<CourseObjRelInsertInput>;
  /** Requested or assigned course */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<Scalars['Float']['input']>;
  requestType?: InputMaybe<RequestTypeObjRelInsertInput>;
  service?: InputMaybe<ServiceObjRelInsertInput>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Type of request (primary choice, backup, or final assignment) */
  type?: InputMaybe<RequestTypeEnum>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<Scalars['Int']['input']>;
  yearByYear?: InputMaybe<YearObjRelInsertInput>;
};

/** aggregate max on columns */
export type RequestMaxFields = {
  __typename?: 'RequestMaxFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "request" */
export type RequestMaxOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type RequestMinFields = {
  __typename?: 'RequestMinFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "request" */
export type RequestMinOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "request" */
export type RequestMutationResponse = {
  __typename?: 'RequestMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Request>;
};

/** on_conflict condition type for table "request" */
export type RequestOnConflict = {
  constraint: RequestConstraint;
  updateColumns?: Array<RequestUpdateColumn>;
  where?: InputMaybe<RequestBoolExp>;
};

/** Ordering options when selecting data from "request". */
export type RequestOrderBy = {
  course?: InputMaybe<CourseOrderBy>;
  courseId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  hours?: InputMaybe<OrderBy>;
  hoursWeighted?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  isPriority?: InputMaybe<OrderBy>;
  requestType?: InputMaybe<RequestTypeOrderBy>;
  service?: InputMaybe<ServiceOrderBy>;
  serviceId?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
  yearByYear?: InputMaybe<YearOrderBy>;
};

/** primary key columns input for table: request */
export type RequestPkColumnsInput = {
  /** Unique request identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "request" */
export enum RequestSelectColumn {
  /** column name */
  CourseId = 'courseId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Hours = 'hours',
  /** column name */
  Id = 'id',
  /** column name */
  ServiceId = 'serviceId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Year = 'year'
}

/** input type for updating data in table "request" */
export type RequestSetInput = {
  /** Requested or assigned course */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Type of request (primary choice, backup, or final assignment) */
  type?: InputMaybe<RequestTypeEnum>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type RequestStddevFields = {
  __typename?: 'RequestStddevFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "request" */
export type RequestStddevOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type RequestStddevPopFields = {
  __typename?: 'RequestStddevPopFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "request" */
export type RequestStddevPopOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type RequestStddevSampFields = {
  __typename?: 'RequestStddevSampFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "request" */
export type RequestStddevSampOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "request" */
export type RequestStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: RequestStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RequestStreamCursorValueInput = {
  /** Requested or assigned course */
  courseId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Unique request identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Type of request (primary choice, backup, or final assignment) */
  type?: InputMaybe<RequestTypeEnum>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type RequestSumFields = {
  __typename?: 'RequestSumFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Int']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "request" */
export type RequestSumOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** Types of teaching assignment requests in workflow */
export type RequestType = {
  __typename?: 'RequestType';
  /** Description of the request type and its purpose */
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  requests: Array<Request>;
  /** An aggregate relationship */
  requestsAggregate: RequestAggregate;
  /** Request type identifier */
  value: Scalars['String']['output'];
};


/** Types of teaching assignment requests in workflow */
export type RequestTypeRequestsArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


/** Types of teaching assignment requests in workflow */
export type RequestTypeRequestsAggregateArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};

/** aggregated selection of "request_type" */
export type RequestTypeAggregate = {
  __typename?: 'RequestTypeAggregate';
  aggregate?: Maybe<RequestTypeAggregateFields>;
  nodes: Array<RequestType>;
};

/** aggregate fields of "request_type" */
export type RequestTypeAggregateFields = {
  __typename?: 'RequestTypeAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<RequestTypeMaxFields>;
  min?: Maybe<RequestTypeMinFields>;
};


/** aggregate fields of "request_type" */
export type RequestTypeAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<RequestTypeSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "request_type". All fields are combined with a logical 'AND'. */
export type RequestTypeBoolExp = {
  _and?: InputMaybe<Array<RequestTypeBoolExp>>;
  _not?: InputMaybe<RequestTypeBoolExp>;
  _or?: InputMaybe<Array<RequestTypeBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  requests?: InputMaybe<RequestBoolExp>;
  requestsAggregate?: InputMaybe<RequestAggregateBoolExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "request_type" */
export enum RequestTypeConstraint {
  /** unique or primary key constraint on columns "value" */
  RequestTypePkey = 'request_type_pkey'
}

export enum RequestTypeEnum {
  /** Final course assignment made by the committee during the assignments phase */
  Assignment = 'ASSIGNMENT',
  /** Teacher's preferred course choices submitted during the requests phase */
  Primary = 'PRIMARY',
  /** Teacher's backup course choices submitted during the requests phase */
  Secondary = 'SECONDARY'
}

/** Boolean expression to compare columns of type "RequestTypeEnum". All fields are combined with logical 'AND'. */
export type RequestTypeEnumComparisonExp = {
  _eq?: InputMaybe<RequestTypeEnum>;
  _in?: InputMaybe<Array<RequestTypeEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<RequestTypeEnum>;
  _nin?: InputMaybe<Array<RequestTypeEnum>>;
};

/** input type for inserting data into table "request_type" */
export type RequestTypeInsertInput = {
  /** Description of the request type and its purpose */
  description?: InputMaybe<Scalars['String']['input']>;
  requests?: InputMaybe<RequestArrRelInsertInput>;
  /** Request type identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type RequestTypeMaxFields = {
  __typename?: 'RequestTypeMaxFields';
  /** Description of the request type and its purpose */
  description?: Maybe<Scalars['String']['output']>;
  /** Request type identifier */
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type RequestTypeMinFields = {
  __typename?: 'RequestTypeMinFields';
  /** Description of the request type and its purpose */
  description?: Maybe<Scalars['String']['output']>;
  /** Request type identifier */
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "request_type" */
export type RequestTypeMutationResponse = {
  __typename?: 'RequestTypeMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<RequestType>;
};

/** input type for inserting object relation for remote table "request_type" */
export type RequestTypeObjRelInsertInput = {
  data: RequestTypeInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<RequestTypeOnConflict>;
};

/** on_conflict condition type for table "request_type" */
export type RequestTypeOnConflict = {
  constraint: RequestTypeConstraint;
  updateColumns?: Array<RequestTypeUpdateColumn>;
  where?: InputMaybe<RequestTypeBoolExp>;
};

/** Ordering options when selecting data from "request_type". */
export type RequestTypeOrderBy = {
  description?: InputMaybe<OrderBy>;
  requestsAggregate?: InputMaybe<RequestAggregateOrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: request_type */
export type RequestTypePkColumnsInput = {
  /** Request type identifier */
  value: Scalars['String']['input'];
};

/** select columns of table "request_type" */
export enum RequestTypeSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "request_type" */
export type RequestTypeSetInput = {
  /** Description of the request type and its purpose */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Request type identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "request_type" */
export type RequestTypeStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: RequestTypeStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RequestTypeStreamCursorValueInput = {
  /** Description of the request type and its purpose */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Request type identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "request_type" */
export enum RequestTypeUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type RequestTypeUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<RequestTypeSetInput>;
  /** filter the rows which have to be updated */
  where: RequestTypeBoolExp;
};

/** update columns of table "request" */
export enum RequestUpdateColumn {
  /** column name */
  CourseId = 'courseId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Hours = 'hours',
  /** column name */
  ServiceId = 'serviceId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Year = 'year'
}

export type RequestUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<RequestIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<RequestSetInput>;
  /** filter the rows which have to be updated */
  where: RequestBoolExp;
};

/** aggregate varPop on columns */
export type RequestVarPopFields = {
  __typename?: 'RequestVarPopFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "request" */
export type RequestVarPopOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type RequestVarSampFields = {
  __typename?: 'RequestVarSampFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "request" */
export type RequestVarSampOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type RequestVarianceFields = {
  __typename?: 'RequestVarianceFields';
  /** Requested or assigned course */
  courseId?: Maybe<Scalars['Float']['output']>;
  /** Requested or assigned teaching hours */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Calculates weighted hours for a request by multiplying the requested hours by the course type coefficient */
  hoursWeighted?: Maybe<Scalars['Float']['output']>;
  /** Unique request identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Associated teacher service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Year of the request (must match service's and course's year) */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "request" */
export type RequestVarianceOrderBy = {
  /** Requested or assigned course */
  courseId?: InputMaybe<OrderBy>;
  /** Requested or assigned teaching hours */
  hours?: InputMaybe<OrderBy>;
  /** Unique request identifier */
  id?: InputMaybe<OrderBy>;
  /** Associated teacher service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Year of the request (must match service's and course's year) */
  year?: InputMaybe<OrderBy>;
};

/** Teacher role assignments for system privileges */
export type Role = {
  __typename?: 'Role';
  /** Additional information about this privilege assignment */
  comment?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Unique role assignment identifier */
  id: Scalars['Int']['output'];
  /** An object relationship */
  roleType: RoleType;
  /** An object relationship */
  teacher: Teacher;
  /** Teacher identifier with role access */
  teacherId: Scalars['Int']['output'];
  /** Type of privileged role */
  type: RoleTypeEnum;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "role" */
export type RoleAggregate = {
  __typename?: 'RoleAggregate';
  aggregate?: Maybe<RoleAggregateFields>;
  nodes: Array<Role>;
};

export type RoleAggregateBoolExp = {
  count?: InputMaybe<RoleAggregateBoolExpCount>;
};

/** aggregate fields of "role" */
export type RoleAggregateFields = {
  __typename?: 'RoleAggregateFields';
  avg?: Maybe<RoleAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<RoleMaxFields>;
  min?: Maybe<RoleMinFields>;
  stddev?: Maybe<RoleStddevFields>;
  stddevPop?: Maybe<RoleStddevPopFields>;
  stddevSamp?: Maybe<RoleStddevSampFields>;
  sum?: Maybe<RoleSumFields>;
  varPop?: Maybe<RoleVarPopFields>;
  varSamp?: Maybe<RoleVarSampFields>;
  variance?: Maybe<RoleVarianceFields>;
};


/** aggregate fields of "role" */
export type RoleAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<RoleSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "role" */
export type RoleAggregateOrderBy = {
  avg?: InputMaybe<RoleAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<RoleMaxOrderBy>;
  min?: InputMaybe<RoleMinOrderBy>;
  stddev?: InputMaybe<RoleStddevOrderBy>;
  stddevPop?: InputMaybe<RoleStddevPopOrderBy>;
  stddevSamp?: InputMaybe<RoleStddevSampOrderBy>;
  sum?: InputMaybe<RoleSumOrderBy>;
  varPop?: InputMaybe<RoleVarPopOrderBy>;
  varSamp?: InputMaybe<RoleVarSampOrderBy>;
  variance?: InputMaybe<RoleVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "role" */
export type RoleArrRelInsertInput = {
  data: Array<RoleInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<RoleOnConflict>;
};

/** aggregate avg on columns */
export type RoleAvgFields = {
  __typename?: 'RoleAvgFields';
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "role" */
export type RoleAvgOrderBy = {
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "role". All fields are combined with a logical 'AND'. */
export type RoleBoolExp = {
  _and?: InputMaybe<Array<RoleBoolExp>>;
  _not?: InputMaybe<RoleBoolExp>;
  _or?: InputMaybe<Array<RoleBoolExp>>;
  comment?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  roleType?: InputMaybe<RoleTypeBoolExp>;
  teacher?: InputMaybe<TeacherBoolExp>;
  teacherId?: InputMaybe<IntComparisonExp>;
  type?: InputMaybe<RoleTypeEnumComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "role" */
export enum RoleConstraint {
  /** unique or primary key constraint on columns "id" */
  RolePkey = 'role_pkey',
  /** unique or primary key constraint on columns "teacher_id", "type" */
  RoleTeacherIdTypeKey = 'role_teacher_id_type_key'
}

/** input type for incrementing numeric columns in table "role" */
export type RoleIncInput = {
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "role" */
export type RoleInsertInput = {
  /** Additional information about this privilege assignment */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  roleType?: InputMaybe<RoleTypeObjRelInsertInput>;
  teacher?: InputMaybe<TeacherObjRelInsertInput>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Type of privileged role */
  type?: InputMaybe<RoleTypeEnum>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type RoleMaxFields = {
  __typename?: 'RoleMaxFields';
  /** Additional information about this privilege assignment */
  comment?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "role" */
export type RoleMaxOrderBy = {
  /** Additional information about this privilege assignment */
  comment?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type RoleMinFields = {
  __typename?: 'RoleMinFields';
  /** Additional information about this privilege assignment */
  comment?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "role" */
export type RoleMinOrderBy = {
  /** Additional information about this privilege assignment */
  comment?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "role" */
export type RoleMutationResponse = {
  __typename?: 'RoleMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Role>;
};

/** on_conflict condition type for table "role" */
export type RoleOnConflict = {
  constraint: RoleConstraint;
  updateColumns?: Array<RoleUpdateColumn>;
  where?: InputMaybe<RoleBoolExp>;
};

/** Ordering options when selecting data from "role". */
export type RoleOrderBy = {
  comment?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  roleType?: InputMaybe<RoleTypeOrderBy>;
  teacher?: InputMaybe<TeacherOrderBy>;
  teacherId?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: role */
export type RolePkColumnsInput = {
  /** Unique role assignment identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "role" */
export enum RoleSelectColumn {
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  TeacherId = 'teacherId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "role" */
export type RoleSetInput = {
  /** Additional information about this privilege assignment */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Type of privileged role */
  type?: InputMaybe<RoleTypeEnum>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type RoleStddevFields = {
  __typename?: 'RoleStddevFields';
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "role" */
export type RoleStddevOrderBy = {
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type RoleStddevPopFields = {
  __typename?: 'RoleStddevPopFields';
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "role" */
export type RoleStddevPopOrderBy = {
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type RoleStddevSampFields = {
  __typename?: 'RoleStddevSampFields';
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "role" */
export type RoleStddevSampOrderBy = {
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "role" */
export type RoleStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: RoleStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RoleStreamCursorValueInput = {
  /** Additional information about this privilege assignment */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Unique role assignment identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Type of privileged role */
  type?: InputMaybe<RoleTypeEnum>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type RoleSumFields = {
  __typename?: 'RoleSumFields';
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "role" */
export type RoleSumOrderBy = {
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
};

/** System roles for privileged access */
export type RoleType = {
  __typename?: 'RoleType';
  /** Description of the role privileges and responsibilities */
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  roles: Array<Role>;
  /** An aggregate relationship */
  rolesAggregate: RoleAggregate;
  /** Role identifier */
  value: Scalars['String']['output'];
};


/** System roles for privileged access */
export type RoleTypeRolesArgs = {
  distinctOn?: InputMaybe<Array<RoleSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  where?: InputMaybe<RoleBoolExp>;
};


/** System roles for privileged access */
export type RoleTypeRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<RoleSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  where?: InputMaybe<RoleBoolExp>;
};

/** aggregated selection of "role_type" */
export type RoleTypeAggregate = {
  __typename?: 'RoleTypeAggregate';
  aggregate?: Maybe<RoleTypeAggregateFields>;
  nodes: Array<RoleType>;
};

/** aggregate fields of "role_type" */
export type RoleTypeAggregateFields = {
  __typename?: 'RoleTypeAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<RoleTypeMaxFields>;
  min?: Maybe<RoleTypeMinFields>;
};


/** aggregate fields of "role_type" */
export type RoleTypeAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<RoleTypeSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "role_type". All fields are combined with a logical 'AND'. */
export type RoleTypeBoolExp = {
  _and?: InputMaybe<Array<RoleTypeBoolExp>>;
  _not?: InputMaybe<RoleTypeBoolExp>;
  _or?: InputMaybe<Array<RoleTypeBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  roles?: InputMaybe<RoleBoolExp>;
  rolesAggregate?: InputMaybe<RoleAggregateBoolExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "role_type" */
export enum RoleTypeConstraint {
  /** unique or primary key constraint on columns "value" */
  RoleTypePkey = 'role_type_pkey'
}

export enum RoleTypeEnum {
  /** Full system administration access with ability to manage users, roles, and system configuration */
  Admin = 'ADMIN',
  /** Member of the course assignment committee with extra abilities during the assignments phase */
  Commissioner = 'COMMISSIONER',
  /** Base role with limited abilities */
  Teacher = 'TEACHER'
}

/** Boolean expression to compare columns of type "RoleTypeEnum". All fields are combined with logical 'AND'. */
export type RoleTypeEnumComparisonExp = {
  _eq?: InputMaybe<RoleTypeEnum>;
  _in?: InputMaybe<Array<RoleTypeEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<RoleTypeEnum>;
  _nin?: InputMaybe<Array<RoleTypeEnum>>;
};

/** input type for inserting data into table "role_type" */
export type RoleTypeInsertInput = {
  /** Description of the role privileges and responsibilities */
  description?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<RoleArrRelInsertInput>;
  /** Role identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type RoleTypeMaxFields = {
  __typename?: 'RoleTypeMaxFields';
  /** Description of the role privileges and responsibilities */
  description?: Maybe<Scalars['String']['output']>;
  /** Role identifier */
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type RoleTypeMinFields = {
  __typename?: 'RoleTypeMinFields';
  /** Description of the role privileges and responsibilities */
  description?: Maybe<Scalars['String']['output']>;
  /** Role identifier */
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "role_type" */
export type RoleTypeMutationResponse = {
  __typename?: 'RoleTypeMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<RoleType>;
};

/** input type for inserting object relation for remote table "role_type" */
export type RoleTypeObjRelInsertInput = {
  data: RoleTypeInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<RoleTypeOnConflict>;
};

/** on_conflict condition type for table "role_type" */
export type RoleTypeOnConflict = {
  constraint: RoleTypeConstraint;
  updateColumns?: Array<RoleTypeUpdateColumn>;
  where?: InputMaybe<RoleTypeBoolExp>;
};

/** Ordering options when selecting data from "role_type". */
export type RoleTypeOrderBy = {
  description?: InputMaybe<OrderBy>;
  rolesAggregate?: InputMaybe<RoleAggregateOrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: role_type */
export type RoleTypePkColumnsInput = {
  /** Role identifier */
  value: Scalars['String']['input'];
};

/** select columns of table "role_type" */
export enum RoleTypeSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "role_type" */
export type RoleTypeSetInput = {
  /** Description of the role privileges and responsibilities */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Role identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "role_type" */
export type RoleTypeStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: RoleTypeStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RoleTypeStreamCursorValueInput = {
  /** Description of the role privileges and responsibilities */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Role identifier */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "role_type" */
export enum RoleTypeUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type RoleTypeUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<RoleTypeSetInput>;
  /** filter the rows which have to be updated */
  where: RoleTypeBoolExp;
};

/** update columns of table "role" */
export enum RoleUpdateColumn {
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  TeacherId = 'teacherId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type RoleUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<RoleIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<RoleSetInput>;
  /** filter the rows which have to be updated */
  where: RoleBoolExp;
};

/** aggregate varPop on columns */
export type RoleVarPopFields = {
  __typename?: 'RoleVarPopFields';
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "role" */
export type RoleVarPopOrderBy = {
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type RoleVarSampFields = {
  __typename?: 'RoleVarSampFields';
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "role" */
export type RoleVarSampOrderBy = {
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type RoleVarianceFields = {
  __typename?: 'RoleVarianceFields';
  /** Unique role assignment identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier with role access */
  teacherId?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "role" */
export type RoleVarianceOrderBy = {
  /** Unique role assignment identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier with role access */
  teacherId?: InputMaybe<OrderBy>;
};

/** Annual teaching service records tracking required hours and modifications */
export type Service = {
  __typename?: 'Service';
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Required teaching hours for the year before modifications */
  hours: Scalars['Float']['output'];
  /** Unique service identifier */
  id: Scalars['Int']['output'];
  /** An object relationship */
  message?: Maybe<Message>;
  /** An array relationship */
  modifications: Array<ServiceModification>;
  /** An aggregate relationship */
  modificationsAggregate: ServiceModificationAggregate;
  /** An array relationship */
  priorities: Array<Priority>;
  /** An aggregate relationship */
  prioritiesAggregate: PriorityAggregate;
  /** An array relationship */
  requests: Array<Request>;
  /** An aggregate relationship */
  requestsAggregate: RequestAggregate;
  /** An object relationship */
  teacher: Teacher;
  /** Teacher identifier linking to teacher table */
  teacherId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Academic year for this service record */
  year: Scalars['Int']['output'];
  /** An object relationship */
  yearByYear: Year;
};


/** Annual teaching service records tracking required hours and modifications */
export type ServiceModificationsArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationOrderBy>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};


/** Annual teaching service records tracking required hours and modifications */
export type ServiceModificationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationOrderBy>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};


/** Annual teaching service records tracking required hours and modifications */
export type ServicePrioritiesArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


/** Annual teaching service records tracking required hours and modifications */
export type ServicePrioritiesAggregateArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


/** Annual teaching service records tracking required hours and modifications */
export type ServiceRequestsArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


/** Annual teaching service records tracking required hours and modifications */
export type ServiceRequestsAggregateArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};

/** aggregated selection of "service" */
export type ServiceAggregate = {
  __typename?: 'ServiceAggregate';
  aggregate?: Maybe<ServiceAggregateFields>;
  nodes: Array<Service>;
};

export type ServiceAggregateBoolExp = {
  count?: InputMaybe<ServiceAggregateBoolExpCount>;
};

/** aggregate fields of "service" */
export type ServiceAggregateFields = {
  __typename?: 'ServiceAggregateFields';
  avg?: Maybe<ServiceAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<ServiceMaxFields>;
  min?: Maybe<ServiceMinFields>;
  stddev?: Maybe<ServiceStddevFields>;
  stddevPop?: Maybe<ServiceStddevPopFields>;
  stddevSamp?: Maybe<ServiceStddevSampFields>;
  sum?: Maybe<ServiceSumFields>;
  varPop?: Maybe<ServiceVarPopFields>;
  varSamp?: Maybe<ServiceVarSampFields>;
  variance?: Maybe<ServiceVarianceFields>;
};


/** aggregate fields of "service" */
export type ServiceAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ServiceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "service" */
export type ServiceAggregateOrderBy = {
  avg?: InputMaybe<ServiceAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ServiceMaxOrderBy>;
  min?: InputMaybe<ServiceMinOrderBy>;
  stddev?: InputMaybe<ServiceStddevOrderBy>;
  stddevPop?: InputMaybe<ServiceStddevPopOrderBy>;
  stddevSamp?: InputMaybe<ServiceStddevSampOrderBy>;
  sum?: InputMaybe<ServiceSumOrderBy>;
  varPop?: InputMaybe<ServiceVarPopOrderBy>;
  varSamp?: InputMaybe<ServiceVarSampOrderBy>;
  variance?: InputMaybe<ServiceVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "service" */
export type ServiceArrRelInsertInput = {
  data: Array<ServiceInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<ServiceOnConflict>;
};

/** aggregate avg on columns */
export type ServiceAvgFields = {
  __typename?: 'ServiceAvgFields';
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "service" */
export type ServiceAvgOrderBy = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "service". All fields are combined with a logical 'AND'. */
export type ServiceBoolExp = {
  _and?: InputMaybe<Array<ServiceBoolExp>>;
  _not?: InputMaybe<ServiceBoolExp>;
  _or?: InputMaybe<Array<ServiceBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  hours?: InputMaybe<FloatComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  message?: InputMaybe<MessageBoolExp>;
  modifications?: InputMaybe<ServiceModificationBoolExp>;
  modificationsAggregate?: InputMaybe<ServiceModificationAggregateBoolExp>;
  priorities?: InputMaybe<PriorityBoolExp>;
  prioritiesAggregate?: InputMaybe<PriorityAggregateBoolExp>;
  requests?: InputMaybe<RequestBoolExp>;
  requestsAggregate?: InputMaybe<RequestAggregateBoolExp>;
  teacher?: InputMaybe<TeacherBoolExp>;
  teacherId?: InputMaybe<IntComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  year?: InputMaybe<IntComparisonExp>;
  yearByYear?: InputMaybe<YearBoolExp>;
};

/** unique or primary key constraints on table "service" */
export enum ServiceConstraint {
  /** unique or primary key constraint on columns "id", "year" */
  ServiceIdYearKey = 'service_id_year_key',
  /** unique or primary key constraint on columns "id" */
  ServicePkey = 'service_pkey',
  /** unique or primary key constraint on columns "teacher_id", "year" */
  ServiceYearTeacherIdKey = 'service_year_teacher_id_key'
}

/** input type for incrementing numeric columns in table "service" */
export type ServiceIncInput = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Academic year for this service record */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "service" */
export type ServiceInsertInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<Scalars['Float']['input']>;
  message?: InputMaybe<MessageObjRelInsertInput>;
  modifications?: InputMaybe<ServiceModificationArrRelInsertInput>;
  priorities?: InputMaybe<PriorityArrRelInsertInput>;
  requests?: InputMaybe<RequestArrRelInsertInput>;
  teacher?: InputMaybe<TeacherObjRelInsertInput>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Academic year for this service record */
  year?: InputMaybe<Scalars['Int']['input']>;
  yearByYear?: InputMaybe<YearObjRelInsertInput>;
};

/** aggregate max on columns */
export type ServiceMaxFields = {
  __typename?: 'ServiceMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "service" */
export type ServiceMaxOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type ServiceMinFields = {
  __typename?: 'ServiceMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "service" */
export type ServiceMinOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** Individual modifications to base teaching service hours */
export type ServiceModification = {
  __typename?: 'ServiceModification';
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Hour adjustment amount (negative values increase required hours) */
  hours: Scalars['Float']['output'];
  /** Unique modification identifier */
  id: Scalars['Int']['output'];
  /** An object relationship */
  service: Service;
  /** Reference to affected service record */
  serviceId: Scalars['Int']['output'];
  /** An object relationship */
  type: ServiceModificationType;
  /** Reference to service modification type */
  typeId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "service_modification" */
export type ServiceModificationAggregate = {
  __typename?: 'ServiceModificationAggregate';
  aggregate?: Maybe<ServiceModificationAggregateFields>;
  nodes: Array<ServiceModification>;
};

export type ServiceModificationAggregateBoolExp = {
  count?: InputMaybe<ServiceModificationAggregateBoolExpCount>;
};

/** aggregate fields of "service_modification" */
export type ServiceModificationAggregateFields = {
  __typename?: 'ServiceModificationAggregateFields';
  avg?: Maybe<ServiceModificationAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<ServiceModificationMaxFields>;
  min?: Maybe<ServiceModificationMinFields>;
  stddev?: Maybe<ServiceModificationStddevFields>;
  stddevPop?: Maybe<ServiceModificationStddevPopFields>;
  stddevSamp?: Maybe<ServiceModificationStddevSampFields>;
  sum?: Maybe<ServiceModificationSumFields>;
  varPop?: Maybe<ServiceModificationVarPopFields>;
  varSamp?: Maybe<ServiceModificationVarSampFields>;
  variance?: Maybe<ServiceModificationVarianceFields>;
};


/** aggregate fields of "service_modification" */
export type ServiceModificationAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "service_modification" */
export type ServiceModificationAggregateOrderBy = {
  avg?: InputMaybe<ServiceModificationAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ServiceModificationMaxOrderBy>;
  min?: InputMaybe<ServiceModificationMinOrderBy>;
  stddev?: InputMaybe<ServiceModificationStddevOrderBy>;
  stddevPop?: InputMaybe<ServiceModificationStddevPopOrderBy>;
  stddevSamp?: InputMaybe<ServiceModificationStddevSampOrderBy>;
  sum?: InputMaybe<ServiceModificationSumOrderBy>;
  varPop?: InputMaybe<ServiceModificationVarPopOrderBy>;
  varSamp?: InputMaybe<ServiceModificationVarSampOrderBy>;
  variance?: InputMaybe<ServiceModificationVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "service_modification" */
export type ServiceModificationArrRelInsertInput = {
  data: Array<ServiceModificationInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<ServiceModificationOnConflict>;
};

/** aggregate avg on columns */
export type ServiceModificationAvgFields = {
  __typename?: 'ServiceModificationAvgFields';
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "service_modification" */
export type ServiceModificationAvgOrderBy = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "service_modification". All fields are combined with a logical 'AND'. */
export type ServiceModificationBoolExp = {
  _and?: InputMaybe<Array<ServiceModificationBoolExp>>;
  _not?: InputMaybe<ServiceModificationBoolExp>;
  _or?: InputMaybe<Array<ServiceModificationBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  hours?: InputMaybe<FloatComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  service?: InputMaybe<ServiceBoolExp>;
  serviceId?: InputMaybe<IntComparisonExp>;
  type?: InputMaybe<ServiceModificationTypeBoolExp>;
  typeId?: InputMaybe<IntComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "service_modification" */
export enum ServiceModificationConstraint {
  /** unique or primary key constraint on columns "id" */
  ServiceModificationPkey = 'service_modification_pkey'
}

/** input type for incrementing numeric columns in table "service_modification" */
export type ServiceModificationIncInput = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to service modification type */
  typeId?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "service_modification" */
export type ServiceModificationInsertInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<Scalars['Float']['input']>;
  service?: InputMaybe<ServiceObjRelInsertInput>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ServiceModificationTypeObjRelInsertInput>;
  /** Reference to service modification type */
  typeId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type ServiceModificationMaxFields = {
  __typename?: 'ServiceModificationMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "service_modification" */
export type ServiceModificationMaxOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type ServiceModificationMinFields = {
  __typename?: 'ServiceModificationMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "service_modification" */
export type ServiceModificationMinOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "service_modification" */
export type ServiceModificationMutationResponse = {
  __typename?: 'ServiceModificationMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ServiceModification>;
};

/** on_conflict condition type for table "service_modification" */
export type ServiceModificationOnConflict = {
  constraint: ServiceModificationConstraint;
  updateColumns?: Array<ServiceModificationUpdateColumn>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};

/** Ordering options when selecting data from "service_modification". */
export type ServiceModificationOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  hours?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  service?: InputMaybe<ServiceOrderBy>;
  serviceId?: InputMaybe<OrderBy>;
  type?: InputMaybe<ServiceModificationTypeOrderBy>;
  typeId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: service_modification */
export type ServiceModificationPkColumnsInput = {
  /** Unique modification identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "service_modification" */
export enum ServiceModificationSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Hours = 'hours',
  /** column name */
  Id = 'id',
  /** column name */
  ServiceId = 'serviceId',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "service_modification" */
export type ServiceModificationSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to service modification type */
  typeId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type ServiceModificationStddevFields = {
  __typename?: 'ServiceModificationStddevFields';
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "service_modification" */
export type ServiceModificationStddevOrderBy = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type ServiceModificationStddevPopFields = {
  __typename?: 'ServiceModificationStddevPopFields';
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "service_modification" */
export type ServiceModificationStddevPopOrderBy = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type ServiceModificationStddevSampFields = {
  __typename?: 'ServiceModificationStddevSampFields';
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "service_modification" */
export type ServiceModificationStddevSampOrderBy = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "service_modification" */
export type ServiceModificationStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ServiceModificationStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ServiceModificationStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Unique modification identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to service modification type */
  typeId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type ServiceModificationSumFields = {
  __typename?: 'ServiceModificationSumFields';
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Int']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "service_modification" */
export type ServiceModificationSumOrderBy = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
};

/** Categories of service hour modifications */
export type ServiceModificationType = {
  __typename?: 'ServiceModificationType';
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Detailed explanation of the modification type and its application */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique modification type identifier */
  id: Scalars['Int']['output'];
  /** Human-readable type name for display purposes, unique */
  label: Scalars['String']['output'];
  /** An aggregate relationship */
  serviceModificationsAggregate: ServiceModificationAggregate;
  /** An array relationship */
  service_modifications: Array<ServiceModification>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
};


/** Categories of service hour modifications */
export type ServiceModificationTypeServiceModificationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationOrderBy>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};


/** Categories of service hour modifications */
export type ServiceModificationTypeService_ModificationsArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationOrderBy>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};

/** aggregated selection of "service_modification_type" */
export type ServiceModificationTypeAggregate = {
  __typename?: 'ServiceModificationTypeAggregate';
  aggregate?: Maybe<ServiceModificationTypeAggregateFields>;
  nodes: Array<ServiceModificationType>;
};

/** aggregate fields of "service_modification_type" */
export type ServiceModificationTypeAggregateFields = {
  __typename?: 'ServiceModificationTypeAggregateFields';
  avg?: Maybe<ServiceModificationTypeAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<ServiceModificationTypeMaxFields>;
  min?: Maybe<ServiceModificationTypeMinFields>;
  stddev?: Maybe<ServiceModificationTypeStddevFields>;
  stddevPop?: Maybe<ServiceModificationTypeStddevPopFields>;
  stddevSamp?: Maybe<ServiceModificationTypeStddevSampFields>;
  sum?: Maybe<ServiceModificationTypeSumFields>;
  varPop?: Maybe<ServiceModificationTypeVarPopFields>;
  varSamp?: Maybe<ServiceModificationTypeVarSampFields>;
  variance?: Maybe<ServiceModificationTypeVarianceFields>;
};


/** aggregate fields of "service_modification_type" */
export type ServiceModificationTypeAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ServiceModificationTypeSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type ServiceModificationTypeAvgFields = {
  __typename?: 'ServiceModificationTypeAvgFields';
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "service_modification_type". All fields are combined with a logical 'AND'. */
export type ServiceModificationTypeBoolExp = {
  _and?: InputMaybe<Array<ServiceModificationTypeBoolExp>>;
  _not?: InputMaybe<ServiceModificationTypeBoolExp>;
  _or?: InputMaybe<Array<ServiceModificationTypeBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  label?: InputMaybe<StringComparisonExp>;
  service_modifications?: InputMaybe<ServiceModificationBoolExp>;
  service_modificationsAggregate?: InputMaybe<ServiceModificationAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "service_modification_type" */
export enum ServiceModificationTypeConstraint {
  /** unique or primary key constraint on columns "label" */
  ServiceModificationTypeLabelKey = 'service_modification_type_label_key',
  /** unique or primary key constraint on columns "id" */
  ServiceModificationTypePkey = 'service_modification_type_pkey'
}

/** input type for inserting data into table "service_modification_type" */
export type ServiceModificationTypeInsertInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Detailed explanation of the modification type and its application */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  service_modifications?: InputMaybe<ServiceModificationArrRelInsertInput>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type ServiceModificationTypeMaxFields = {
  __typename?: 'ServiceModificationTypeMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Detailed explanation of the modification type and its application */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Human-readable type name for display purposes, unique */
  label?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type ServiceModificationTypeMinFields = {
  __typename?: 'ServiceModificationTypeMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Detailed explanation of the modification type and its application */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Human-readable type name for display purposes, unique */
  label?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "service_modification_type" */
export type ServiceModificationTypeMutationResponse = {
  __typename?: 'ServiceModificationTypeMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ServiceModificationType>;
};

/** input type for inserting object relation for remote table "service_modification_type" */
export type ServiceModificationTypeObjRelInsertInput = {
  data: ServiceModificationTypeInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<ServiceModificationTypeOnConflict>;
};

/** on_conflict condition type for table "service_modification_type" */
export type ServiceModificationTypeOnConflict = {
  constraint: ServiceModificationTypeConstraint;
  updateColumns?: Array<ServiceModificationTypeUpdateColumn>;
  where?: InputMaybe<ServiceModificationTypeBoolExp>;
};

/** Ordering options when selecting data from "service_modification_type". */
export type ServiceModificationTypeOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  label?: InputMaybe<OrderBy>;
  service_modificationsAggregate?: InputMaybe<ServiceModificationAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: service_modification_type */
export type ServiceModificationTypePkColumnsInput = {
  /** Unique modification type identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "service_modification_type" */
export enum ServiceModificationTypeSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "service_modification_type" */
export type ServiceModificationTypeSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Detailed explanation of the modification type and its application */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Human-readable type name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type ServiceModificationTypeStddevFields = {
  __typename?: 'ServiceModificationTypeStddevFields';
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevPop on columns */
export type ServiceModificationTypeStddevPopFields = {
  __typename?: 'ServiceModificationTypeStddevPopFields';
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevSamp on columns */
export type ServiceModificationTypeStddevSampFields = {
  __typename?: 'ServiceModificationTypeStddevSampFields';
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "service_modification_type" */
export type ServiceModificationTypeStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ServiceModificationTypeStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ServiceModificationTypeStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Detailed explanation of the modification type and its application */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Unique modification type identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Human-readable type name for display purposes, unique */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type ServiceModificationTypeSumFields = {
  __typename?: 'ServiceModificationTypeSumFields';
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "service_modification_type" */
export enum ServiceModificationTypeUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Label = 'label',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type ServiceModificationTypeUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ServiceModificationTypeSetInput>;
  /** filter the rows which have to be updated */
  where: ServiceModificationTypeBoolExp;
};

/** aggregate varPop on columns */
export type ServiceModificationTypeVarPopFields = {
  __typename?: 'ServiceModificationTypeVarPopFields';
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate varSamp on columns */
export type ServiceModificationTypeVarSampFields = {
  __typename?: 'ServiceModificationTypeVarSampFields';
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type ServiceModificationTypeVarianceFields = {
  __typename?: 'ServiceModificationTypeVarianceFields';
  /** Unique modification type identifier */
  id?: Maybe<Scalars['Float']['output']>;
};

/** update columns of table "service_modification" */
export enum ServiceModificationUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Hours = 'hours',
  /** column name */
  ServiceId = 'serviceId',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type ServiceModificationUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<ServiceModificationIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ServiceModificationSetInput>;
  /** filter the rows which have to be updated */
  where: ServiceModificationBoolExp;
};

/** aggregate varPop on columns */
export type ServiceModificationVarPopFields = {
  __typename?: 'ServiceModificationVarPopFields';
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "service_modification" */
export type ServiceModificationVarPopOrderBy = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type ServiceModificationVarSampFields = {
  __typename?: 'ServiceModificationVarSampFields';
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "service_modification" */
export type ServiceModificationVarSampOrderBy = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type ServiceModificationVarianceFields = {
  __typename?: 'ServiceModificationVarianceFields';
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique modification identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to affected service record */
  serviceId?: Maybe<Scalars['Float']['output']>;
  /** Reference to service modification type */
  typeId?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "service_modification" */
export type ServiceModificationVarianceOrderBy = {
  /** Hour adjustment amount (negative values increase required hours) */
  hours?: InputMaybe<OrderBy>;
  /** Unique modification identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to affected service record */
  serviceId?: InputMaybe<OrderBy>;
  /** Reference to service modification type */
  typeId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "service" */
export type ServiceMutationResponse = {
  __typename?: 'ServiceMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Service>;
};

/** input type for inserting object relation for remote table "service" */
export type ServiceObjRelInsertInput = {
  data: ServiceInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<ServiceOnConflict>;
};

/** on_conflict condition type for table "service" */
export type ServiceOnConflict = {
  constraint: ServiceConstraint;
  updateColumns?: Array<ServiceUpdateColumn>;
  where?: InputMaybe<ServiceBoolExp>;
};

/** Ordering options when selecting data from "service". */
export type ServiceOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  hours?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  message?: InputMaybe<MessageOrderBy>;
  modificationsAggregate?: InputMaybe<ServiceModificationAggregateOrderBy>;
  prioritiesAggregate?: InputMaybe<PriorityAggregateOrderBy>;
  requestsAggregate?: InputMaybe<RequestAggregateOrderBy>;
  teacher?: InputMaybe<TeacherOrderBy>;
  teacherId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
  yearByYear?: InputMaybe<YearOrderBy>;
};

/** primary key columns input for table: service */
export type ServicePkColumnsInput = {
  /** Unique service identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "service" */
export enum ServiceSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Hours = 'hours',
  /** column name */
  Id = 'id',
  /** column name */
  TeacherId = 'teacherId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Year = 'year'
}

/** input type for updating data in table "service" */
export type ServiceSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Academic year for this service record */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type ServiceStddevFields = {
  __typename?: 'ServiceStddevFields';
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "service" */
export type ServiceStddevOrderBy = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type ServiceStddevPopFields = {
  __typename?: 'ServiceStddevPopFields';
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "service" */
export type ServiceStddevPopOrderBy = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type ServiceStddevSampFields = {
  __typename?: 'ServiceStddevSampFields';
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "service" */
export type ServiceStddevSampOrderBy = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "service" */
export type ServiceStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ServiceStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ServiceStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<Scalars['Float']['input']>;
  /** Unique service identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Academic year for this service record */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type ServiceSumFields = {
  __typename?: 'ServiceSumFields';
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Int']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "service" */
export type ServiceSumOrderBy = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** update columns of table "service" */
export enum ServiceUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Hours = 'hours',
  /** column name */
  TeacherId = 'teacherId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Year = 'year'
}

export type ServiceUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<ServiceIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ServiceSetInput>;
  /** filter the rows which have to be updated */
  where: ServiceBoolExp;
};

/** aggregate varPop on columns */
export type ServiceVarPopFields = {
  __typename?: 'ServiceVarPopFields';
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "service" */
export type ServiceVarPopOrderBy = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type ServiceVarSampFields = {
  __typename?: 'ServiceVarSampFields';
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "service" */
export type ServiceVarSampOrderBy = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type ServiceVarianceFields = {
  __typename?: 'ServiceVarianceFields';
  /** Required teaching hours for the year before modifications */
  hours?: Maybe<Scalars['Float']['output']>;
  /** Unique service identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Teacher identifier linking to teacher table */
  teacherId?: Maybe<Scalars['Float']['output']>;
  /** Academic year for this service record */
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "service" */
export type ServiceVarianceOrderBy = {
  /** Required teaching hours for the year before modifications */
  hours?: InputMaybe<OrderBy>;
  /** Unique service identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher identifier linking to teacher table */
  teacherId?: InputMaybe<OrderBy>;
  /** Academic year for this service record */
  year?: InputMaybe<OrderBy>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Core teacher information and status */
export type Teacher = {
  __typename?: 'Teacher';
  /** Controls system access and automatic service creation for upcoming years */
  active: Scalars['Boolean']['output'];
  /** Optional display name, used instead of first/last name when set */
  alias?: Maybe<Scalars['String']['output']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** An array relationship */
  coordinations: Array<Coordination>;
  /** An aggregate relationship */
  coordinationsAggregate: CoordinationAggregate;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: Maybe<Scalars['String']['output']>;
  /** Teacher's email address (unique) */
  email: Scalars['String']['output'];
  /** Teacher's first name */
  firstname: Scalars['String']['output'];
  /** Unique teacher identifier */
  id: Scalars['Int']['output'];
  /** Teacher's last name */
  lastname: Scalars['String']['output'];
  /** An object relationship */
  position?: Maybe<Position>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  roles: Array<Role>;
  /** An aggregate relationship */
  rolesAggregate: RoleAggregate;
  /** An array relationship */
  services: Array<Service>;
  /** An aggregate relationship */
  servicesAggregate: ServiceAggregate;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Controls teacher visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Core teacher information and status */
export type TeacherCoordinationsArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


/** Core teacher information and status */
export type TeacherCoordinationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


/** Core teacher information and status */
export type TeacherRolesArgs = {
  distinctOn?: InputMaybe<Array<RoleSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  where?: InputMaybe<RoleBoolExp>;
};


/** Core teacher information and status */
export type TeacherRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<RoleSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  where?: InputMaybe<RoleBoolExp>;
};


/** Core teacher information and status */
export type TeacherServicesArgs = {
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};


/** Core teacher information and status */
export type TeacherServicesAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};

/** aggregated selection of "teacher" */
export type TeacherAggregate = {
  __typename?: 'TeacherAggregate';
  aggregate?: Maybe<TeacherAggregateFields>;
  nodes: Array<Teacher>;
};

export type TeacherAggregateBoolExp = {
  bool_and?: InputMaybe<TeacherAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<TeacherAggregateBoolExpBool_Or>;
  count?: InputMaybe<TeacherAggregateBoolExpCount>;
};

/** aggregate fields of "teacher" */
export type TeacherAggregateFields = {
  __typename?: 'TeacherAggregateFields';
  avg?: Maybe<TeacherAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<TeacherMaxFields>;
  min?: Maybe<TeacherMinFields>;
  stddev?: Maybe<TeacherStddevFields>;
  stddevPop?: Maybe<TeacherStddevPopFields>;
  stddevSamp?: Maybe<TeacherStddevSampFields>;
  sum?: Maybe<TeacherSumFields>;
  varPop?: Maybe<TeacherVarPopFields>;
  varSamp?: Maybe<TeacherVarSampFields>;
  variance?: Maybe<TeacherVarianceFields>;
};


/** aggregate fields of "teacher" */
export type TeacherAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<TeacherSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "teacher" */
export type TeacherAggregateOrderBy = {
  avg?: InputMaybe<TeacherAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TeacherMaxOrderBy>;
  min?: InputMaybe<TeacherMinOrderBy>;
  stddev?: InputMaybe<TeacherStddevOrderBy>;
  stddevPop?: InputMaybe<TeacherStddevPopOrderBy>;
  stddevSamp?: InputMaybe<TeacherStddevSampOrderBy>;
  sum?: InputMaybe<TeacherSumOrderBy>;
  varPop?: InputMaybe<TeacherVarPopOrderBy>;
  varSamp?: InputMaybe<TeacherVarSampOrderBy>;
  variance?: InputMaybe<TeacherVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "teacher" */
export type TeacherArrRelInsertInput = {
  data: Array<TeacherInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<TeacherOnConflict>;
};

/** aggregate avg on columns */
export type TeacherAvgFields = {
  __typename?: 'TeacherAvgFields';
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "teacher" */
export type TeacherAvgOrderBy = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "teacher". All fields are combined with a logical 'AND'. */
export type TeacherBoolExp = {
  _and?: InputMaybe<Array<TeacherBoolExp>>;
  _not?: InputMaybe<TeacherBoolExp>;
  _or?: InputMaybe<Array<TeacherBoolExp>>;
  active?: InputMaybe<BooleanComparisonExp>;
  alias?: InputMaybe<StringComparisonExp>;
  baseServiceHours?: InputMaybe<FloatComparisonExp>;
  coordinations?: InputMaybe<CoordinationBoolExp>;
  coordinationsAggregate?: InputMaybe<CoordinationAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  displayname?: InputMaybe<StringComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  firstname?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  lastname?: InputMaybe<StringComparisonExp>;
  position?: InputMaybe<PositionBoolExp>;
  positionId?: InputMaybe<IntComparisonExp>;
  roles?: InputMaybe<RoleBoolExp>;
  rolesAggregate?: InputMaybe<RoleAggregateBoolExp>;
  services?: InputMaybe<ServiceBoolExp>;
  servicesAggregate?: InputMaybe<ServiceAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  visible?: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "teacher" */
export enum TeacherConstraint {
  /** unique or primary key constraint on columns "email" */
  TeacherEmailKey = 'teacher_email_key',
  /** unique or primary key constraint on columns "id" */
  TeacherPkey = 'teacher_pkey'
}

/** input type for incrementing numeric columns in table "teacher" */
export type TeacherIncInput = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "teacher" */
export type TeacherInsertInput = {
  /** Controls system access and automatic service creation for upcoming years */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional display name, used instead of first/last name when set */
  alias?: InputMaybe<Scalars['String']['input']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  coordinations?: InputMaybe<CoordinationArrRelInsertInput>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Teacher's email address (unique) */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's first name */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's last name */
  lastname?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionObjRelInsertInput>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<RoleArrRelInsertInput>;
  services?: InputMaybe<ServiceArrRelInsertInput>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls teacher visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type TeacherMaxFields = {
  __typename?: 'TeacherMaxFields';
  /** Optional display name, used instead of first/last name when set */
  alias?: Maybe<Scalars['String']['output']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: Maybe<Scalars['String']['output']>;
  /** Teacher's email address (unique) */
  email?: Maybe<Scalars['String']['output']>;
  /** Teacher's first name */
  firstname?: Maybe<Scalars['String']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Teacher's last name */
  lastname?: Maybe<Scalars['String']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "teacher" */
export type TeacherMaxOrderBy = {
  /** Optional display name, used instead of first/last name when set */
  alias?: InputMaybe<OrderBy>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: InputMaybe<OrderBy>;
  /** Teacher's email address (unique) */
  email?: InputMaybe<OrderBy>;
  /** Teacher's first name */
  firstname?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher's last name */
  lastname?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type TeacherMinFields = {
  __typename?: 'TeacherMinFields';
  /** Optional display name, used instead of first/last name when set */
  alias?: Maybe<Scalars['String']['output']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: Maybe<Scalars['String']['output']>;
  /** Teacher's email address (unique) */
  email?: Maybe<Scalars['String']['output']>;
  /** Teacher's first name */
  firstname?: Maybe<Scalars['String']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Teacher's last name */
  lastname?: Maybe<Scalars['String']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "teacher" */
export type TeacherMinOrderBy = {
  /** Optional display name, used instead of first/last name when set */
  alias?: InputMaybe<OrderBy>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: InputMaybe<OrderBy>;
  /** Teacher's email address (unique) */
  email?: InputMaybe<OrderBy>;
  /** Teacher's first name */
  firstname?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Teacher's last name */
  lastname?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "teacher" */
export type TeacherMutationResponse = {
  __typename?: 'TeacherMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Teacher>;
};

/** input type for inserting object relation for remote table "teacher" */
export type TeacherObjRelInsertInput = {
  data: TeacherInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<TeacherOnConflict>;
};

/** on_conflict condition type for table "teacher" */
export type TeacherOnConflict = {
  constraint: TeacherConstraint;
  updateColumns?: Array<TeacherUpdateColumn>;
  where?: InputMaybe<TeacherBoolExp>;
};

/** Ordering options when selecting data from "teacher". */
export type TeacherOrderBy = {
  active?: InputMaybe<OrderBy>;
  alias?: InputMaybe<OrderBy>;
  baseServiceHours?: InputMaybe<OrderBy>;
  coordinationsAggregate?: InputMaybe<CoordinationAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  displayname?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  firstname?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  lastname?: InputMaybe<OrderBy>;
  position?: InputMaybe<PositionOrderBy>;
  positionId?: InputMaybe<OrderBy>;
  rolesAggregate?: InputMaybe<RoleAggregateOrderBy>;
  servicesAggregate?: InputMaybe<ServiceAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  visible?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: teacher */
export type TeacherPkColumnsInput = {
  /** Unique teacher identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "teacher" */
export enum TeacherSelectColumn {
  /** column name */
  Active = 'active',
  /** column name */
  Alias = 'alias',
  /** column name */
  BaseServiceHours = 'baseServiceHours',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Displayname = 'displayname',
  /** column name */
  Email = 'email',
  /** column name */
  Firstname = 'firstname',
  /** column name */
  Id = 'id',
  /** column name */
  Lastname = 'lastname',
  /** column name */
  PositionId = 'positionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible'
}

/** select "teacherAggregateBoolExpBool_andArgumentsColumns" columns of table "teacher" */
export enum TeacherSelectColumnTeacherAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  Active = 'active',
  /** column name */
  Visible = 'visible'
}

/** select "teacherAggregateBoolExpBool_orArgumentsColumns" columns of table "teacher" */
export enum TeacherSelectColumnTeacherAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  Active = 'active',
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "teacher" */
export type TeacherSetInput = {
  /** Controls system access and automatic service creation for upcoming years */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional display name, used instead of first/last name when set */
  alias?: InputMaybe<Scalars['String']['input']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Teacher's email address (unique) */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's first name */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's last name */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls teacher visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type TeacherStddevFields = {
  __typename?: 'TeacherStddevFields';
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "teacher" */
export type TeacherStddevOrderBy = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type TeacherStddevPopFields = {
  __typename?: 'TeacherStddevPopFields';
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "teacher" */
export type TeacherStddevPopOrderBy = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type TeacherStddevSampFields = {
  __typename?: 'TeacherStddevSampFields';
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "teacher" */
export type TeacherStddevSampOrderBy = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "teacher" */
export type TeacherStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: TeacherStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TeacherStreamCursorValueInput = {
  /** Controls system access and automatic service creation for upcoming years */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional display name, used instead of first/last name when set */
  alias?: InputMaybe<Scalars['String']['input']>;
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<Scalars['Float']['input']>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Preferred display name, using alias when available, otherwise full name */
  displayname?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's email address (unique) */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Teacher's first name */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Unique teacher identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Teacher's last name */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls teacher visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type TeacherSumFields = {
  __typename?: 'TeacherSumFields';
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "teacher" */
export type TeacherSumOrderBy = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
};

/** update columns of table "teacher" */
export enum TeacherUpdateColumn {
  /** column name */
  Active = 'active',
  /** column name */
  Alias = 'alias',
  /** column name */
  BaseServiceHours = 'baseServiceHours',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Firstname = 'firstname',
  /** column name */
  Lastname = 'lastname',
  /** column name */
  PositionId = 'positionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible'
}

export type TeacherUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<TeacherIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TeacherSetInput>;
  /** filter the rows which have to be updated */
  where: TeacherBoolExp;
};

/** aggregate varPop on columns */
export type TeacherVarPopFields = {
  __typename?: 'TeacherVarPopFields';
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "teacher" */
export type TeacherVarPopOrderBy = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type TeacherVarSampFields = {
  __typename?: 'TeacherVarSampFields';
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "teacher" */
export type TeacherVarSampOrderBy = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type TeacherVarianceFields = {
  __typename?: 'TeacherVarianceFields';
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: Maybe<Scalars['Float']['output']>;
  /** Unique teacher identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "teacher" */
export type TeacherVarianceOrderBy = {
  /** Individual override for annual teaching hours, takes precedence over position's base hours */
  baseServiceHours?: InputMaybe<OrderBy>;
  /** Unique teacher identifier */
  id?: InputMaybe<OrderBy>;
  /** Reference to teacher's position, determines default service hours */
  positionId?: InputMaybe<OrderBy>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** Specialization tracks within academic programs */
export type Track = {
  __typename?: 'Track';
  /** An array relationship */
  coordinations: Array<Coordination>;
  /** An aggregate relationship */
  coordinationsAggregate: CoordinationAggregate;
  /** An array relationship */
  courses: Array<Course>;
  /** An aggregate relationship */
  coursesAggregate: CourseAggregate;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Unique track identifier */
  id: Scalars['Int']['output'];
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name: Scalars['String']['output'];
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated track name */
  nameShort?: Maybe<Scalars['String']['output']>;
  nomImport?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  program: Program;
  /** Parent program for this track */
  programId: Scalars['Int']['output'];
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Controls track visibility in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Specialization tracks within academic programs */
export type TrackCoordinationsArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


/** Specialization tracks within academic programs */
export type TrackCoordinationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


/** Specialization tracks within academic programs */
export type TrackCoursesArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


/** Specialization tracks within academic programs */
export type TrackCoursesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};

/** aggregated selection of "track" */
export type TrackAggregate = {
  __typename?: 'TrackAggregate';
  aggregate?: Maybe<TrackAggregateFields>;
  nodes: Array<Track>;
};

export type TrackAggregateBoolExp = {
  bool_and?: InputMaybe<TrackAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<TrackAggregateBoolExpBool_Or>;
  count?: InputMaybe<TrackAggregateBoolExpCount>;
};

/** aggregate fields of "track" */
export type TrackAggregateFields = {
  __typename?: 'TrackAggregateFields';
  avg?: Maybe<TrackAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<TrackMaxFields>;
  min?: Maybe<TrackMinFields>;
  stddev?: Maybe<TrackStddevFields>;
  stddevPop?: Maybe<TrackStddevPopFields>;
  stddevSamp?: Maybe<TrackStddevSampFields>;
  sum?: Maybe<TrackSumFields>;
  varPop?: Maybe<TrackVarPopFields>;
  varSamp?: Maybe<TrackVarSampFields>;
  variance?: Maybe<TrackVarianceFields>;
};


/** aggregate fields of "track" */
export type TrackAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<TrackSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "track" */
export type TrackAggregateOrderBy = {
  avg?: InputMaybe<TrackAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TrackMaxOrderBy>;
  min?: InputMaybe<TrackMinOrderBy>;
  stddev?: InputMaybe<TrackStddevOrderBy>;
  stddevPop?: InputMaybe<TrackStddevPopOrderBy>;
  stddevSamp?: InputMaybe<TrackStddevSampOrderBy>;
  sum?: InputMaybe<TrackSumOrderBy>;
  varPop?: InputMaybe<TrackVarPopOrderBy>;
  varSamp?: InputMaybe<TrackVarSampOrderBy>;
  variance?: InputMaybe<TrackVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "track" */
export type TrackArrRelInsertInput = {
  data: Array<TrackInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<TrackOnConflict>;
};

/** aggregate avg on columns */
export type TrackAvgFields = {
  __typename?: 'TrackAvgFields';
  /** Unique track identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "track" */
export type TrackAvgOrderBy = {
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "track". All fields are combined with a logical 'AND'. */
export type TrackBoolExp = {
  _and?: InputMaybe<Array<TrackBoolExp>>;
  _not?: InputMaybe<TrackBoolExp>;
  _or?: InputMaybe<Array<TrackBoolExp>>;
  coordinations?: InputMaybe<CoordinationBoolExp>;
  coordinationsAggregate?: InputMaybe<CoordinationAggregateBoolExp>;
  courses?: InputMaybe<CourseBoolExp>;
  coursesAggregate?: InputMaybe<CourseAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  nameDisplay?: InputMaybe<StringComparisonExp>;
  nameShort?: InputMaybe<StringComparisonExp>;
  nomImport?: InputMaybe<StringComparisonExp>;
  program?: InputMaybe<ProgramBoolExp>;
  programId?: InputMaybe<IntComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  visible?: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "track" */
export enum TrackConstraint {
  /** unique or primary key constraint on columns "id", "program_id" */
  TrackIdProgramIdKey = 'track_id_program_id_key',
  /** unique or primary key constraint on columns "id" */
  TrackPkey = 'track_pkey',
  /** unique or primary key constraint on columns "program_id", "name" */
  TrackProgramIdNameKey = 'track_program_id_name_key'
}

/** input type for incrementing numeric columns in table "track" */
export type TrackIncInput = {
  /** Parent program for this track */
  programId?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "track" */
export type TrackInsertInput = {
  coordinations?: InputMaybe<CoordinationArrRelInsertInput>;
  courses?: InputMaybe<CourseArrRelInsertInput>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated track name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
  program?: InputMaybe<ProgramObjRelInsertInput>;
  /** Parent program for this track */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls track visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type TrackMaxFields = {
  __typename?: 'TrackMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique track identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name?: Maybe<Scalars['String']['output']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated track name */
  nameShort?: Maybe<Scalars['String']['output']>;
  nomImport?: Maybe<Scalars['String']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "track" */
export type TrackMaxOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name?: InputMaybe<OrderBy>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<OrderBy>;
  /** Abbreviated track name */
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type TrackMinFields = {
  __typename?: 'TrackMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Unique track identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name?: Maybe<Scalars['String']['output']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: Maybe<Scalars['String']['output']>;
  /** Abbreviated track name */
  nameShort?: Maybe<Scalars['String']['output']>;
  nomImport?: Maybe<Scalars['String']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "track" */
export type TrackMinOrderBy = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<OrderBy>;
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name?: InputMaybe<OrderBy>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<OrderBy>;
  /** Abbreviated track name */
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "track" */
export type TrackMutationResponse = {
  __typename?: 'TrackMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Track>;
};

/** input type for inserting object relation for remote table "track" */
export type TrackObjRelInsertInput = {
  data: TrackInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<TrackOnConflict>;
};

/** on_conflict condition type for table "track" */
export type TrackOnConflict = {
  constraint: TrackConstraint;
  updateColumns?: Array<TrackUpdateColumn>;
  where?: InputMaybe<TrackBoolExp>;
};

/** Ordering options when selecting data from "track". */
export type TrackOrderBy = {
  coordinationsAggregate?: InputMaybe<CoordinationAggregateOrderBy>;
  coursesAggregate?: InputMaybe<CourseAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  nameDisplay?: InputMaybe<OrderBy>;
  nameShort?: InputMaybe<OrderBy>;
  nomImport?: InputMaybe<OrderBy>;
  program?: InputMaybe<ProgramOrderBy>;
  programId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  visible?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: track */
export type TrackPkColumnsInput = {
  /** Unique track identifier */
  id: Scalars['Int']['input'];
};

/** select columns of table "track" */
export enum TrackSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  NameDisplay = 'nameDisplay',
  /** column name */
  NameShort = 'nameShort',
  /** column name */
  NomImport = 'nomImport',
  /** column name */
  ProgramId = 'programId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible'
}

/** select "trackAggregateBoolExpBool_andArgumentsColumns" columns of table "track" */
export enum TrackSelectColumnTrackAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  Visible = 'visible'
}

/** select "trackAggregateBoolExpBool_orArgumentsColumns" columns of table "track" */
export enum TrackSelectColumnTrackAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "track" */
export type TrackSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated track name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
  /** Parent program for this track */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls track visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type TrackStddevFields = {
  __typename?: 'TrackStddevFields';
  /** Unique track identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "track" */
export type TrackStddevOrderBy = {
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type TrackStddevPopFields = {
  __typename?: 'TrackStddevPopFields';
  /** Unique track identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "track" */
export type TrackStddevPopOrderBy = {
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type TrackStddevSampFields = {
  __typename?: 'TrackStddevSampFields';
  /** Unique track identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "track" */
export type TrackStddevSampOrderBy = {
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "track" */
export type TrackStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: TrackStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TrackStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Unique track identifier */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Full track name, unique within its program (e.g., Pure Mathematics, Applied Mathematics, Statistics, etc.) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Preferred display name, using abbreviated name when available, otherwise full name */
  nameDisplay?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviated track name */
  nameShort?: InputMaybe<Scalars['String']['input']>;
  nomImport?: InputMaybe<Scalars['String']['input']>;
  /** Parent program for this track */
  programId?: InputMaybe<Scalars['Int']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Controls track visibility in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type TrackSumFields = {
  __typename?: 'TrackSumFields';
  /** Unique track identifier */
  id?: Maybe<Scalars['Int']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "track" */
export type TrackSumOrderBy = {
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
};

/** update columns of table "track" */
export enum TrackUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Name = 'name',
  /** column name */
  NameShort = 'nameShort',
  /** column name */
  NomImport = 'nomImport',
  /** column name */
  ProgramId = 'programId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visible = 'visible'
}

export type TrackUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<TrackIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TrackSetInput>;
  /** filter the rows which have to be updated */
  where: TrackBoolExp;
};

/** aggregate varPop on columns */
export type TrackVarPopFields = {
  __typename?: 'TrackVarPopFields';
  /** Unique track identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "track" */
export type TrackVarPopOrderBy = {
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type TrackVarSampFields = {
  __typename?: 'TrackVarSampFields';
  /** Unique track identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "track" */
export type TrackVarSampOrderBy = {
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type TrackVarianceFields = {
  __typename?: 'TrackVarianceFields';
  /** Unique track identifier */
  id?: Maybe<Scalars['Float']['output']>;
  /** Parent program for this track */
  programId?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "track" */
export type TrackVarianceOrderBy = {
  /** Unique track identifier */
  id?: InputMaybe<OrderBy>;
  /** Parent program for this track */
  programId?: InputMaybe<OrderBy>;
};

/** Academic year definitions with current year designation and visibility settings */
export type Year = {
  __typename?: 'Year';
  /** An array relationship */
  courses: Array<Course>;
  /** An aggregate relationship */
  coursesAggregate: CourseAggregate;
  /** Timestamp when the record was created */
  createdAt: Scalars['timestamptz']['output'];
  /** Current academic year flag. Constrained to have at most one current year */
  current: Scalars['Boolean']['output'];
  /** An array relationship */
  priorities: Array<Priority>;
  /** An aggregate relationship */
  prioritiesAggregate: PriorityAggregate;
  /** An array relationship */
  requests: Array<Request>;
  /** An aggregate relationship */
  requestsAggregate: RequestAggregate;
  /** An array relationship */
  services: Array<Service>;
  /** An aggregate relationship */
  servicesAggregate: ServiceAggregate;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt: Scalars['timestamptz']['output'];
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value: Scalars['Int']['output'];
  /** Controls visibility of the year in the user interface and queries */
  visible: Scalars['Boolean']['output'];
};


/** Academic year definitions with current year designation and visibility settings */
export type YearCoursesArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearCoursesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearPrioritiesArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearPrioritiesAggregateArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearRequestsArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearRequestsAggregateArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearServicesArgs = {
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};


/** Academic year definitions with current year designation and visibility settings */
export type YearServicesAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};

/** aggregated selection of "year" */
export type YearAggregate = {
  __typename?: 'YearAggregate';
  aggregate?: Maybe<YearAggregateFields>;
  nodes: Array<Year>;
};

/** aggregate fields of "year" */
export type YearAggregateFields = {
  __typename?: 'YearAggregateFields';
  avg?: Maybe<YearAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<YearMaxFields>;
  min?: Maybe<YearMinFields>;
  stddev?: Maybe<YearStddevFields>;
  stddevPop?: Maybe<YearStddevPopFields>;
  stddevSamp?: Maybe<YearStddevSampFields>;
  sum?: Maybe<YearSumFields>;
  varPop?: Maybe<YearVarPopFields>;
  varSamp?: Maybe<YearVarSampFields>;
  variance?: Maybe<YearVarianceFields>;
};


/** aggregate fields of "year" */
export type YearAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<YearSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type YearAvgFields = {
  __typename?: 'YearAvgFields';
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "year". All fields are combined with a logical 'AND'. */
export type YearBoolExp = {
  _and?: InputMaybe<Array<YearBoolExp>>;
  _not?: InputMaybe<YearBoolExp>;
  _or?: InputMaybe<Array<YearBoolExp>>;
  courses?: InputMaybe<CourseBoolExp>;
  coursesAggregate?: InputMaybe<CourseAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  current?: InputMaybe<BooleanComparisonExp>;
  priorities?: InputMaybe<PriorityBoolExp>;
  prioritiesAggregate?: InputMaybe<PriorityAggregateBoolExp>;
  requests?: InputMaybe<RequestBoolExp>;
  requestsAggregate?: InputMaybe<RequestAggregateBoolExp>;
  services?: InputMaybe<ServiceBoolExp>;
  servicesAggregate?: InputMaybe<ServiceAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  value?: InputMaybe<IntComparisonExp>;
  visible?: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "year" */
export enum YearConstraint {
  /** unique or primary key constraint on columns "current" */
  UniqueCurrentYear = 'unique_current_year',
  /** unique or primary key constraint on columns "value" */
  YearPkey = 'year_pkey'
}

/** input type for incrementing numeric columns in table "year" */
export type YearIncInput = {
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "year" */
export type YearInsertInput = {
  courses?: InputMaybe<CourseArrRelInsertInput>;
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Current academic year flag. Constrained to have at most one current year */
  current?: InputMaybe<Scalars['Boolean']['input']>;
  priorities?: InputMaybe<PriorityArrRelInsertInput>;
  requests?: InputMaybe<RequestArrRelInsertInput>;
  services?: InputMaybe<ServiceArrRelInsertInput>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: InputMaybe<Scalars['Int']['input']>;
  /** Controls visibility of the year in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type YearMaxFields = {
  __typename?: 'YearMaxFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type YearMinFields = {
  __typename?: 'YearMinFields';
  /** Timestamp when the record was created */
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "year" */
export type YearMutationResponse = {
  __typename?: 'YearMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Year>;
};

/** input type for inserting object relation for remote table "year" */
export type YearObjRelInsertInput = {
  data: YearInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<YearOnConflict>;
};

/** on_conflict condition type for table "year" */
export type YearOnConflict = {
  constraint: YearConstraint;
  updateColumns?: Array<YearUpdateColumn>;
  where?: InputMaybe<YearBoolExp>;
};

/** Ordering options when selecting data from "year". */
export type YearOrderBy = {
  coursesAggregate?: InputMaybe<CourseAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  current?: InputMaybe<OrderBy>;
  prioritiesAggregate?: InputMaybe<PriorityAggregateOrderBy>;
  requestsAggregate?: InputMaybe<RequestAggregateOrderBy>;
  servicesAggregate?: InputMaybe<ServiceAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
  visible?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: year */
export type YearPkColumnsInput = {
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value: Scalars['Int']['input'];
};

/** select columns of table "year" */
export enum YearSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Current = 'current',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value',
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "year" */
export type YearSetInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Current academic year flag. Constrained to have at most one current year */
  current?: InputMaybe<Scalars['Boolean']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: InputMaybe<Scalars['Int']['input']>;
  /** Controls visibility of the year in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type YearStddevFields = {
  __typename?: 'YearStddevFields';
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevPop on columns */
export type YearStddevPopFields = {
  __typename?: 'YearStddevPopFields';
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddevSamp on columns */
export type YearStddevSampFields = {
  __typename?: 'YearStddevSampFields';
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "year" */
export type YearStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: YearStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type YearStreamCursorValueInput = {
  /** Timestamp when the record was created */
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Current academic year flag. Constrained to have at most one current year */
  current?: InputMaybe<Scalars['Boolean']['input']>;
  /** Timestamp when the record was last updated, automatically managed by trigger */
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: InputMaybe<Scalars['Int']['input']>;
  /** Controls visibility of the year in the user interface and queries */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type YearSumFields = {
  __typename?: 'YearSumFields';
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "year" */
export enum YearUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Current = 'current',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value',
  /** column name */
  Visible = 'visible'
}

export type YearUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<YearIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<YearSetInput>;
  /** filter the rows which have to be updated */
  where: YearBoolExp;
};

/** aggregate varPop on columns */
export type YearVarPopFields = {
  __typename?: 'YearVarPopFields';
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate varSamp on columns */
export type YearVarSampFields = {
  __typename?: 'YearVarSampFields';
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type YearVarianceFields = {
  __typename?: 'YearVarianceFields';
  /** Academic year identifier (e.g., 2024 for 2024-2025 academic year) */
  value?: Maybe<Scalars['Float']['output']>;
};

export type ComputeServicePrioritiesArgs = {
  service_row?: InputMaybe<Scalars['service_scalar']['input']>;
};

export type ComputeYearPrioritiesArgs = {
  p_year?: InputMaybe<Scalars['Int']['input']>;
};

export type CoordinationAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CoordinationSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CoordinationBoolExp>;
  predicate: IntComparisonExp;
};

export type CopyYearCoursesArgs = {
  p_year?: InputMaybe<Scalars['Int']['input']>;
};

export type CourseAggregateBoolExpBool_And = {
  arguments: CourseSelectColumnCourseAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CourseBoolExp>;
  predicate: BooleanComparisonExp;
};

export type CourseAggregateBoolExpBool_Or = {
  arguments: CourseSelectColumnCourseAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CourseBoolExp>;
  predicate: BooleanComparisonExp;
};

export type CourseAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CourseSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CourseBoolExp>;
  predicate: IntComparisonExp;
};

export type CreateTeacherServiceArgs = {
  p_teacher_id?: InputMaybe<Scalars['Int']['input']>;
  p_year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateYearServicesArgs = {
  p_year?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentPhaseAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CurrentPhaseSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CurrentPhaseBoolExp>;
  predicate: IntComparisonExp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** execute VOLATILE function "compute_service_priorities" which returns "priority" */
  computeServicePriorities: Array<Priority>;
  /** execute VOLATILE function "compute_year_priorities" which returns "priority" */
  computeYearPriorities: Array<Priority>;
  /** execute VOLATILE function "copy_year_courses" which returns "course" */
  copyYearCourses: Array<Course>;
  /** execute VOLATILE function "create_teacher_service" which returns "service" */
  createTeacherService: Array<Service>;
  /** execute VOLATILE function "create_year_services" which returns "service" */
  createYearServices: Array<Service>;
  /** delete data from the table: "app_setting" */
  deleteAppSetting?: Maybe<AppSettingMutationResponse>;
  /** delete single row from the table: "app_setting" */
  deleteAppSettingByPk?: Maybe<AppSetting>;
  /** delete data from the table: "coordination" */
  deleteCoordination?: Maybe<CoordinationMutationResponse>;
  /** delete single row from the table: "coordination" */
  deleteCoordinationByPk?: Maybe<Coordination>;
  /** delete data from the table: "course" */
  deleteCourse?: Maybe<CourseMutationResponse>;
  /** delete single row from the table: "course" */
  deleteCourseByPk?: Maybe<Course>;
  /** delete data from the table: "course_type" */
  deleteCourseType?: Maybe<CourseTypeMutationResponse>;
  /** delete single row from the table: "course_type" */
  deleteCourseTypeByPk?: Maybe<CourseType>;
  /** delete data from the table: "current_phase" */
  deleteCurrentPhase?: Maybe<CurrentPhaseMutationResponse>;
  /** delete single row from the table: "current_phase" */
  deleteCurrentPhaseByPk?: Maybe<CurrentPhase>;
  /** delete data from the table: "degree" */
  deleteDegree?: Maybe<DegreeMutationResponse>;
  /** delete single row from the table: "degree" */
  deleteDegreeByPk?: Maybe<Degree>;
  /** delete data from the table: "message" */
  deleteMessage?: Maybe<MessageMutationResponse>;
  /** delete single row from the table: "message" */
  deleteMessageByPk?: Maybe<Message>;
  /** delete data from the table: "phase" */
  deletePhase?: Maybe<PhaseMutationResponse>;
  /** delete single row from the table: "phase" */
  deletePhaseByPk?: Maybe<Phase>;
  /** delete data from the table: "position" */
  deletePosition?: Maybe<PositionMutationResponse>;
  /** delete single row from the table: "position" */
  deletePositionByPk?: Maybe<Position>;
  /** delete data from the table: "priority" */
  deletePriority?: Maybe<PriorityMutationResponse>;
  /** delete single row from the table: "priority" */
  deletePriorityByPk?: Maybe<Priority>;
  /** delete data from the table: "program" */
  deleteProgram?: Maybe<ProgramMutationResponse>;
  /** delete single row from the table: "program" */
  deleteProgramByPk?: Maybe<Program>;
  /** delete data from the table: "request" */
  deleteRequest?: Maybe<RequestMutationResponse>;
  /** delete single row from the table: "request" */
  deleteRequestByPk?: Maybe<Request>;
  /** delete data from the table: "request_type" */
  deleteRequestType?: Maybe<RequestTypeMutationResponse>;
  /** delete single row from the table: "request_type" */
  deleteRequestTypeByPk?: Maybe<RequestType>;
  /** delete data from the table: "role" */
  deleteRole?: Maybe<RoleMutationResponse>;
  /** delete single row from the table: "role" */
  deleteRoleByPk?: Maybe<Role>;
  /** delete data from the table: "role_type" */
  deleteRoleType?: Maybe<RoleTypeMutationResponse>;
  /** delete single row from the table: "role_type" */
  deleteRoleTypeByPk?: Maybe<RoleType>;
  /** delete data from the table: "service" */
  deleteService?: Maybe<ServiceMutationResponse>;
  /** delete single row from the table: "service" */
  deleteServiceByPk?: Maybe<Service>;
  /** delete data from the table: "service_modification" */
  deleteServiceModification?: Maybe<ServiceModificationMutationResponse>;
  /** delete single row from the table: "service_modification" */
  deleteServiceModificationByPk?: Maybe<ServiceModification>;
  /** delete data from the table: "service_modification_type" */
  deleteServiceModificationType?: Maybe<ServiceModificationTypeMutationResponse>;
  /** delete single row from the table: "service_modification_type" */
  deleteServiceModificationTypeByPk?: Maybe<ServiceModificationType>;
  /** delete data from the table: "teacher" */
  deleteTeacher?: Maybe<TeacherMutationResponse>;
  /** delete single row from the table: "teacher" */
  deleteTeacherByPk?: Maybe<Teacher>;
  /** delete data from the table: "track" */
  deleteTrack?: Maybe<TrackMutationResponse>;
  /** delete single row from the table: "track" */
  deleteTrackByPk?: Maybe<Track>;
  /** delete data from the table: "year" */
  deleteYear?: Maybe<YearMutationResponse>;
  /** delete single row from the table: "year" */
  deleteYearByPk?: Maybe<Year>;
  /** execute VOLATILE function "dummy_function" which returns "app_setting" */
  dummyFunction: Array<AppSetting>;
  /** insert data into the table: "app_setting" */
  insertAppSetting?: Maybe<AppSettingMutationResponse>;
  /** insert a single row into the table: "app_setting" */
  insertAppSettingOne?: Maybe<AppSetting>;
  /** insert data into the table: "coordination" */
  insertCoordination?: Maybe<CoordinationMutationResponse>;
  /** insert a single row into the table: "coordination" */
  insertCoordinationOne?: Maybe<Coordination>;
  /** insert data into the table: "course" */
  insertCourse?: Maybe<CourseMutationResponse>;
  /** insert a single row into the table: "course" */
  insertCourseOne?: Maybe<Course>;
  /** insert data into the table: "course_type" */
  insertCourseType?: Maybe<CourseTypeMutationResponse>;
  /** insert a single row into the table: "course_type" */
  insertCourseTypeOne?: Maybe<CourseType>;
  /** insert data into the table: "current_phase" */
  insertCurrentPhase?: Maybe<CurrentPhaseMutationResponse>;
  /** insert a single row into the table: "current_phase" */
  insertCurrentPhaseOne?: Maybe<CurrentPhase>;
  /** insert data into the table: "degree" */
  insertDegree?: Maybe<DegreeMutationResponse>;
  /** insert a single row into the table: "degree" */
  insertDegreeOne?: Maybe<Degree>;
  /** insert data into the table: "message" */
  insertMessage?: Maybe<MessageMutationResponse>;
  /** insert a single row into the table: "message" */
  insertMessageOne?: Maybe<Message>;
  /** insert data into the table: "phase" */
  insertPhase?: Maybe<PhaseMutationResponse>;
  /** insert a single row into the table: "phase" */
  insertPhaseOne?: Maybe<Phase>;
  /** insert data into the table: "position" */
  insertPosition?: Maybe<PositionMutationResponse>;
  /** insert a single row into the table: "position" */
  insertPositionOne?: Maybe<Position>;
  /** insert data into the table: "priority" */
  insertPriority?: Maybe<PriorityMutationResponse>;
  /** insert a single row into the table: "priority" */
  insertPriorityOne?: Maybe<Priority>;
  /** insert data into the table: "program" */
  insertProgram?: Maybe<ProgramMutationResponse>;
  /** insert a single row into the table: "program" */
  insertProgramOne?: Maybe<Program>;
  /** insert data into the table: "request" */
  insertRequest?: Maybe<RequestMutationResponse>;
  /** insert a single row into the table: "request" */
  insertRequestOne?: Maybe<Request>;
  /** insert data into the table: "request_type" */
  insertRequestType?: Maybe<RequestTypeMutationResponse>;
  /** insert a single row into the table: "request_type" */
  insertRequestTypeOne?: Maybe<RequestType>;
  /** insert data into the table: "role" */
  insertRole?: Maybe<RoleMutationResponse>;
  /** insert a single row into the table: "role" */
  insertRoleOne?: Maybe<Role>;
  /** insert data into the table: "role_type" */
  insertRoleType?: Maybe<RoleTypeMutationResponse>;
  /** insert a single row into the table: "role_type" */
  insertRoleTypeOne?: Maybe<RoleType>;
  /** insert data into the table: "service" */
  insertService?: Maybe<ServiceMutationResponse>;
  /** insert data into the table: "service_modification" */
  insertServiceModification?: Maybe<ServiceModificationMutationResponse>;
  /** insert a single row into the table: "service_modification" */
  insertServiceModificationOne?: Maybe<ServiceModification>;
  /** insert data into the table: "service_modification_type" */
  insertServiceModificationType?: Maybe<ServiceModificationTypeMutationResponse>;
  /** insert a single row into the table: "service_modification_type" */
  insertServiceModificationTypeOne?: Maybe<ServiceModificationType>;
  /** insert a single row into the table: "service" */
  insertServiceOne?: Maybe<Service>;
  /** insert data into the table: "teacher" */
  insertTeacher?: Maybe<TeacherMutationResponse>;
  /** insert a single row into the table: "teacher" */
  insertTeacherOne?: Maybe<Teacher>;
  /** insert data into the table: "track" */
  insertTrack?: Maybe<TrackMutationResponse>;
  /** insert a single row into the table: "track" */
  insertTrackOne?: Maybe<Track>;
  /** insert data into the table: "year" */
  insertYear?: Maybe<YearMutationResponse>;
  /** insert a single row into the table: "year" */
  insertYearOne?: Maybe<Year>;
  /** update data of the table: "app_setting" */
  updateAppSetting?: Maybe<AppSettingMutationResponse>;
  /** update single row of the table: "app_setting" */
  updateAppSettingByPk?: Maybe<AppSetting>;
  /** update multiples rows of table: "app_setting" */
  updateAppSettingMany?: Maybe<Array<Maybe<AppSettingMutationResponse>>>;
  /** update data of the table: "coordination" */
  updateCoordination?: Maybe<CoordinationMutationResponse>;
  /** update single row of the table: "coordination" */
  updateCoordinationByPk?: Maybe<Coordination>;
  /** update multiples rows of table: "coordination" */
  updateCoordinationMany?: Maybe<Array<Maybe<CoordinationMutationResponse>>>;
  /** update data of the table: "course" */
  updateCourse?: Maybe<CourseMutationResponse>;
  /** update single row of the table: "course" */
  updateCourseByPk?: Maybe<Course>;
  /** update multiples rows of table: "course" */
  updateCourseMany?: Maybe<Array<Maybe<CourseMutationResponse>>>;
  /** update data of the table: "course_type" */
  updateCourseType?: Maybe<CourseTypeMutationResponse>;
  /** update single row of the table: "course_type" */
  updateCourseTypeByPk?: Maybe<CourseType>;
  /** update multiples rows of table: "course_type" */
  updateCourseTypeMany?: Maybe<Array<Maybe<CourseTypeMutationResponse>>>;
  /** update data of the table: "current_phase" */
  updateCurrentPhase?: Maybe<CurrentPhaseMutationResponse>;
  /** update single row of the table: "current_phase" */
  updateCurrentPhaseByPk?: Maybe<CurrentPhase>;
  /** update multiples rows of table: "current_phase" */
  updateCurrentPhaseMany?: Maybe<Array<Maybe<CurrentPhaseMutationResponse>>>;
  /** update data of the table: "degree" */
  updateDegree?: Maybe<DegreeMutationResponse>;
  /** update single row of the table: "degree" */
  updateDegreeByPk?: Maybe<Degree>;
  /** update multiples rows of table: "degree" */
  updateDegreeMany?: Maybe<Array<Maybe<DegreeMutationResponse>>>;
  /** update data of the table: "message" */
  updateMessage?: Maybe<MessageMutationResponse>;
  /** update single row of the table: "message" */
  updateMessageByPk?: Maybe<Message>;
  /** update multiples rows of table: "message" */
  updateMessageMany?: Maybe<Array<Maybe<MessageMutationResponse>>>;
  /** update data of the table: "phase" */
  updatePhase?: Maybe<PhaseMutationResponse>;
  /** update single row of the table: "phase" */
  updatePhaseByPk?: Maybe<Phase>;
  /** update multiples rows of table: "phase" */
  updatePhaseMany?: Maybe<Array<Maybe<PhaseMutationResponse>>>;
  /** update data of the table: "position" */
  updatePosition?: Maybe<PositionMutationResponse>;
  /** update single row of the table: "position" */
  updatePositionByPk?: Maybe<Position>;
  /** update multiples rows of table: "position" */
  updatePositionMany?: Maybe<Array<Maybe<PositionMutationResponse>>>;
  /** update data of the table: "priority" */
  updatePriority?: Maybe<PriorityMutationResponse>;
  /** update single row of the table: "priority" */
  updatePriorityByPk?: Maybe<Priority>;
  /** update multiples rows of table: "priority" */
  updatePriorityMany?: Maybe<Array<Maybe<PriorityMutationResponse>>>;
  /** update data of the table: "program" */
  updateProgram?: Maybe<ProgramMutationResponse>;
  /** update single row of the table: "program" */
  updateProgramByPk?: Maybe<Program>;
  /** update multiples rows of table: "program" */
  updateProgramMany?: Maybe<Array<Maybe<ProgramMutationResponse>>>;
  /** update data of the table: "request" */
  updateRequest?: Maybe<RequestMutationResponse>;
  /** update single row of the table: "request" */
  updateRequestByPk?: Maybe<Request>;
  /** update multiples rows of table: "request" */
  updateRequestMany?: Maybe<Array<Maybe<RequestMutationResponse>>>;
  /** update data of the table: "request_type" */
  updateRequestType?: Maybe<RequestTypeMutationResponse>;
  /** update single row of the table: "request_type" */
  updateRequestTypeByPk?: Maybe<RequestType>;
  /** update multiples rows of table: "request_type" */
  updateRequestTypeMany?: Maybe<Array<Maybe<RequestTypeMutationResponse>>>;
  /** update data of the table: "role" */
  updateRole?: Maybe<RoleMutationResponse>;
  /** update single row of the table: "role" */
  updateRoleByPk?: Maybe<Role>;
  /** update multiples rows of table: "role" */
  updateRoleMany?: Maybe<Array<Maybe<RoleMutationResponse>>>;
  /** update data of the table: "role_type" */
  updateRoleType?: Maybe<RoleTypeMutationResponse>;
  /** update single row of the table: "role_type" */
  updateRoleTypeByPk?: Maybe<RoleType>;
  /** update multiples rows of table: "role_type" */
  updateRoleTypeMany?: Maybe<Array<Maybe<RoleTypeMutationResponse>>>;
  /** update data of the table: "service" */
  updateService?: Maybe<ServiceMutationResponse>;
  /** update single row of the table: "service" */
  updateServiceByPk?: Maybe<Service>;
  /** update multiples rows of table: "service" */
  updateServiceMany?: Maybe<Array<Maybe<ServiceMutationResponse>>>;
  /** update data of the table: "service_modification" */
  updateServiceModification?: Maybe<ServiceModificationMutationResponse>;
  /** update single row of the table: "service_modification" */
  updateServiceModificationByPk?: Maybe<ServiceModification>;
  /** update multiples rows of table: "service_modification" */
  updateServiceModificationMany?: Maybe<Array<Maybe<ServiceModificationMutationResponse>>>;
  /** update data of the table: "service_modification_type" */
  updateServiceModificationType?: Maybe<ServiceModificationTypeMutationResponse>;
  /** update single row of the table: "service_modification_type" */
  updateServiceModificationTypeByPk?: Maybe<ServiceModificationType>;
  /** update multiples rows of table: "service_modification_type" */
  updateServiceModificationTypeMany?: Maybe<Array<Maybe<ServiceModificationTypeMutationResponse>>>;
  /** update data of the table: "teacher" */
  updateTeacher?: Maybe<TeacherMutationResponse>;
  /** update single row of the table: "teacher" */
  updateTeacherByPk?: Maybe<Teacher>;
  /** update multiples rows of table: "teacher" */
  updateTeacherMany?: Maybe<Array<Maybe<TeacherMutationResponse>>>;
  /** update data of the table: "track" */
  updateTrack?: Maybe<TrackMutationResponse>;
  /** update single row of the table: "track" */
  updateTrackByPk?: Maybe<Track>;
  /** update multiples rows of table: "track" */
  updateTrackMany?: Maybe<Array<Maybe<TrackMutationResponse>>>;
  /** update data of the table: "year" */
  updateYear?: Maybe<YearMutationResponse>;
  /** update single row of the table: "year" */
  updateYearByPk?: Maybe<Year>;
  /** update multiples rows of table: "year" */
  updateYearMany?: Maybe<Array<Maybe<YearMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootComputeServicePrioritiesArgs = {
  args: ComputeServicePrioritiesArgs;
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


/** mutation root */
export type Mutation_RootComputeYearPrioritiesArgs = {
  args: ComputeYearPrioritiesArgs;
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


/** mutation root */
export type Mutation_RootCopyYearCoursesArgs = {
  args: CopyYearCoursesArgs;
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


/** mutation root */
export type Mutation_RootCreateTeacherServiceArgs = {
  args: CreateTeacherServiceArgs;
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};


/** mutation root */
export type Mutation_RootCreateYearServicesArgs = {
  args: CreateYearServicesArgs;
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};


/** mutation root */
export type Mutation_RootDeleteAppSettingArgs = {
  where: AppSettingBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAppSettingByPkArgs = {
  key: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteCoordinationArgs = {
  where: CoordinationBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCoordinationByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteCourseArgs = {
  where: CourseBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCourseByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteCourseTypeArgs = {
  where: CourseTypeBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCourseTypeByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteCurrentPhaseArgs = {
  where: CurrentPhaseBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCurrentPhaseByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteDegreeArgs = {
  where: DegreeBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteDegreeByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteMessageArgs = {
  where: MessageBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteMessageByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeletePhaseArgs = {
  where: PhaseBoolExp;
};


/** mutation root */
export type Mutation_RootDeletePhaseByPkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeletePositionArgs = {
  where: PositionBoolExp;
};


/** mutation root */
export type Mutation_RootDeletePositionByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeletePriorityArgs = {
  where: PriorityBoolExp;
};


/** mutation root */
export type Mutation_RootDeletePriorityByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteProgramArgs = {
  where: ProgramBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProgramByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteRequestArgs = {
  where: RequestBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteRequestByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteRequestTypeArgs = {
  where: RequestTypeBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteRequestTypeByPkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteRoleArgs = {
  where: RoleBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteRoleByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteRoleTypeArgs = {
  where: RoleTypeBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteRoleTypeByPkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteServiceArgs = {
  where: ServiceBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteServiceByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteServiceModificationArgs = {
  where: ServiceModificationBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteServiceModificationByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteServiceModificationTypeArgs = {
  where: ServiceModificationTypeBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteServiceModificationTypeByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTeacherArgs = {
  where: TeacherBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteTeacherByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTrackArgs = {
  where: TrackBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteTrackByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDeleteYearArgs = {
  where: YearBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteYearByPkArgs = {
  value: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDummyFunctionArgs = {
  distinctOn?: InputMaybe<Array<AppSettingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingOrderBy>>;
  where?: InputMaybe<AppSettingBoolExp>;
};


/** mutation root */
export type Mutation_RootInsertAppSettingArgs = {
  objects: Array<AppSettingInsertInput>;
  onConflict?: InputMaybe<AppSettingOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAppSettingOneArgs = {
  object: AppSettingInsertInput;
  onConflict?: InputMaybe<AppSettingOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCoordinationArgs = {
  objects: Array<CoordinationInsertInput>;
  onConflict?: InputMaybe<CoordinationOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCoordinationOneArgs = {
  object: CoordinationInsertInput;
  onConflict?: InputMaybe<CoordinationOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCourseArgs = {
  objects: Array<CourseInsertInput>;
  onConflict?: InputMaybe<CourseOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCourseOneArgs = {
  object: CourseInsertInput;
  onConflict?: InputMaybe<CourseOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCourseTypeArgs = {
  objects: Array<CourseTypeInsertInput>;
  onConflict?: InputMaybe<CourseTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCourseTypeOneArgs = {
  object: CourseTypeInsertInput;
  onConflict?: InputMaybe<CourseTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCurrentPhaseArgs = {
  objects: Array<CurrentPhaseInsertInput>;
  onConflict?: InputMaybe<CurrentPhaseOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCurrentPhaseOneArgs = {
  object: CurrentPhaseInsertInput;
  onConflict?: InputMaybe<CurrentPhaseOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertDegreeArgs = {
  objects: Array<DegreeInsertInput>;
  onConflict?: InputMaybe<DegreeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertDegreeOneArgs = {
  object: DegreeInsertInput;
  onConflict?: InputMaybe<DegreeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertMessageArgs = {
  objects: Array<MessageInsertInput>;
  onConflict?: InputMaybe<MessageOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertMessageOneArgs = {
  object: MessageInsertInput;
  onConflict?: InputMaybe<MessageOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPhaseArgs = {
  objects: Array<PhaseInsertInput>;
  onConflict?: InputMaybe<PhaseOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPhaseOneArgs = {
  object: PhaseInsertInput;
  onConflict?: InputMaybe<PhaseOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPositionArgs = {
  objects: Array<PositionInsertInput>;
  onConflict?: InputMaybe<PositionOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPositionOneArgs = {
  object: PositionInsertInput;
  onConflict?: InputMaybe<PositionOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPriorityArgs = {
  objects: Array<PriorityInsertInput>;
  onConflict?: InputMaybe<PriorityOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPriorityOneArgs = {
  object: PriorityInsertInput;
  onConflict?: InputMaybe<PriorityOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProgramArgs = {
  objects: Array<ProgramInsertInput>;
  onConflict?: InputMaybe<ProgramOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProgramOneArgs = {
  object: ProgramInsertInput;
  onConflict?: InputMaybe<ProgramOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertRequestArgs = {
  objects: Array<RequestInsertInput>;
  onConflict?: InputMaybe<RequestOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertRequestOneArgs = {
  object: RequestInsertInput;
  onConflict?: InputMaybe<RequestOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertRequestTypeArgs = {
  objects: Array<RequestTypeInsertInput>;
  onConflict?: InputMaybe<RequestTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertRequestTypeOneArgs = {
  object: RequestTypeInsertInput;
  onConflict?: InputMaybe<RequestTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertRoleArgs = {
  objects: Array<RoleInsertInput>;
  onConflict?: InputMaybe<RoleOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertRoleOneArgs = {
  object: RoleInsertInput;
  onConflict?: InputMaybe<RoleOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertRoleTypeArgs = {
  objects: Array<RoleTypeInsertInput>;
  onConflict?: InputMaybe<RoleTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertRoleTypeOneArgs = {
  object: RoleTypeInsertInput;
  onConflict?: InputMaybe<RoleTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertServiceArgs = {
  objects: Array<ServiceInsertInput>;
  onConflict?: InputMaybe<ServiceOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertServiceModificationArgs = {
  objects: Array<ServiceModificationInsertInput>;
  onConflict?: InputMaybe<ServiceModificationOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertServiceModificationOneArgs = {
  object: ServiceModificationInsertInput;
  onConflict?: InputMaybe<ServiceModificationOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertServiceModificationTypeArgs = {
  objects: Array<ServiceModificationTypeInsertInput>;
  onConflict?: InputMaybe<ServiceModificationTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertServiceModificationTypeOneArgs = {
  object: ServiceModificationTypeInsertInput;
  onConflict?: InputMaybe<ServiceModificationTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertServiceOneArgs = {
  object: ServiceInsertInput;
  onConflict?: InputMaybe<ServiceOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTeacherArgs = {
  objects: Array<TeacherInsertInput>;
  onConflict?: InputMaybe<TeacherOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTeacherOneArgs = {
  object: TeacherInsertInput;
  onConflict?: InputMaybe<TeacherOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTrackArgs = {
  objects: Array<TrackInsertInput>;
  onConflict?: InputMaybe<TrackOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTrackOneArgs = {
  object: TrackInsertInput;
  onConflict?: InputMaybe<TrackOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertYearArgs = {
  objects: Array<YearInsertInput>;
  onConflict?: InputMaybe<YearOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertYearOneArgs = {
  object: YearInsertInput;
  onConflict?: InputMaybe<YearOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateAppSettingArgs = {
  _set?: InputMaybe<AppSettingSetInput>;
  where: AppSettingBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAppSettingByPkArgs = {
  _set?: InputMaybe<AppSettingSetInput>;
  pkColumns: AppSettingPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAppSettingManyArgs = {
  updates: Array<AppSettingUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCoordinationArgs = {
  _inc?: InputMaybe<CoordinationIncInput>;
  _set?: InputMaybe<CoordinationSetInput>;
  where: CoordinationBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCoordinationByPkArgs = {
  _inc?: InputMaybe<CoordinationIncInput>;
  _set?: InputMaybe<CoordinationSetInput>;
  pkColumns: CoordinationPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCoordinationManyArgs = {
  updates: Array<CoordinationUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCourseArgs = {
  _inc?: InputMaybe<CourseIncInput>;
  _set?: InputMaybe<CourseSetInput>;
  where: CourseBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCourseByPkArgs = {
  _inc?: InputMaybe<CourseIncInput>;
  _set?: InputMaybe<CourseSetInput>;
  pkColumns: CoursePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCourseManyArgs = {
  updates: Array<CourseUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCourseTypeArgs = {
  _inc?: InputMaybe<CourseTypeIncInput>;
  _set?: InputMaybe<CourseTypeSetInput>;
  where: CourseTypeBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCourseTypeByPkArgs = {
  _inc?: InputMaybe<CourseTypeIncInput>;
  _set?: InputMaybe<CourseTypeSetInput>;
  pkColumns: CourseTypePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCourseTypeManyArgs = {
  updates: Array<CourseTypeUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCurrentPhaseArgs = {
  _inc?: InputMaybe<CurrentPhaseIncInput>;
  _set?: InputMaybe<CurrentPhaseSetInput>;
  where: CurrentPhaseBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCurrentPhaseByPkArgs = {
  _inc?: InputMaybe<CurrentPhaseIncInput>;
  _set?: InputMaybe<CurrentPhaseSetInput>;
  pkColumns: CurrentPhasePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCurrentPhaseManyArgs = {
  updates: Array<CurrentPhaseUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateDegreeArgs = {
  _set?: InputMaybe<DegreeSetInput>;
  where: DegreeBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateDegreeByPkArgs = {
  _set?: InputMaybe<DegreeSetInput>;
  pkColumns: DegreePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateDegreeManyArgs = {
  updates: Array<DegreeUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateMessageArgs = {
  _inc?: InputMaybe<MessageIncInput>;
  _set?: InputMaybe<MessageSetInput>;
  where: MessageBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateMessageByPkArgs = {
  _inc?: InputMaybe<MessageIncInput>;
  _set?: InputMaybe<MessageSetInput>;
  pkColumns: MessagePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateMessageManyArgs = {
  updates: Array<MessageUpdates>;
};


/** mutation root */
export type Mutation_RootUpdatePhaseArgs = {
  _set?: InputMaybe<PhaseSetInput>;
  where: PhaseBoolExp;
};


/** mutation root */
export type Mutation_RootUpdatePhaseByPkArgs = {
  _set?: InputMaybe<PhaseSetInput>;
  pkColumns: PhasePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdatePhaseManyArgs = {
  updates: Array<PhaseUpdates>;
};


/** mutation root */
export type Mutation_RootUpdatePositionArgs = {
  _inc?: InputMaybe<PositionIncInput>;
  _set?: InputMaybe<PositionSetInput>;
  where: PositionBoolExp;
};


/** mutation root */
export type Mutation_RootUpdatePositionByPkArgs = {
  _inc?: InputMaybe<PositionIncInput>;
  _set?: InputMaybe<PositionSetInput>;
  pkColumns: PositionPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdatePositionManyArgs = {
  updates: Array<PositionUpdates>;
};


/** mutation root */
export type Mutation_RootUpdatePriorityArgs = {
  _inc?: InputMaybe<PriorityIncInput>;
  _set?: InputMaybe<PrioritySetInput>;
  where: PriorityBoolExp;
};


/** mutation root */
export type Mutation_RootUpdatePriorityByPkArgs = {
  _inc?: InputMaybe<PriorityIncInput>;
  _set?: InputMaybe<PrioritySetInput>;
  pkColumns: PriorityPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdatePriorityManyArgs = {
  updates: Array<PriorityUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProgramArgs = {
  _inc?: InputMaybe<ProgramIncInput>;
  _set?: InputMaybe<ProgramSetInput>;
  where: ProgramBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProgramByPkArgs = {
  _inc?: InputMaybe<ProgramIncInput>;
  _set?: InputMaybe<ProgramSetInput>;
  pkColumns: ProgramPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProgramManyArgs = {
  updates: Array<ProgramUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateRequestArgs = {
  _inc?: InputMaybe<RequestIncInput>;
  _set?: InputMaybe<RequestSetInput>;
  where: RequestBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateRequestByPkArgs = {
  _inc?: InputMaybe<RequestIncInput>;
  _set?: InputMaybe<RequestSetInput>;
  pkColumns: RequestPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateRequestManyArgs = {
  updates: Array<RequestUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateRequestTypeArgs = {
  _set?: InputMaybe<RequestTypeSetInput>;
  where: RequestTypeBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateRequestTypeByPkArgs = {
  _set?: InputMaybe<RequestTypeSetInput>;
  pkColumns: RequestTypePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateRequestTypeManyArgs = {
  updates: Array<RequestTypeUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateRoleArgs = {
  _inc?: InputMaybe<RoleIncInput>;
  _set?: InputMaybe<RoleSetInput>;
  where: RoleBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateRoleByPkArgs = {
  _inc?: InputMaybe<RoleIncInput>;
  _set?: InputMaybe<RoleSetInput>;
  pkColumns: RolePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateRoleManyArgs = {
  updates: Array<RoleUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateRoleTypeArgs = {
  _set?: InputMaybe<RoleTypeSetInput>;
  where: RoleTypeBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateRoleTypeByPkArgs = {
  _set?: InputMaybe<RoleTypeSetInput>;
  pkColumns: RoleTypePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateRoleTypeManyArgs = {
  updates: Array<RoleTypeUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateServiceArgs = {
  _inc?: InputMaybe<ServiceIncInput>;
  _set?: InputMaybe<ServiceSetInput>;
  where: ServiceBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateServiceByPkArgs = {
  _inc?: InputMaybe<ServiceIncInput>;
  _set?: InputMaybe<ServiceSetInput>;
  pkColumns: ServicePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateServiceManyArgs = {
  updates: Array<ServiceUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateServiceModificationArgs = {
  _inc?: InputMaybe<ServiceModificationIncInput>;
  _set?: InputMaybe<ServiceModificationSetInput>;
  where: ServiceModificationBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateServiceModificationByPkArgs = {
  _inc?: InputMaybe<ServiceModificationIncInput>;
  _set?: InputMaybe<ServiceModificationSetInput>;
  pkColumns: ServiceModificationPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateServiceModificationManyArgs = {
  updates: Array<ServiceModificationUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateServiceModificationTypeArgs = {
  _set?: InputMaybe<ServiceModificationTypeSetInput>;
  where: ServiceModificationTypeBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateServiceModificationTypeByPkArgs = {
  _set?: InputMaybe<ServiceModificationTypeSetInput>;
  pkColumns: ServiceModificationTypePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateServiceModificationTypeManyArgs = {
  updates: Array<ServiceModificationTypeUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateTeacherArgs = {
  _inc?: InputMaybe<TeacherIncInput>;
  _set?: InputMaybe<TeacherSetInput>;
  where: TeacherBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateTeacherByPkArgs = {
  _inc?: InputMaybe<TeacherIncInput>;
  _set?: InputMaybe<TeacherSetInput>;
  pkColumns: TeacherPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateTeacherManyArgs = {
  updates: Array<TeacherUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateTrackArgs = {
  _inc?: InputMaybe<TrackIncInput>;
  _set?: InputMaybe<TrackSetInput>;
  where: TrackBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateTrackByPkArgs = {
  _inc?: InputMaybe<TrackIncInput>;
  _set?: InputMaybe<TrackSetInput>;
  pkColumns: TrackPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateTrackManyArgs = {
  updates: Array<TrackUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateYearArgs = {
  _inc?: InputMaybe<YearIncInput>;
  _set?: InputMaybe<YearSetInput>;
  where: YearBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateYearByPkArgs = {
  _inc?: InputMaybe<YearIncInput>;
  _set?: InputMaybe<YearSetInput>;
  pkColumns: YearPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateYearManyArgs = {
  updates: Array<YearUpdates>;
};

export type PriorityAggregateBoolExpBool_And = {
  arguments: PrioritySelectColumnPriorityAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<PriorityBoolExp>;
  predicate: BooleanComparisonExp;
};

export type PriorityAggregateBoolExpBool_Or = {
  arguments: PrioritySelectColumnPriorityAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<PriorityBoolExp>;
  predicate: BooleanComparisonExp;
};

export type PriorityAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<PrioritySelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<PriorityBoolExp>;
  predicate: IntComparisonExp;
};

export type ProgramAggregateBoolExpBool_And = {
  arguments: ProgramSelectColumnProgramAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ProgramBoolExp>;
  predicate: BooleanComparisonExp;
};

export type ProgramAggregateBoolExpBool_Or = {
  arguments: ProgramSelectColumnProgramAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ProgramBoolExp>;
  predicate: BooleanComparisonExp;
};

export type ProgramAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<ProgramSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ProgramBoolExp>;
  predicate: IntComparisonExp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "app_setting" */
  appSetting: Array<AppSetting>;
  /** fetch aggregated fields from the table: "app_setting" */
  appSettingAggregate: AppSettingAggregate;
  /** fetch data from the table: "app_setting" using primary key columns */
  appSettingByPk?: Maybe<AppSetting>;
  /** fetch data from the table: "coordination" */
  coordination: Array<Coordination>;
  /** fetch aggregated fields from the table: "coordination" */
  coordinationAggregate: CoordinationAggregate;
  /** fetch data from the table: "coordination" using primary key columns */
  coordinationByPk?: Maybe<Coordination>;
  /** fetch data from the table: "course" */
  course: Array<Course>;
  /** fetch aggregated fields from the table: "course" */
  courseAggregate: CourseAggregate;
  /** fetch data from the table: "course" using primary key columns */
  courseByPk?: Maybe<Course>;
  /** fetch data from the table: "course_type" */
  courseType: Array<CourseType>;
  /** fetch aggregated fields from the table: "course_type" */
  courseTypeAggregate: CourseTypeAggregate;
  /** fetch data from the table: "course_type" using primary key columns */
  courseTypeByPk?: Maybe<CourseType>;
  /** fetch data from the table: "current_phase" */
  currentPhase: Array<CurrentPhase>;
  /** fetch aggregated fields from the table: "current_phase" */
  currentPhaseAggregate: CurrentPhaseAggregate;
  /** fetch data from the table: "current_phase" using primary key columns */
  currentPhaseByPk?: Maybe<CurrentPhase>;
  /** fetch data from the table: "degree" */
  degree: Array<Degree>;
  /** fetch aggregated fields from the table: "degree" */
  degreeAggregate: DegreeAggregate;
  /** fetch data from the table: "degree" using primary key columns */
  degreeByPk?: Maybe<Degree>;
  /** fetch data from the table: "message" */
  message: Array<Message>;
  /** fetch aggregated fields from the table: "message" */
  messageAggregate: MessageAggregate;
  /** fetch data from the table: "message" using primary key columns */
  messageByPk?: Maybe<Message>;
  /** fetch data from the table: "phase" */
  phase: Array<Phase>;
  /** fetch aggregated fields from the table: "phase" */
  phaseAggregate: PhaseAggregate;
  /** fetch data from the table: "phase" using primary key columns */
  phaseByPk?: Maybe<Phase>;
  /** fetch data from the table: "position" */
  position: Array<Position>;
  /** fetch aggregated fields from the table: "position" */
  positionAggregate: PositionAggregate;
  /** fetch data from the table: "position" using primary key columns */
  positionByPk?: Maybe<Position>;
  /** fetch data from the table: "priority" */
  priority: Array<Priority>;
  /** fetch aggregated fields from the table: "priority" */
  priorityAggregate: PriorityAggregate;
  /** fetch data from the table: "priority" using primary key columns */
  priorityByPk?: Maybe<Priority>;
  /** fetch data from the table: "program" */
  program: Array<Program>;
  /** fetch aggregated fields from the table: "program" */
  programAggregate: ProgramAggregate;
  /** fetch data from the table: "program" using primary key columns */
  programByPk?: Maybe<Program>;
  /** fetch data from the table: "request" */
  request: Array<Request>;
  /** fetch aggregated fields from the table: "request" */
  requestAggregate: RequestAggregate;
  /** fetch data from the table: "request" using primary key columns */
  requestByPk?: Maybe<Request>;
  /** fetch data from the table: "request_type" */
  requestType: Array<RequestType>;
  /** fetch aggregated fields from the table: "request_type" */
  requestTypeAggregate: RequestTypeAggregate;
  /** fetch data from the table: "request_type" using primary key columns */
  requestTypeByPk?: Maybe<RequestType>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  roleAggregate: RoleAggregate;
  /** fetch data from the table: "role" using primary key columns */
  roleByPk?: Maybe<Role>;
  /** fetch data from the table: "role_type" */
  roleType: Array<RoleType>;
  /** fetch aggregated fields from the table: "role_type" */
  roleTypeAggregate: RoleTypeAggregate;
  /** fetch data from the table: "role_type" using primary key columns */
  roleTypeByPk?: Maybe<RoleType>;
  /** fetch data from the table: "service" */
  service: Array<Service>;
  /** fetch aggregated fields from the table: "service" */
  serviceAggregate: ServiceAggregate;
  /** fetch data from the table: "service" using primary key columns */
  serviceByPk?: Maybe<Service>;
  /** fetch data from the table: "service_modification" */
  serviceModification: Array<ServiceModification>;
  /** fetch aggregated fields from the table: "service_modification" */
  serviceModificationAggregate: ServiceModificationAggregate;
  /** fetch data from the table: "service_modification" using primary key columns */
  serviceModificationByPk?: Maybe<ServiceModification>;
  /** fetch data from the table: "service_modification_type" */
  serviceModificationType: Array<ServiceModificationType>;
  /** fetch aggregated fields from the table: "service_modification_type" */
  serviceModificationTypeAggregate: ServiceModificationTypeAggregate;
  /** fetch data from the table: "service_modification_type" using primary key columns */
  serviceModificationTypeByPk?: Maybe<ServiceModificationType>;
  /** fetch data from the table: "teacher" */
  teacher: Array<Teacher>;
  /** fetch aggregated fields from the table: "teacher" */
  teacherAggregate: TeacherAggregate;
  /** fetch data from the table: "teacher" using primary key columns */
  teacherByPk?: Maybe<Teacher>;
  /** fetch data from the table: "track" */
  track: Array<Track>;
  /** fetch aggregated fields from the table: "track" */
  trackAggregate: TrackAggregate;
  /** fetch data from the table: "track" using primary key columns */
  trackByPk?: Maybe<Track>;
  /** fetch data from the table: "year" */
  year: Array<Year>;
  /** fetch aggregated fields from the table: "year" */
  yearAggregate: YearAggregate;
  /** fetch data from the table: "year" using primary key columns */
  yearByPk?: Maybe<Year>;
};


export type Query_RootAppSettingArgs = {
  distinctOn?: InputMaybe<Array<AppSettingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingOrderBy>>;
  where?: InputMaybe<AppSettingBoolExp>;
};


export type Query_RootAppSettingAggregateArgs = {
  distinctOn?: InputMaybe<Array<AppSettingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingOrderBy>>;
  where?: InputMaybe<AppSettingBoolExp>;
};


export type Query_RootAppSettingByPkArgs = {
  key: Scalars['String']['input'];
};


export type Query_RootCoordinationArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


export type Query_RootCoordinationAggregateArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


export type Query_RootCoordinationByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootCourseArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


export type Query_RootCourseAggregateArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


export type Query_RootCourseByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootCourseTypeArgs = {
  distinctOn?: InputMaybe<Array<CourseTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseTypeOrderBy>>;
  where?: InputMaybe<CourseTypeBoolExp>;
};


export type Query_RootCourseTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<CourseTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseTypeOrderBy>>;
  where?: InputMaybe<CourseTypeBoolExp>;
};


export type Query_RootCourseTypeByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootCurrentPhaseArgs = {
  distinctOn?: InputMaybe<Array<CurrentPhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurrentPhaseOrderBy>>;
  where?: InputMaybe<CurrentPhaseBoolExp>;
};


export type Query_RootCurrentPhaseAggregateArgs = {
  distinctOn?: InputMaybe<Array<CurrentPhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurrentPhaseOrderBy>>;
  where?: InputMaybe<CurrentPhaseBoolExp>;
};


export type Query_RootCurrentPhaseByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootDegreeArgs = {
  distinctOn?: InputMaybe<Array<DegreeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DegreeOrderBy>>;
  where?: InputMaybe<DegreeBoolExp>;
};


export type Query_RootDegreeAggregateArgs = {
  distinctOn?: InputMaybe<Array<DegreeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DegreeOrderBy>>;
  where?: InputMaybe<DegreeBoolExp>;
};


export type Query_RootDegreeByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootMessageArgs = {
  distinctOn?: InputMaybe<Array<MessageSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessageOrderBy>>;
  where?: InputMaybe<MessageBoolExp>;
};


export type Query_RootMessageAggregateArgs = {
  distinctOn?: InputMaybe<Array<MessageSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessageOrderBy>>;
  where?: InputMaybe<MessageBoolExp>;
};


export type Query_RootMessageByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootPhaseArgs = {
  distinctOn?: InputMaybe<Array<PhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PhaseOrderBy>>;
  where?: InputMaybe<PhaseBoolExp>;
};


export type Query_RootPhaseAggregateArgs = {
  distinctOn?: InputMaybe<Array<PhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PhaseOrderBy>>;
  where?: InputMaybe<PhaseBoolExp>;
};


export type Query_RootPhaseByPkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootPositionArgs = {
  distinctOn?: InputMaybe<Array<PositionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PositionOrderBy>>;
  where?: InputMaybe<PositionBoolExp>;
};


export type Query_RootPositionAggregateArgs = {
  distinctOn?: InputMaybe<Array<PositionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PositionOrderBy>>;
  where?: InputMaybe<PositionBoolExp>;
};


export type Query_RootPositionByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootPriorityArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


export type Query_RootPriorityAggregateArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


export type Query_RootPriorityByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootProgramArgs = {
  distinctOn?: InputMaybe<Array<ProgramSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProgramOrderBy>>;
  where?: InputMaybe<ProgramBoolExp>;
};


export type Query_RootProgramAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProgramSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProgramOrderBy>>;
  where?: InputMaybe<ProgramBoolExp>;
};


export type Query_RootProgramByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRequestArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


export type Query_RootRequestAggregateArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


export type Query_RootRequestByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRequestTypeArgs = {
  distinctOn?: InputMaybe<Array<RequestTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestTypeOrderBy>>;
  where?: InputMaybe<RequestTypeBoolExp>;
};


export type Query_RootRequestTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<RequestTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestTypeOrderBy>>;
  where?: InputMaybe<RequestTypeBoolExp>;
};


export type Query_RootRequestTypeByPkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootRoleArgs = {
  distinctOn?: InputMaybe<Array<RoleSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  where?: InputMaybe<RoleBoolExp>;
};


export type Query_RootRoleAggregateArgs = {
  distinctOn?: InputMaybe<Array<RoleSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  where?: InputMaybe<RoleBoolExp>;
};


export type Query_RootRoleByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRoleTypeArgs = {
  distinctOn?: InputMaybe<Array<RoleTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleTypeOrderBy>>;
  where?: InputMaybe<RoleTypeBoolExp>;
};


export type Query_RootRoleTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<RoleTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleTypeOrderBy>>;
  where?: InputMaybe<RoleTypeBoolExp>;
};


export type Query_RootRoleTypeByPkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootServiceArgs = {
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};


export type Query_RootServiceAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};


export type Query_RootServiceByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootServiceModificationArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationOrderBy>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};


export type Query_RootServiceModificationAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationOrderBy>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};


export type Query_RootServiceModificationByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootServiceModificationTypeArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationTypeOrderBy>>;
  where?: InputMaybe<ServiceModificationTypeBoolExp>;
};


export type Query_RootServiceModificationTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationTypeOrderBy>>;
  where?: InputMaybe<ServiceModificationTypeBoolExp>;
};


export type Query_RootServiceModificationTypeByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootTeacherArgs = {
  distinctOn?: InputMaybe<Array<TeacherSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeacherOrderBy>>;
  where?: InputMaybe<TeacherBoolExp>;
};


export type Query_RootTeacherAggregateArgs = {
  distinctOn?: InputMaybe<Array<TeacherSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeacherOrderBy>>;
  where?: InputMaybe<TeacherBoolExp>;
};


export type Query_RootTeacherByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootTrackArgs = {
  distinctOn?: InputMaybe<Array<TrackSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TrackOrderBy>>;
  where?: InputMaybe<TrackBoolExp>;
};


export type Query_RootTrackAggregateArgs = {
  distinctOn?: InputMaybe<Array<TrackSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TrackOrderBy>>;
  where?: InputMaybe<TrackBoolExp>;
};


export type Query_RootTrackByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootYearArgs = {
  distinctOn?: InputMaybe<Array<YearSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<YearOrderBy>>;
  where?: InputMaybe<YearBoolExp>;
};


export type Query_RootYearAggregateArgs = {
  distinctOn?: InputMaybe<Array<YearSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<YearOrderBy>>;
  where?: InputMaybe<YearBoolExp>;
};


export type Query_RootYearByPkArgs = {
  value: Scalars['Int']['input'];
};

export type RequestAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<RequestSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<RequestBoolExp>;
  predicate: IntComparisonExp;
};

export type RoleAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<RoleSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<RoleBoolExp>;
  predicate: IntComparisonExp;
};

export type ServiceAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<ServiceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ServiceBoolExp>;
  predicate: IntComparisonExp;
};

export type ServiceModificationAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ServiceModificationBoolExp>;
  predicate: IntComparisonExp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "app_setting" */
  appSetting: Array<AppSetting>;
  /** fetch aggregated fields from the table: "app_setting" */
  appSettingAggregate: AppSettingAggregate;
  /** fetch data from the table: "app_setting" using primary key columns */
  appSettingByPk?: Maybe<AppSetting>;
  /** fetch data from the table in a streaming manner: "app_setting" */
  appSettingStream: Array<AppSetting>;
  /** fetch data from the table: "coordination" */
  coordination: Array<Coordination>;
  /** fetch aggregated fields from the table: "coordination" */
  coordinationAggregate: CoordinationAggregate;
  /** fetch data from the table: "coordination" using primary key columns */
  coordinationByPk?: Maybe<Coordination>;
  /** fetch data from the table in a streaming manner: "coordination" */
  coordinationStream: Array<Coordination>;
  /** fetch data from the table: "course" */
  course: Array<Course>;
  /** fetch aggregated fields from the table: "course" */
  courseAggregate: CourseAggregate;
  /** fetch data from the table: "course" using primary key columns */
  courseByPk?: Maybe<Course>;
  /** fetch data from the table in a streaming manner: "course" */
  courseStream: Array<Course>;
  /** fetch data from the table: "course_type" */
  courseType: Array<CourseType>;
  /** fetch aggregated fields from the table: "course_type" */
  courseTypeAggregate: CourseTypeAggregate;
  /** fetch data from the table: "course_type" using primary key columns */
  courseTypeByPk?: Maybe<CourseType>;
  /** fetch data from the table in a streaming manner: "course_type" */
  courseTypeStream: Array<CourseType>;
  /** fetch data from the table: "current_phase" */
  currentPhase: Array<CurrentPhase>;
  /** fetch aggregated fields from the table: "current_phase" */
  currentPhaseAggregate: CurrentPhaseAggregate;
  /** fetch data from the table: "current_phase" using primary key columns */
  currentPhaseByPk?: Maybe<CurrentPhase>;
  /** fetch data from the table in a streaming manner: "current_phase" */
  currentPhaseStream: Array<CurrentPhase>;
  /** fetch data from the table: "degree" */
  degree: Array<Degree>;
  /** fetch aggregated fields from the table: "degree" */
  degreeAggregate: DegreeAggregate;
  /** fetch data from the table: "degree" using primary key columns */
  degreeByPk?: Maybe<Degree>;
  /** fetch data from the table in a streaming manner: "degree" */
  degreeStream: Array<Degree>;
  /** fetch data from the table: "message" */
  message: Array<Message>;
  /** fetch aggregated fields from the table: "message" */
  messageAggregate: MessageAggregate;
  /** fetch data from the table: "message" using primary key columns */
  messageByPk?: Maybe<Message>;
  /** fetch data from the table in a streaming manner: "message" */
  messageStream: Array<Message>;
  /** fetch data from the table: "phase" */
  phase: Array<Phase>;
  /** fetch aggregated fields from the table: "phase" */
  phaseAggregate: PhaseAggregate;
  /** fetch data from the table: "phase" using primary key columns */
  phaseByPk?: Maybe<Phase>;
  /** fetch data from the table in a streaming manner: "phase" */
  phaseStream: Array<Phase>;
  /** fetch data from the table: "position" */
  position: Array<Position>;
  /** fetch aggregated fields from the table: "position" */
  positionAggregate: PositionAggregate;
  /** fetch data from the table: "position" using primary key columns */
  positionByPk?: Maybe<Position>;
  /** fetch data from the table in a streaming manner: "position" */
  positionStream: Array<Position>;
  /** fetch data from the table: "priority" */
  priority: Array<Priority>;
  /** fetch aggregated fields from the table: "priority" */
  priorityAggregate: PriorityAggregate;
  /** fetch data from the table: "priority" using primary key columns */
  priorityByPk?: Maybe<Priority>;
  /** fetch data from the table in a streaming manner: "priority" */
  priorityStream: Array<Priority>;
  /** fetch data from the table: "program" */
  program: Array<Program>;
  /** fetch aggregated fields from the table: "program" */
  programAggregate: ProgramAggregate;
  /** fetch data from the table: "program" using primary key columns */
  programByPk?: Maybe<Program>;
  /** fetch data from the table in a streaming manner: "program" */
  programStream: Array<Program>;
  /** fetch data from the table: "request" */
  request: Array<Request>;
  /** fetch aggregated fields from the table: "request" */
  requestAggregate: RequestAggregate;
  /** fetch data from the table: "request" using primary key columns */
  requestByPk?: Maybe<Request>;
  /** fetch data from the table in a streaming manner: "request" */
  requestStream: Array<Request>;
  /** fetch data from the table: "request_type" */
  requestType: Array<RequestType>;
  /** fetch aggregated fields from the table: "request_type" */
  requestTypeAggregate: RequestTypeAggregate;
  /** fetch data from the table: "request_type" using primary key columns */
  requestTypeByPk?: Maybe<RequestType>;
  /** fetch data from the table in a streaming manner: "request_type" */
  requestTypeStream: Array<RequestType>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  roleAggregate: RoleAggregate;
  /** fetch data from the table: "role" using primary key columns */
  roleByPk?: Maybe<Role>;
  /** fetch data from the table in a streaming manner: "role" */
  roleStream: Array<Role>;
  /** fetch data from the table: "role_type" */
  roleType: Array<RoleType>;
  /** fetch aggregated fields from the table: "role_type" */
  roleTypeAggregate: RoleTypeAggregate;
  /** fetch data from the table: "role_type" using primary key columns */
  roleTypeByPk?: Maybe<RoleType>;
  /** fetch data from the table in a streaming manner: "role_type" */
  roleTypeStream: Array<RoleType>;
  /** fetch data from the table: "service" */
  service: Array<Service>;
  /** fetch aggregated fields from the table: "service" */
  serviceAggregate: ServiceAggregate;
  /** fetch data from the table: "service" using primary key columns */
  serviceByPk?: Maybe<Service>;
  /** fetch data from the table: "service_modification" */
  serviceModification: Array<ServiceModification>;
  /** fetch aggregated fields from the table: "service_modification" */
  serviceModificationAggregate: ServiceModificationAggregate;
  /** fetch data from the table: "service_modification" using primary key columns */
  serviceModificationByPk?: Maybe<ServiceModification>;
  /** fetch data from the table in a streaming manner: "service_modification" */
  serviceModificationStream: Array<ServiceModification>;
  /** fetch data from the table: "service_modification_type" */
  serviceModificationType: Array<ServiceModificationType>;
  /** fetch aggregated fields from the table: "service_modification_type" */
  serviceModificationTypeAggregate: ServiceModificationTypeAggregate;
  /** fetch data from the table: "service_modification_type" using primary key columns */
  serviceModificationTypeByPk?: Maybe<ServiceModificationType>;
  /** fetch data from the table in a streaming manner: "service_modification_type" */
  serviceModificationTypeStream: Array<ServiceModificationType>;
  /** fetch data from the table in a streaming manner: "service" */
  serviceStream: Array<Service>;
  /** fetch data from the table: "teacher" */
  teacher: Array<Teacher>;
  /** fetch aggregated fields from the table: "teacher" */
  teacherAggregate: TeacherAggregate;
  /** fetch data from the table: "teacher" using primary key columns */
  teacherByPk?: Maybe<Teacher>;
  /** fetch data from the table in a streaming manner: "teacher" */
  teacherStream: Array<Teacher>;
  /** fetch data from the table: "track" */
  track: Array<Track>;
  /** fetch aggregated fields from the table: "track" */
  trackAggregate: TrackAggregate;
  /** fetch data from the table: "track" using primary key columns */
  trackByPk?: Maybe<Track>;
  /** fetch data from the table in a streaming manner: "track" */
  trackStream: Array<Track>;
  /** fetch data from the table: "year" */
  year: Array<Year>;
  /** fetch aggregated fields from the table: "year" */
  yearAggregate: YearAggregate;
  /** fetch data from the table: "year" using primary key columns */
  yearByPk?: Maybe<Year>;
  /** fetch data from the table in a streaming manner: "year" */
  yearStream: Array<Year>;
};


export type Subscription_RootAppSettingArgs = {
  distinctOn?: InputMaybe<Array<AppSettingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingOrderBy>>;
  where?: InputMaybe<AppSettingBoolExp>;
};


export type Subscription_RootAppSettingAggregateArgs = {
  distinctOn?: InputMaybe<Array<AppSettingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingOrderBy>>;
  where?: InputMaybe<AppSettingBoolExp>;
};


export type Subscription_RootAppSettingByPkArgs = {
  key: Scalars['String']['input'];
};


export type Subscription_RootAppSettingStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AppSettingStreamCursorInput>>;
  where?: InputMaybe<AppSettingBoolExp>;
};


export type Subscription_RootCoordinationArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


export type Subscription_RootCoordinationAggregateArgs = {
  distinctOn?: InputMaybe<Array<CoordinationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CoordinationOrderBy>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


export type Subscription_RootCoordinationByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCoordinationStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CoordinationStreamCursorInput>>;
  where?: InputMaybe<CoordinationBoolExp>;
};


export type Subscription_RootCourseArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


export type Subscription_RootCourseAggregateArgs = {
  distinctOn?: InputMaybe<Array<CourseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
  where?: InputMaybe<CourseBoolExp>;
};


export type Subscription_RootCourseByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCourseStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CourseStreamCursorInput>>;
  where?: InputMaybe<CourseBoolExp>;
};


export type Subscription_RootCourseTypeArgs = {
  distinctOn?: InputMaybe<Array<CourseTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseTypeOrderBy>>;
  where?: InputMaybe<CourseTypeBoolExp>;
};


export type Subscription_RootCourseTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<CourseTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseTypeOrderBy>>;
  where?: InputMaybe<CourseTypeBoolExp>;
};


export type Subscription_RootCourseTypeByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCourseTypeStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CourseTypeStreamCursorInput>>;
  where?: InputMaybe<CourseTypeBoolExp>;
};


export type Subscription_RootCurrentPhaseArgs = {
  distinctOn?: InputMaybe<Array<CurrentPhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurrentPhaseOrderBy>>;
  where?: InputMaybe<CurrentPhaseBoolExp>;
};


export type Subscription_RootCurrentPhaseAggregateArgs = {
  distinctOn?: InputMaybe<Array<CurrentPhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurrentPhaseOrderBy>>;
  where?: InputMaybe<CurrentPhaseBoolExp>;
};


export type Subscription_RootCurrentPhaseByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCurrentPhaseStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CurrentPhaseStreamCursorInput>>;
  where?: InputMaybe<CurrentPhaseBoolExp>;
};


export type Subscription_RootDegreeArgs = {
  distinctOn?: InputMaybe<Array<DegreeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DegreeOrderBy>>;
  where?: InputMaybe<DegreeBoolExp>;
};


export type Subscription_RootDegreeAggregateArgs = {
  distinctOn?: InputMaybe<Array<DegreeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DegreeOrderBy>>;
  where?: InputMaybe<DegreeBoolExp>;
};


export type Subscription_RootDegreeByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootDegreeStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<DegreeStreamCursorInput>>;
  where?: InputMaybe<DegreeBoolExp>;
};


export type Subscription_RootMessageArgs = {
  distinctOn?: InputMaybe<Array<MessageSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessageOrderBy>>;
  where?: InputMaybe<MessageBoolExp>;
};


export type Subscription_RootMessageAggregateArgs = {
  distinctOn?: InputMaybe<Array<MessageSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessageOrderBy>>;
  where?: InputMaybe<MessageBoolExp>;
};


export type Subscription_RootMessageByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootMessageStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MessageStreamCursorInput>>;
  where?: InputMaybe<MessageBoolExp>;
};


export type Subscription_RootPhaseArgs = {
  distinctOn?: InputMaybe<Array<PhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PhaseOrderBy>>;
  where?: InputMaybe<PhaseBoolExp>;
};


export type Subscription_RootPhaseAggregateArgs = {
  distinctOn?: InputMaybe<Array<PhaseSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PhaseOrderBy>>;
  where?: InputMaybe<PhaseBoolExp>;
};


export type Subscription_RootPhaseByPkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootPhaseStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PhaseStreamCursorInput>>;
  where?: InputMaybe<PhaseBoolExp>;
};


export type Subscription_RootPositionArgs = {
  distinctOn?: InputMaybe<Array<PositionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PositionOrderBy>>;
  where?: InputMaybe<PositionBoolExp>;
};


export type Subscription_RootPositionAggregateArgs = {
  distinctOn?: InputMaybe<Array<PositionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PositionOrderBy>>;
  where?: InputMaybe<PositionBoolExp>;
};


export type Subscription_RootPositionByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPositionStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PositionStreamCursorInput>>;
  where?: InputMaybe<PositionBoolExp>;
};


export type Subscription_RootPriorityArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


export type Subscription_RootPriorityAggregateArgs = {
  distinctOn?: InputMaybe<Array<PrioritySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriorityOrderBy>>;
  where?: InputMaybe<PriorityBoolExp>;
};


export type Subscription_RootPriorityByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPriorityStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PriorityStreamCursorInput>>;
  where?: InputMaybe<PriorityBoolExp>;
};


export type Subscription_RootProgramArgs = {
  distinctOn?: InputMaybe<Array<ProgramSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProgramOrderBy>>;
  where?: InputMaybe<ProgramBoolExp>;
};


export type Subscription_RootProgramAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProgramSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProgramOrderBy>>;
  where?: InputMaybe<ProgramBoolExp>;
};


export type Subscription_RootProgramByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootProgramStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ProgramStreamCursorInput>>;
  where?: InputMaybe<ProgramBoolExp>;
};


export type Subscription_RootRequestArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


export type Subscription_RootRequestAggregateArgs = {
  distinctOn?: InputMaybe<Array<RequestSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestOrderBy>>;
  where?: InputMaybe<RequestBoolExp>;
};


export type Subscription_RootRequestByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootRequestStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RequestStreamCursorInput>>;
  where?: InputMaybe<RequestBoolExp>;
};


export type Subscription_RootRequestTypeArgs = {
  distinctOn?: InputMaybe<Array<RequestTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestTypeOrderBy>>;
  where?: InputMaybe<RequestTypeBoolExp>;
};


export type Subscription_RootRequestTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<RequestTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RequestTypeOrderBy>>;
  where?: InputMaybe<RequestTypeBoolExp>;
};


export type Subscription_RootRequestTypeByPkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootRequestTypeStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RequestTypeStreamCursorInput>>;
  where?: InputMaybe<RequestTypeBoolExp>;
};


export type Subscription_RootRoleArgs = {
  distinctOn?: InputMaybe<Array<RoleSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  where?: InputMaybe<RoleBoolExp>;
};


export type Subscription_RootRoleAggregateArgs = {
  distinctOn?: InputMaybe<Array<RoleSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  where?: InputMaybe<RoleBoolExp>;
};


export type Subscription_RootRoleByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootRoleStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RoleStreamCursorInput>>;
  where?: InputMaybe<RoleBoolExp>;
};


export type Subscription_RootRoleTypeArgs = {
  distinctOn?: InputMaybe<Array<RoleTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleTypeOrderBy>>;
  where?: InputMaybe<RoleTypeBoolExp>;
};


export type Subscription_RootRoleTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<RoleTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoleTypeOrderBy>>;
  where?: InputMaybe<RoleTypeBoolExp>;
};


export type Subscription_RootRoleTypeByPkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootRoleTypeStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RoleTypeStreamCursorInput>>;
  where?: InputMaybe<RoleTypeBoolExp>;
};


export type Subscription_RootServiceArgs = {
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};


export type Subscription_RootServiceAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceOrderBy>>;
  where?: InputMaybe<ServiceBoolExp>;
};


export type Subscription_RootServiceByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootServiceModificationArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationOrderBy>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};


export type Subscription_RootServiceModificationAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationOrderBy>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};


export type Subscription_RootServiceModificationByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootServiceModificationStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ServiceModificationStreamCursorInput>>;
  where?: InputMaybe<ServiceModificationBoolExp>;
};


export type Subscription_RootServiceModificationTypeArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationTypeOrderBy>>;
  where?: InputMaybe<ServiceModificationTypeBoolExp>;
};


export type Subscription_RootServiceModificationTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<ServiceModificationTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServiceModificationTypeOrderBy>>;
  where?: InputMaybe<ServiceModificationTypeBoolExp>;
};


export type Subscription_RootServiceModificationTypeByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootServiceModificationTypeStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ServiceModificationTypeStreamCursorInput>>;
  where?: InputMaybe<ServiceModificationTypeBoolExp>;
};


export type Subscription_RootServiceStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ServiceStreamCursorInput>>;
  where?: InputMaybe<ServiceBoolExp>;
};


export type Subscription_RootTeacherArgs = {
  distinctOn?: InputMaybe<Array<TeacherSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeacherOrderBy>>;
  where?: InputMaybe<TeacherBoolExp>;
};


export type Subscription_RootTeacherAggregateArgs = {
  distinctOn?: InputMaybe<Array<TeacherSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeacherOrderBy>>;
  where?: InputMaybe<TeacherBoolExp>;
};


export type Subscription_RootTeacherByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootTeacherStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TeacherStreamCursorInput>>;
  where?: InputMaybe<TeacherBoolExp>;
};


export type Subscription_RootTrackArgs = {
  distinctOn?: InputMaybe<Array<TrackSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TrackOrderBy>>;
  where?: InputMaybe<TrackBoolExp>;
};


export type Subscription_RootTrackAggregateArgs = {
  distinctOn?: InputMaybe<Array<TrackSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TrackOrderBy>>;
  where?: InputMaybe<TrackBoolExp>;
};


export type Subscription_RootTrackByPkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootTrackStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TrackStreamCursorInput>>;
  where?: InputMaybe<TrackBoolExp>;
};


export type Subscription_RootYearArgs = {
  distinctOn?: InputMaybe<Array<YearSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<YearOrderBy>>;
  where?: InputMaybe<YearBoolExp>;
};


export type Subscription_RootYearAggregateArgs = {
  distinctOn?: InputMaybe<Array<YearSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<YearOrderBy>>;
  where?: InputMaybe<YearBoolExp>;
};


export type Subscription_RootYearByPkArgs = {
  value: Scalars['Int']['input'];
};


export type Subscription_RootYearStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<YearStreamCursorInput>>;
  where?: InputMaybe<YearBoolExp>;
};

export type TeacherAggregateBoolExpBool_And = {
  arguments: TeacherSelectColumnTeacherAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TeacherBoolExp>;
  predicate: BooleanComparisonExp;
};

export type TeacherAggregateBoolExpBool_Or = {
  arguments: TeacherSelectColumnTeacherAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TeacherBoolExp>;
  predicate: BooleanComparisonExp;
};

export type TeacherAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<TeacherSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TeacherBoolExp>;
  predicate: IntComparisonExp;
};

export type TrackAggregateBoolExpBool_And = {
  arguments: TrackSelectColumnTrackAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TrackBoolExp>;
  predicate: BooleanComparisonExp;
};

export type TrackAggregateBoolExpBool_Or = {
  arguments: TrackSelectColumnTrackAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TrackBoolExp>;
  predicate: BooleanComparisonExp;
};

export type TrackAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<TrackSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TrackBoolExp>;
  predicate: IntComparisonExp;
};

export type GetAppDataQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetAppDataQuery = { __typename?: 'query_root', currentPhase?: { __typename?: 'CurrentPhase', value?: PhaseEnum | null } | null, years: Array<{ __typename?: 'Year', value: number, current: boolean, visible: boolean }>, customTexts: Array<{ __typename?: 'AppSetting', key: string, value?: string | null }>, profile?: { __typename?: 'Teacher', id: number, displayname?: string | null, services: Array<{ __typename?: 'Service', id: number, year: number }> } | null };

export type CourseRowFragment = { __typename?: 'Course', id: number, visible: boolean, semester: number, name?: string | null, hoursPerGroup?: number | null, numberOfGroups?: number | null, program: { __typename?: 'Program', id: number, visible: boolean, name?: string | null, degree: { __typename?: 'Degree', visible: boolean, name?: string | null } }, track?: { __typename?: 'Track', visible: boolean, name?: string | null } | null, type: { __typename?: 'CourseType', label: string, coefficient: number }, requests: Array<{ __typename?: 'Request', serviceId: number, type: RequestTypeEnum, hours: number, isPriority?: boolean | null }> } & { ' $fragmentName'?: 'CourseRowFragment' };

export type TableCoursesServiceFragment = { __typename?: 'Service', id: number, teacher: { __typename?: 'Teacher', displayname?: string | null } } & { ' $fragmentName'?: 'TableCoursesServiceFragment' };

export type ServiceRowFragment = { __typename?: 'Service', id: number, hours: number, teacher: { __typename?: 'Teacher', firstname: string, lastname: string, alias?: string | null, visible: boolean }, modifications: Array<{ __typename?: 'ServiceModification', hours: number }>, requests: Array<{ __typename?: 'Request', type: RequestTypeEnum, hoursWeighted?: number | null }>, message?: { __typename?: 'Message', content: string } | null } & { ' $fragmentName'?: 'ServiceRowFragment' };

export type GetAdminCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminCoursesQuery = { __typename?: 'query_root', degrees: Array<(
    { __typename?: 'Degree' }
    & { ' $fragmentRefs'?: { 'AdminDegreeFragment': AdminDegreeFragment;'AdminProgramsDegreeFragment': AdminProgramsDegreeFragment;'AdminTracksDegreeFragment': AdminTracksDegreeFragment;'AdminCoursesDegreeFragment': AdminCoursesDegreeFragment } }
  )>, programs: Array<(
    { __typename?: 'Program' }
    & { ' $fragmentRefs'?: { 'AdminProgramFragment': AdminProgramFragment;'AdminTracksProgramFragment': AdminTracksProgramFragment;'AdminCoursesProgramFragment': AdminCoursesProgramFragment } }
  )>, tracks: Array<(
    { __typename?: 'Track' }
    & { ' $fragmentRefs'?: { 'AdminTrackFragment': AdminTrackFragment;'AdminCoursesTrackFragment': AdminCoursesTrackFragment } }
  )>, courses: Array<(
    { __typename?: 'Course' }
    & { ' $fragmentRefs'?: { 'AdminCourseFragment': AdminCourseFragment } }
  )>, types: Array<(
    { __typename?: 'CourseType' }
    & { ' $fragmentRefs'?: { 'AdminCourseTypeFragment': AdminCourseTypeFragment;'AdminCoursesCourseTypeFragment': AdminCoursesCourseTypeFragment } }
  )> };

export type AdminCourseTypeFragment = { __typename?: 'CourseType', id: number, label: string, coefficient: number, description?: string | null } & { ' $fragmentName'?: 'AdminCourseTypeFragment' };

export type InsertCourseTypesMutationVariables = Exact<{
  objects: Array<CourseTypeInsertInput> | CourseTypeInsertInput;
}>;


export type InsertCourseTypesMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'CourseTypeMutationResponse', returning: Array<{ __typename?: 'CourseType', id: number }> } | null };

export type UpsertCourseTypesMutationVariables = Exact<{
  objects: Array<CourseTypeInsertInput> | CourseTypeInsertInput;
  onConflict?: InputMaybe<CourseTypeOnConflict>;
}>;


export type UpsertCourseTypesMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'CourseTypeMutationResponse', returning: Array<{ __typename?: 'CourseType', id: number }> } | null };

export type UpdateCourseTypesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: CourseTypeSetInput;
}>;


export type UpdateCourseTypesMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'CourseTypeMutationResponse', returning: Array<{ __typename?: 'CourseType', id: number }> } | null };

export type DeleteCourseTypesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteCourseTypesMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'CourseTypeMutationResponse', returning: Array<{ __typename?: 'CourseType', id: number }> } | null };

export type AdminCourseFragment = { __typename?: 'Course', id: number, year: number, name: string, nameShort?: string | null, nameDisplay?: string | null, semester: number, hours: number, hoursAdjusted?: number | null, groups: number, groupsAdjusted?: number | null, description?: string | null, priorityRule?: number | null, visible: boolean, program: { __typename?: 'Program', name: string, nameDisplay?: string | null, degree: { __typename?: 'Degree', name: string, nameDisplay?: string | null } }, track?: { __typename?: 'Track', name: string, nameDisplay?: string | null } | null, type: { __typename?: 'CourseType', label: string } } & { ' $fragmentName'?: 'AdminCourseFragment' };

export type AdminCoursesDegreeFragment = { __typename?: 'Degree', id: number, name: string, nameDisplay?: string | null, programs: Array<{ __typename?: 'Program', id: number, name: string, tracks: Array<{ __typename?: 'Track', id: number, name: string }> }> } & { ' $fragmentName'?: 'AdminCoursesDegreeFragment' };

export type AdminCoursesProgramFragment = { __typename?: 'Program', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminCoursesProgramFragment' };

export type AdminCoursesTrackFragment = { __typename?: 'Track', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminCoursesTrackFragment' };

export type AdminCoursesCourseTypeFragment = { __typename?: 'CourseType', id: number, label: string } & { ' $fragmentName'?: 'AdminCoursesCourseTypeFragment' };

export type InsertCoursesMutationVariables = Exact<{
  objects: Array<CourseInsertInput> | CourseInsertInput;
}>;


export type InsertCoursesMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'CourseMutationResponse', returning: Array<{ __typename?: 'Course', id: number }> } | null };

export type UpsertCoursesMutationVariables = Exact<{
  objects: Array<CourseInsertInput> | CourseInsertInput;
  onConflict?: InputMaybe<CourseOnConflict>;
}>;


export type UpsertCoursesMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'CourseMutationResponse', returning: Array<{ __typename?: 'Course', id: number }> } | null };

export type UpdateCoursesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: CourseSetInput;
}>;


export type UpdateCoursesMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'CourseMutationResponse', returning: Array<{ __typename?: 'Course', id: number }> } | null };

export type DeleteCoursesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteCoursesMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'CourseMutationResponse', returning: Array<{ __typename?: 'Course', id: number }> } | null };

export type AdminDegreeFragment = { __typename?: 'Degree', id: number, name: string, nameShort?: string | null, visible: boolean } & { ' $fragmentName'?: 'AdminDegreeFragment' };

export type InsertDegreesMutationVariables = Exact<{
  objects: Array<DegreeInsertInput> | DegreeInsertInput;
}>;


export type InsertDegreesMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'DegreeMutationResponse', returning: Array<{ __typename?: 'Degree', id: number }> } | null };

export type UpsertDegreesMutationVariables = Exact<{
  objects: Array<DegreeInsertInput> | DegreeInsertInput;
  onConflict?: InputMaybe<DegreeOnConflict>;
}>;


export type UpsertDegreesMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'DegreeMutationResponse', returning: Array<{ __typename?: 'Degree', id: number }> } | null };

export type UpdateDegreesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: DegreeSetInput;
}>;


export type UpdateDegreesMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'DegreeMutationResponse', returning: Array<{ __typename?: 'Degree', id: number }> } | null };

export type DeleteDegreesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteDegreesMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'DegreeMutationResponse', returning: Array<{ __typename?: 'Degree', id: number }> } | null };

export type AdminProgramFragment = { __typename?: 'Program', id: number, name: string, nameShort?: string | null, nameDisplay?: string | null, visible: boolean, degree: { __typename?: 'Degree', name: string, nameDisplay?: string | null } } & { ' $fragmentName'?: 'AdminProgramFragment' };

export type AdminProgramsDegreeFragment = { __typename?: 'Degree', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminProgramsDegreeFragment' };

export type InsertProgramsMutationVariables = Exact<{
  objects: Array<ProgramInsertInput> | ProgramInsertInput;
}>;


export type InsertProgramsMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'ProgramMutationResponse', returning: Array<{ __typename?: 'Program', id: number }> } | null };

export type UpsertProgramsMutationVariables = Exact<{
  objects: Array<ProgramInsertInput> | ProgramInsertInput;
  onConflict?: InputMaybe<ProgramOnConflict>;
}>;


export type UpsertProgramsMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'ProgramMutationResponse', returning: Array<{ __typename?: 'Program', id: number }> } | null };

export type UpdateProgramsMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: ProgramSetInput;
}>;


export type UpdateProgramsMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'ProgramMutationResponse', returning: Array<{ __typename?: 'Program', id: number }> } | null };

export type DeleteProgramsMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteProgramsMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'ProgramMutationResponse', returning: Array<{ __typename?: 'Program', id: number }> } | null };

export type AdminTrackFragment = { __typename?: 'Track', id: number, name: string, nameShort?: string | null, nameDisplay?: string | null, visible: boolean, program: { __typename?: 'Program', name: string, nameDisplay?: string | null, degree: { __typename?: 'Degree', name: string, nameDisplay?: string | null } } } & { ' $fragmentName'?: 'AdminTrackFragment' };

export type AdminTracksDegreeFragment = { __typename?: 'Degree', id: number, name: string, nameDisplay?: string | null, programs: Array<{ __typename?: 'Program', id: number, name: string }> } & { ' $fragmentName'?: 'AdminTracksDegreeFragment' };

export type AdminTracksProgramFragment = { __typename?: 'Program', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminTracksProgramFragment' };

export type InsertTracksMutationVariables = Exact<{
  objects: Array<TrackInsertInput> | TrackInsertInput;
}>;


export type InsertTracksMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'TrackMutationResponse', returning: Array<{ __typename?: 'Track', id: number }> } | null };

export type UpsertTracksMutationVariables = Exact<{
  objects: Array<TrackInsertInput> | TrackInsertInput;
  onConflict?: InputMaybe<TrackOnConflict>;
}>;


export type UpsertTracksMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'TrackMutationResponse', returning: Array<{ __typename?: 'Track', id: number }> } | null };

export type UpdateTracksMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: TrackSetInput;
}>;


export type UpdateTracksMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'TrackMutationResponse', returning: Array<{ __typename?: 'Track', id: number }> } | null };

export type DeleteTracksMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteTracksMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'TrackMutationResponse', returning: Array<{ __typename?: 'Track', id: number }> } | null };

export type GetAdminRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminRolesQuery = { __typename?: 'query_root', roles: Array<(
    { __typename?: 'Role' }
    & { ' $fragmentRefs'?: { 'AdminRoleFragment': AdminRoleFragment } }
  )>, teachers: Array<(
    { __typename?: 'Teacher' }
    & { ' $fragmentRefs'?: { 'AdminRolesTeacherFragment': AdminRolesTeacherFragment } }
  )> };

export type UpdateCustomTextMutationVariables = Exact<{
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCustomTextMutation = { __typename?: 'mutation_root', insertAppSettingOne?: { __typename?: 'AppSetting', key: string } | null };

export type DeleteCustomTextMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type DeleteCustomTextMutation = { __typename?: 'mutation_root', deleteAppSettingByPk?: { __typename?: 'AppSetting', key: string } | null };

export type SetCurrentPhaseMutationVariables = Exact<{
  phase: PhaseEnum;
}>;


export type SetCurrentPhaseMutation = { __typename?: 'mutation_root', updateCurrentPhaseByPk?: { __typename?: 'CurrentPhase', value?: PhaseEnum | null } | null };

export type AdminRoleFragment = { __typename?: 'Role', id: number, type: RoleTypeEnum, comment?: string | null, teacher: { __typename?: 'Teacher', email: string } } & { ' $fragmentName'?: 'AdminRoleFragment' };

export type AdminRolesTeacherFragment = { __typename?: 'Teacher', id: number, email: string, displayname?: string | null } & { ' $fragmentName'?: 'AdminRolesTeacherFragment' };

export type InsertRolesMutationVariables = Exact<{
  objects: Array<RoleInsertInput> | RoleInsertInput;
}>;


export type InsertRolesMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'RoleMutationResponse', returning: Array<{ __typename?: 'Role', id: number }> } | null };

export type UpsertRolesMutationVariables = Exact<{
  objects: Array<RoleInsertInput> | RoleInsertInput;
  onConflict?: InputMaybe<RoleOnConflict>;
}>;


export type UpsertRolesMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'RoleMutationResponse', returning: Array<{ __typename?: 'Role', id: number }> } | null };

export type UpdateRolesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: RoleSetInput;
}>;


export type UpdateRolesMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'RoleMutationResponse', returning: Array<{ __typename?: 'Role', id: number }> } | null };

export type DeleteRolesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteRolesMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'RoleMutationResponse', returning: Array<{ __typename?: 'Role', id: number }> } | null };

export type SetCurrentYearMutationVariables = Exact<{
  value: Scalars['Int']['input'];
}>;


export type SetCurrentYearMutation = { __typename?: 'mutation_root', updateYearByPk?: { __typename?: 'Year', value: number } | null };

export type InsertYearMutationVariables = Exact<{
  value: Scalars['Int']['input'];
  visible: Scalars['Boolean']['input'];
}>;


export type InsertYearMutation = { __typename?: 'mutation_root', insertYearOne?: { __typename?: 'Year', value: number } | null };

export type UpdateYearMutationVariables = Exact<{
  value: Scalars['Int']['input'];
  changes: YearSetInput;
}>;


export type UpdateYearMutation = { __typename?: 'mutation_root', updateYearByPk?: { __typename?: 'Year', value: number } | null };

export type DeleteYearMutationVariables = Exact<{
  value: Scalars['Int']['input'];
}>;


export type DeleteYearMutation = { __typename?: 'mutation_root', deleteYearByPk?: { __typename?: 'Year', value: number } | null };

export type CreateServicesMutationVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type CreateServicesMutation = { __typename?: 'mutation_root', createYearServices: Array<{ __typename?: 'Service', id: number }> };

export type CopyCoursesMutationVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type CopyCoursesMutation = { __typename?: 'mutation_root', copyYearCourses: Array<{ __typename?: 'Course', id: number }> };

export type ComputePrioritiesMutationVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type ComputePrioritiesMutation = { __typename?: 'mutation_root', computeYearPriorities: Array<{ __typename?: 'Priority', id: number }> };

export type GetAdminRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminRequestsQuery = { __typename?: 'query_root', requests: Array<(
    { __typename?: 'Request' }
    & { ' $fragmentRefs'?: { 'AdminRequestFragment': AdminRequestFragment } }
  )>, priorities: Array<(
    { __typename?: 'Priority' }
    & { ' $fragmentRefs'?: { 'AdminPriorityFragment': AdminPriorityFragment } }
  )>, services: Array<(
    { __typename?: 'Service' }
    & { ' $fragmentRefs'?: { 'AdminRequestsServiceFragment': AdminRequestsServiceFragment;'AdminPrioritiesServiceFragment': AdminPrioritiesServiceFragment } }
  )>, teachers: Array<(
    { __typename?: 'Teacher' }
    & { ' $fragmentRefs'?: { 'AdminRequestsTeacherFragment': AdminRequestsTeacherFragment;'AdminPrioritiesTeacherFragment': AdminPrioritiesTeacherFragment } }
  )>, courses: Array<(
    { __typename?: 'Course' }
    & { ' $fragmentRefs'?: { 'AdminRequestsCourseFragment': AdminRequestsCourseFragment;'AdminPrioritiesCourseFragment': AdminPrioritiesCourseFragment } }
  )>, degrees: Array<(
    { __typename?: 'Degree' }
    & { ' $fragmentRefs'?: { 'AdminRequestsDegreeFragment': AdminRequestsDegreeFragment;'AdminPrioritiesDegreeFragment': AdminPrioritiesDegreeFragment } }
  )>, programs: Array<(
    { __typename?: 'Program' }
    & { ' $fragmentRefs'?: { 'AdminRequestsProgramFragment': AdminRequestsProgramFragment;'AdminPrioritiesProgramFragment': AdminPrioritiesProgramFragment } }
  )>, tracks: Array<(
    { __typename?: 'Track' }
    & { ' $fragmentRefs'?: { 'AdminRequestsTrackFragment': AdminRequestsTrackFragment;'AdminPrioritiesTrackFragment': AdminPrioritiesTrackFragment } }
  )>, courseTypes: Array<(
    { __typename?: 'CourseType' }
    & { ' $fragmentRefs'?: { 'AdminRequestsCourseTypeFragment': AdminRequestsCourseTypeFragment;'AdminPrioritiesCourseTypeFragment': AdminPrioritiesCourseTypeFragment } }
  )> };

export type AdminPriorityFragment = { __typename?: 'Priority', id: number, year: number, seniority?: number | null, isPriority?: boolean | null, computed: boolean, service: { __typename?: 'Service', teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } }, course: { __typename?: 'Course', name: string, nameDisplay?: string | null, semester: number, program: { __typename?: 'Program', name: string, nameDisplay?: string | null, degree: { __typename?: 'Degree', name: string, nameDisplay?: string | null } }, track?: { __typename?: 'Track', name: string, nameDisplay?: string | null } | null, type: { __typename?: 'CourseType', label: string } } } & { ' $fragmentName'?: 'AdminPriorityFragment' };

export type AdminPrioritiesServiceFragment = { __typename?: 'Service', id: number, year: number, teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } } & { ' $fragmentName'?: 'AdminPrioritiesServiceFragment' };

export type AdminPrioritiesTeacherFragment = { __typename?: 'Teacher', email: string, displayname?: string | null } & { ' $fragmentName'?: 'AdminPrioritiesTeacherFragment' };

export type AdminPrioritiesCourseFragment = { __typename?: 'Course', id: number, year: number, name: string, nameDisplay?: string | null, semester: number, program: { __typename?: 'Program', name: string, degree: { __typename?: 'Degree', name: string } }, track?: { __typename?: 'Track', name: string, program: { __typename?: 'Program', name: string, degree: { __typename?: 'Degree', name: string } } } | null, type: { __typename?: 'CourseType', label: string } } & { ' $fragmentName'?: 'AdminPrioritiesCourseFragment' };

export type AdminPrioritiesDegreeFragment = { __typename?: 'Degree', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminPrioritiesDegreeFragment' };

export type AdminPrioritiesProgramFragment = { __typename?: 'Program', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminPrioritiesProgramFragment' };

export type AdminPrioritiesTrackFragment = { __typename?: 'Track', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminPrioritiesTrackFragment' };

export type AdminPrioritiesCourseTypeFragment = { __typename?: 'CourseType', id: number, label: string } & { ' $fragmentName'?: 'AdminPrioritiesCourseTypeFragment' };

export type InsertPrioritiesMutationVariables = Exact<{
  objects: Array<PriorityInsertInput> | PriorityInsertInput;
}>;


export type InsertPrioritiesMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'PriorityMutationResponse', returning: Array<{ __typename?: 'Priority', id: number }> } | null };

export type UpsertPrioritiesMutationVariables = Exact<{
  objects: Array<PriorityInsertInput> | PriorityInsertInput;
  onConflict?: InputMaybe<PriorityOnConflict>;
}>;


export type UpsertPrioritiesMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'PriorityMutationResponse', returning: Array<{ __typename?: 'Priority', id: number }> } | null };

export type UpdatePrioritiesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: PrioritySetInput;
}>;


export type UpdatePrioritiesMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'PriorityMutationResponse', returning: Array<{ __typename?: 'Priority', id: number }> } | null };

export type DeletePrioritiesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeletePrioritiesMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'PriorityMutationResponse', returning: Array<{ __typename?: 'Priority', id: number }> } | null };

export type AdminRequestFragment = { __typename?: 'Request', id: number, year: number, type: RequestTypeEnum, hours: number, service: { __typename?: 'Service', teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } }, course: { __typename?: 'Course', name: string, nameDisplay?: string | null, semester: number, program: { __typename?: 'Program', name: string, nameDisplay?: string | null, degree: { __typename?: 'Degree', name: string, nameDisplay?: string | null } }, track?: { __typename?: 'Track', name: string, nameDisplay?: string | null } | null, type: { __typename?: 'CourseType', label: string } } } & { ' $fragmentName'?: 'AdminRequestFragment' };

export type AdminRequestsServiceFragment = { __typename?: 'Service', id: number, year: number, teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } } & { ' $fragmentName'?: 'AdminRequestsServiceFragment' };

export type AdminRequestsTeacherFragment = { __typename?: 'Teacher', email: string, displayname?: string | null } & { ' $fragmentName'?: 'AdminRequestsTeacherFragment' };

export type AdminRequestsCourseFragment = { __typename?: 'Course', id: number, year: number, name: string, nameDisplay?: string | null, semester: number, program: { __typename?: 'Program', name: string, degree: { __typename?: 'Degree', name: string } }, track?: { __typename?: 'Track', name: string, program: { __typename?: 'Program', name: string, degree: { __typename?: 'Degree', name: string } } } | null, type: { __typename?: 'CourseType', label: string } } & { ' $fragmentName'?: 'AdminRequestsCourseFragment' };

export type AdminRequestsDegreeFragment = { __typename?: 'Degree', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminRequestsDegreeFragment' };

export type AdminRequestsProgramFragment = { __typename?: 'Program', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminRequestsProgramFragment' };

export type AdminRequestsTrackFragment = { __typename?: 'Track', id: number, name: string, nameDisplay?: string | null } & { ' $fragmentName'?: 'AdminRequestsTrackFragment' };

export type AdminRequestsCourseTypeFragment = { __typename?: 'CourseType', id: number, label: string } & { ' $fragmentName'?: 'AdminRequestsCourseTypeFragment' };

export type InsertRequestsMutationVariables = Exact<{
  objects: Array<RequestInsertInput> | RequestInsertInput;
}>;


export type InsertRequestsMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'RequestMutationResponse', returning: Array<{ __typename?: 'Request', id: number }> } | null };

export type UpsertRequestsMutationVariables = Exact<{
  objects: Array<RequestInsertInput> | RequestInsertInput;
  onConflict?: InputMaybe<RequestOnConflict>;
}>;


export type UpsertRequestsMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'RequestMutationResponse', returning: Array<{ __typename?: 'Request', id: number }> } | null };

export type UpdateRequestsMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: RequestSetInput;
}>;


export type UpdateRequestsMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'RequestMutationResponse', returning: Array<{ __typename?: 'Request', id: number }> } | null };

export type DeleteRequestsMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteRequestsMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'RequestMutationResponse', returning: Array<{ __typename?: 'Request', id: number }> } | null };

export type GetAdminTeachersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminTeachersQuery = { __typename?: 'query_root', teachers: Array<(
    { __typename?: 'Teacher' }
    & { ' $fragmentRefs'?: { 'AdminTeacherFragment': AdminTeacherFragment;'AdminServicesTeacherFragment': AdminServicesTeacherFragment;'AdminServiceModificationsTeacherFragment': AdminServiceModificationsTeacherFragment;'AdminMessagesTeacherFragment': AdminMessagesTeacherFragment } }
  )>, positions: Array<(
    { __typename?: 'Position' }
    & { ' $fragmentRefs'?: { 'AdminPositionFragment': AdminPositionFragment;'AdminTeachersPositionFragment': AdminTeachersPositionFragment } }
  )>, services: Array<(
    { __typename?: 'Service' }
    & { ' $fragmentRefs'?: { 'AdminServiceFragment': AdminServiceFragment;'AdminServiceModificationsServiceFragment': AdminServiceModificationsServiceFragment;'AdminMessagesServiceFragment': AdminMessagesServiceFragment } }
  )>, serviceModifications: Array<(
    { __typename?: 'ServiceModification' }
    & { ' $fragmentRefs'?: { 'AdminServiceModificationFragment': AdminServiceModificationFragment } }
  )>, serviceModificationTypes: Array<(
    { __typename?: 'ServiceModificationType' }
    & { ' $fragmentRefs'?: { 'AdminServiceModificationTypeFragment': AdminServiceModificationTypeFragment;'AdminServiceModificationsServiceModificationTypeFragment': AdminServiceModificationsServiceModificationTypeFragment } }
  )>, messages: Array<(
    { __typename?: 'Message' }
    & { ' $fragmentRefs'?: { 'AdminMessageFragment': AdminMessageFragment } }
  )> };

export type AdminMessageFragment = { __typename?: 'Message', id: number, content: string, service: { __typename?: 'Service', year: number, teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } } } & { ' $fragmentName'?: 'AdminMessageFragment' };

export type AdminMessagesServiceFragment = { __typename?: 'Service', id: number, year: number, teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } } & { ' $fragmentName'?: 'AdminMessagesServiceFragment' };

export type AdminMessagesTeacherFragment = { __typename?: 'Teacher', email: string, displayname?: string | null } & { ' $fragmentName'?: 'AdminMessagesTeacherFragment' };

export type InsertMessagesMutationVariables = Exact<{
  objects: Array<MessageInsertInput> | MessageInsertInput;
}>;


export type InsertMessagesMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'MessageMutationResponse', returning: Array<{ __typename?: 'Message', id: number }> } | null };

export type UpsertMessagesMutationVariables = Exact<{
  objects: Array<MessageInsertInput> | MessageInsertInput;
  onConflict?: InputMaybe<MessageOnConflict>;
}>;


export type UpsertMessagesMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'MessageMutationResponse', returning: Array<{ __typename?: 'Message', id: number }> } | null };

export type UpdateMessagesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: MessageSetInput;
}>;


export type UpdateMessagesMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'MessageMutationResponse', returning: Array<{ __typename?: 'Message', id: number }> } | null };

export type DeleteMessagesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteMessagesMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'MessageMutationResponse', returning: Array<{ __typename?: 'Message', id: number }> } | null };

export type AdminPositionFragment = { __typename?: 'Position', id: number, label: string, description?: string | null, baseServiceHours?: number | null } & { ' $fragmentName'?: 'AdminPositionFragment' };

export type InsertPositionsMutationVariables = Exact<{
  objects: Array<PositionInsertInput> | PositionInsertInput;
}>;


export type InsertPositionsMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'PositionMutationResponse', returning: Array<{ __typename?: 'Position', id: number }> } | null };

export type UpsertPositionsMutationVariables = Exact<{
  objects: Array<PositionInsertInput> | PositionInsertInput;
  onConflict: PositionOnConflict;
}>;


export type UpsertPositionsMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'PositionMutationResponse', returning: Array<{ __typename?: 'Position', id: number }> } | null };

export type UpdatePositionsMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: PositionSetInput;
}>;


export type UpdatePositionsMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'PositionMutationResponse', returning: Array<{ __typename?: 'Position', id: number }> } | null };

export type DeletePositionsMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeletePositionsMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'PositionMutationResponse', returning: Array<{ __typename?: 'Position', id: number }> } | null };

export type AdminServiceModificationTypeFragment = { __typename?: 'ServiceModificationType', id: number, label: string, description?: string | null } & { ' $fragmentName'?: 'AdminServiceModificationTypeFragment' };

export type InsertServiceModificationTypesMutationVariables = Exact<{
  objects: Array<ServiceModificationTypeInsertInput> | ServiceModificationTypeInsertInput;
}>;


export type InsertServiceModificationTypesMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'ServiceModificationTypeMutationResponse', returning: Array<{ __typename?: 'ServiceModificationType', id: number }> } | null };

export type UpsertServiceModificationTypesMutationVariables = Exact<{
  objects: Array<ServiceModificationTypeInsertInput> | ServiceModificationTypeInsertInput;
  onConflict?: InputMaybe<ServiceModificationTypeOnConflict>;
}>;


export type UpsertServiceModificationTypesMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'ServiceModificationTypeMutationResponse', returning: Array<{ __typename?: 'ServiceModificationType', id: number }> } | null };

export type UpdateServiceModificationTypesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: ServiceModificationTypeSetInput;
}>;


export type UpdateServiceModificationTypesMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'ServiceModificationTypeMutationResponse', returning: Array<{ __typename?: 'ServiceModificationType', id: number }> } | null };

export type DeleteServiceModificationTypesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteServiceModificationTypesMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'ServiceModificationTypeMutationResponse', returning: Array<{ __typename?: 'ServiceModificationType', id: number }> } | null };

export type AdminServiceModificationFragment = { __typename?: 'ServiceModification', id: number, hours: number, service: { __typename?: 'Service', year: number, teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } }, type: { __typename?: 'ServiceModificationType', label: string } } & { ' $fragmentName'?: 'AdminServiceModificationFragment' };

export type AdminServiceModificationsServiceModificationTypeFragment = { __typename?: 'ServiceModificationType', id: number, label: string } & { ' $fragmentName'?: 'AdminServiceModificationsServiceModificationTypeFragment' };

export type AdminServiceModificationsServiceFragment = { __typename?: 'Service', id: number, year: number, teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } } & { ' $fragmentName'?: 'AdminServiceModificationsServiceFragment' };

export type AdminServiceModificationsTeacherFragment = { __typename?: 'Teacher', email: string, displayname?: string | null } & { ' $fragmentName'?: 'AdminServiceModificationsTeacherFragment' };

export type InsertServiceModificationsMutationVariables = Exact<{
  objects: Array<ServiceModificationInsertInput> | ServiceModificationInsertInput;
}>;


export type InsertServiceModificationsMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'ServiceModificationMutationResponse', returning: Array<{ __typename?: 'ServiceModification', id: number }> } | null };

export type UpsertServiceModificationsMutationVariables = Exact<{
  objects: Array<ServiceModificationInsertInput> | ServiceModificationInsertInput;
  onConflict?: InputMaybe<ServiceModificationOnConflict>;
}>;


export type UpsertServiceModificationsMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'ServiceModificationMutationResponse', returning: Array<{ __typename?: 'ServiceModification', id: number }> } | null };

export type UpdateServiceModificationsMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: ServiceModificationSetInput;
}>;


export type UpdateServiceModificationsMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'ServiceModificationMutationResponse', returning: Array<{ __typename?: 'ServiceModification', id: number }> } | null };

export type DeleteServiceModificationsMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteServiceModificationsMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'ServiceModificationMutationResponse', returning: Array<{ __typename?: 'ServiceModification', id: number }> } | null };

export type AdminServiceFragment = { __typename?: 'Service', id: number, year: number, hours: number, teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } } & { ' $fragmentName'?: 'AdminServiceFragment' };

export type AdminServicesTeacherFragment = { __typename?: 'Teacher', id: number, email: string, displayname?: string | null } & { ' $fragmentName'?: 'AdminServicesTeacherFragment' };

export type InsertServicesMutationVariables = Exact<{
  objects: Array<ServiceInsertInput> | ServiceInsertInput;
}>;


export type InsertServicesMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'ServiceMutationResponse', returning: Array<{ __typename?: 'Service', id: number }> } | null };

export type UpsertServicesMutationVariables = Exact<{
  objects: Array<ServiceInsertInput> | ServiceInsertInput;
  onConflict?: InputMaybe<ServiceOnConflict>;
}>;


export type UpsertServicesMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'ServiceMutationResponse', returning: Array<{ __typename?: 'Service', id: number }> } | null };

export type UpdateServicesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: ServiceSetInput;
}>;


export type UpdateServicesMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'ServiceMutationResponse', returning: Array<{ __typename?: 'Service', id: number }> } | null };

export type DeleteServicesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteServicesMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'ServiceMutationResponse', returning: Array<{ __typename?: 'Service', id: number }> } | null };

export type AdminTeacherFragment = { __typename?: 'Teacher', id: number, email: string, firstname: string, lastname: string, alias?: string | null, baseServiceHours?: number | null, visible: boolean, active: boolean, position?: { __typename?: 'Position', label: string } | null } & { ' $fragmentName'?: 'AdminTeacherFragment' };

export type AdminTeachersPositionFragment = { __typename?: 'Position', id: number, label: string } & { ' $fragmentName'?: 'AdminTeachersPositionFragment' };

export type InsertTeachersMutationVariables = Exact<{
  objects: Array<TeacherInsertInput> | TeacherInsertInput;
}>;


export type InsertTeachersMutation = { __typename?: 'mutation_root', insertData?: { __typename?: 'TeacherMutationResponse', returning: Array<{ __typename?: 'Teacher', id: number }> } | null };

export type UpsertTeachersMutationVariables = Exact<{
  objects: Array<TeacherInsertInput> | TeacherInsertInput;
  onConflict?: InputMaybe<TeacherOnConflict>;
}>;


export type UpsertTeachersMutation = { __typename?: 'mutation_root', upsertData?: { __typename?: 'TeacherMutationResponse', returning: Array<{ __typename?: 'Teacher', id: number }> } | null };

export type UpdateTeachersMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  changes: TeacherSetInput;
}>;


export type UpdateTeachersMutation = { __typename?: 'mutation_root', updateData?: { __typename?: 'TeacherMutationResponse', returning: Array<{ __typename?: 'Teacher', id: number }> } | null };

export type DeleteTeachersMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteTeachersMutation = { __typename?: 'mutation_root', deleteData?: { __typename?: 'TeacherMutationResponse', returning: Array<{ __typename?: 'Teacher', id: number }> } | null };

export type CoordinationDataFragment = { __typename?: 'Coordination', id: number, comment?: string | null, teacher: { __typename?: 'Teacher', email: string, displayname?: string | null } } & { ' $fragmentName'?: 'CoordinationDataFragment' };

export type PriorityChipDataFragment = { __typename?: 'Priority', id: number, seniority?: number | null, isPriority?: boolean | null, computed: boolean, service: { __typename?: 'Service', teacher: { __typename?: 'Teacher', displayname?: string | null } } } & { ' $fragmentName'?: 'PriorityChipDataFragment' };

export type DeletePriorityMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePriorityMutation = { __typename?: 'mutation_root', deletePriorityByPk?: { __typename?: 'Priority', id: number } | null };

export type DeleteComputedPriorityMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteComputedPriorityMutation = { __typename?: 'mutation_root', updatePriorityByPk?: { __typename?: 'Priority', id: number } | null };

export type PriorityFormDataFragment = { __typename?: 'Course', year: number, courseId: number } & { ' $fragmentName'?: 'PriorityFormDataFragment' };

export type UpsertPriorityMutationVariables = Exact<{
  year: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
  courseId: Scalars['Int']['input'];
  seniority?: InputMaybe<Scalars['Int']['input']>;
  isPriority?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpsertPriorityMutation = { __typename?: 'mutation_root', insertPriorityOne?: { __typename?: 'Priority', id: number } | null };

export type RequestCardDataFragment = { __typename?: 'Request', id: number, year: number, type: RequestTypeEnum, hours: number, isPriority?: boolean | null, service: { __typename?: 'Service', id: number, teacher: { __typename?: 'Teacher', displayname?: string | null } }, course: { __typename?: 'Course', id: number, hoursPerGroup?: number | null } } & { ' $fragmentName'?: 'RequestCardDataFragment' };

export type GetAssignmentQueryVariables = Exact<{
  serviceId: Scalars['Int']['input'];
  courseId: Scalars['Int']['input'];
}>;


export type GetAssignmentQuery = { __typename?: 'query_root', requests: Array<{ __typename?: 'Request', id: number, hours: number }> };

export type InsertAssignmentMutationVariables = Exact<{
  year: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
  courseId: Scalars['Int']['input'];
  hours: Scalars['Float']['input'];
}>;


export type InsertAssignmentMutation = { __typename?: 'mutation_root', insertRequestOne?: { __typename?: 'Request', id: number } | null };

export type UpdateAssignmentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  hours: Scalars['Float']['input'];
}>;


export type UpdateAssignmentMutation = { __typename?: 'mutation_root', updateRequestByPk?: { __typename?: 'Request', id: number } | null };

export type DeleteRequestCardMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRequestCardMutation = { __typename?: 'mutation_root', deleteRequestByPk?: { __typename?: 'Request', id: number } | null };

export type RequestFormDataFragment = { __typename?: 'Course', year: number, courseId: number, hoursPerGroup?: number | null } & { ' $fragmentName'?: 'RequestFormDataFragment' };

export type UpsertRequestMutationVariables = Exact<{
  year: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
  courseId: Scalars['Int']['input'];
  requestType: RequestTypeEnum;
  hours: Scalars['Float']['input'];
}>;


export type UpsertRequestMutation = { __typename?: 'mutation_root', insertRequestOne?: { __typename?: 'Request', id: number } | null };

export type DeleteRequestMutationVariables = Exact<{
  serviceId: Scalars['Int']['input'];
  courseId: Scalars['Int']['input'];
  requestType: RequestTypeEnum;
}>;


export type DeleteRequestMutation = { __typename?: 'mutation_root', deleteRequest?: { __typename?: 'RequestMutationResponse', returning: Array<{ __typename?: 'Request', id: number }> } | null };

export type GetServicesQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetServicesQuery = { __typename?: 'query_root', services: Array<{ __typename?: 'Service', id: number, teacher: { __typename?: 'Teacher', displayname?: string | null } }> };

export type CourseArchivesDataFragment = { __typename?: 'Course', year: number, programId: number, trackId?: number | null, name: string, semester: number, typeId: number } & { ' $fragmentName'?: 'CourseArchivesDataFragment' };

export type GetCourseArchivesQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  programId: Scalars['Int']['input'];
  trackIdComp?: InputMaybe<IntComparisonExp>;
  name: Scalars['String']['input'];
  semester: Scalars['Int']['input'];
  typeId: Scalars['Int']['input'];
}>;


export type GetCourseArchivesQuery = { __typename?: 'query_root', courses: Array<{ __typename?: 'Course', year: number, requests: Array<(
      { __typename?: 'Request', id: number }
      & { ' $fragmentRefs'?: { 'RequestCardDataFragment': RequestCardDataFragment } }
    )> }> };

export type CourseCoordinatorsFragment = { __typename?: 'Course', coordinations: Array<(
    { __typename?: 'Coordination' }
    & { ' $fragmentRefs'?: { 'CoordinationDataFragment': CoordinationDataFragment } }
  )>, program: { __typename?: 'Program', coordinations: Array<(
      { __typename?: 'Coordination' }
      & { ' $fragmentRefs'?: { 'CoordinationDataFragment': CoordinationDataFragment } }
    )> }, track?: { __typename?: 'Track', coordinations: Array<(
      { __typename?: 'Coordination' }
      & { ' $fragmentRefs'?: { 'CoordinationDataFragment': CoordinationDataFragment } }
    )> } | null } & { ' $fragmentName'?: 'CourseCoordinatorsFragment' };

export type CourseDescriptionFragment = { __typename?: 'Course', description?: string | null, courseId: number, coordinations: Array<{ __typename?: 'Coordination', teacherId: number }>, program: { __typename?: 'Program', coordinations: Array<{ __typename?: 'Coordination', teacherId: number }> }, track?: { __typename?: 'Track', coordinations: Array<{ __typename?: 'Coordination', teacherId: number }> } | null } & { ' $fragmentName'?: 'CourseDescriptionFragment' };

export type UpdateDescriptionMutationVariables = Exact<{
  courseId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateDescriptionMutation = { __typename?: 'mutation_root', updateCourseByPk?: { __typename?: 'Course', id: number } | null };

export type CourseDetailsFragment = (
  { __typename?: 'Course', courseId: number }
  & { ' $fragmentRefs'?: { 'CourseExpansionFragment': CourseExpansionFragment;'CourseCoordinatorsFragment': CourseCoordinatorsFragment;'CourseDescriptionFragment': CourseDescriptionFragment;'CourseRequestsFragment': CourseRequestsFragment;'CoursePrioritiesFragment': CoursePrioritiesFragment;'CourseArchivesDataFragment': CourseArchivesDataFragment } }
) & { ' $fragmentName'?: 'CourseDetailsFragment' };

export type CourseExpansionFragment = { __typename?: 'Course', name: string, semester: number, program: { __typename?: 'Program', name: string, degree: { __typename?: 'Degree', name: string } }, track?: { __typename?: 'Track', name: string } | null, courseType: { __typename?: 'CourseType', label: string } } & { ' $fragmentName'?: 'CourseExpansionFragment' };

export type CoursePrioritiesFragment = (
  { __typename?: 'Course', priorities: Array<(
    { __typename?: 'Priority', id: number, isPriority?: boolean | null }
    & { ' $fragmentRefs'?: { 'PriorityChipDataFragment': PriorityChipDataFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'PriorityFormDataFragment': PriorityFormDataFragment } }
) & { ' $fragmentName'?: 'CoursePrioritiesFragment' };

export type CourseRequestsFragment = (
  { __typename?: 'Course', requests: Array<(
    { __typename?: 'Request', id: number, type: RequestTypeEnum }
    & { ' $fragmentRefs'?: { 'RequestCardDataFragment': RequestCardDataFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'RequestFormDataFragment': RequestFormDataFragment } }
) & { ' $fragmentName'?: 'CourseRequestsFragment' };

export type ServiceDetailsFragment = { __typename?: 'Service', id: number, year: number, teacherId: number, hours: number, modifications: Array<{ __typename?: 'ServiceModification', id: number, hours: number, modificationType: { __typename?: 'ServiceModificationType', label: string } }> } & { ' $fragmentName'?: 'ServiceDetailsFragment' };

export type UpdateServiceMutationVariables = Exact<{
  year: Scalars['Int']['input'];
  teacherId: Scalars['Int']['input'];
  hours: Scalars['Float']['input'];
}>;


export type UpdateServiceMutation = { __typename?: 'mutation_root', updateService?: { __typename?: 'ServiceMutationResponse', returning: Array<{ __typename?: 'Service', id: number }> } | null };

export type GetModificationTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModificationTypesQuery = { __typename?: 'query_root', modificationTypes: Array<{ __typename?: 'ServiceModificationType', id: number, label: string, description?: string | null }> };

export type InsertModificationMutationVariables = Exact<{
  serviceId: Scalars['Int']['input'];
  modificationTypeId: Scalars['Int']['input'];
  hours: Scalars['Float']['input'];
}>;


export type InsertModificationMutation = { __typename?: 'mutation_root', insertServiceModificationOne?: { __typename?: 'ServiceModification', id: number } | null };

export type DeleteModificationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteModificationMutation = { __typename?: 'mutation_root', deleteServiceModificationByPk?: { __typename?: 'ServiceModification', id: number } | null };

export type ServiceMessageFragment = { __typename?: 'Service', id: number, year: number, teacherId: number, message?: { __typename?: 'Message', id: number, content: string } | null } & { ' $fragmentName'?: 'ServiceMessageFragment' };

export type UpsertMessageMutationVariables = Exact<{
  serviceId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}>;


export type UpsertMessageMutation = { __typename?: 'mutation_root', insertMessageOne?: { __typename?: 'Message', id: number } | null };

export type DeleteMessageMutationVariables = Exact<{
  serviceId: Scalars['Int']['input'];
}>;


export type DeleteMessageMutation = { __typename?: 'mutation_root', deleteMessage?: { __typename?: 'MessageMutationResponse', returning: Array<{ __typename?: 'Message', id: number }> } | null };

export type ServicePrioritiesFragment = { __typename?: 'Service', priorities: Array<{ __typename?: 'Priority', id: number, seniority?: number | null, isPriority?: boolean | null, course: { __typename?: 'Course', semester: number, name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } }, track?: { __typename?: 'Track', name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } } } | null, type: { __typename?: 'CourseType', label: string } } }> } & { ' $fragmentName'?: 'ServicePrioritiesFragment' };

export type ServiceRequestsFragment = { __typename?: 'Service', assignment: Array<{ __typename?: 'Request', id: number, hoursWeighted?: number | null }>, primary: Array<{ __typename?: 'Request', id: number, hoursWeighted?: number | null }>, secondary: Array<{ __typename?: 'Request', id: number, hoursWeighted?: number | null }> } & { ' $fragmentName'?: 'ServiceRequestsFragment' };

export type ServiceTeacherFragment = (
  { __typename?: 'Teacher', coordinationIds: Array<{ __typename?: 'Coordination', id: number }> }
  & { ' $fragmentRefs'?: { 'TeacherTitleFragment': TeacherTitleFragment;'TeacherCoordinationsFragment': TeacherCoordinationsFragment } }
) & { ' $fragmentName'?: 'ServiceTeacherFragment' };

export type TeacherCoordinationsFragment = { __typename?: 'Teacher', coordinations: Array<{ __typename?: 'Coordination', id: number, comment?: string | null, program?: { __typename?: 'Program', id: number, name?: string | null, degree: { __typename?: 'Degree', name?: string | null } } | null, track?: { __typename?: 'Track', id: number, name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } } } | null, course?: { __typename?: 'Course', id: number, year: number, name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } }, track?: { __typename?: 'Track', name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } } } | null } | null }> } & { ' $fragmentName'?: 'TeacherCoordinationsFragment' };

export type TeacherTitleFragment = { __typename?: 'Teacher', displayname?: string | null, position?: { __typename?: 'Position', label: string } | null } & { ' $fragmentName'?: 'TeacherTitleFragment' };

export type GetAssignmentsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  where?: InputMaybe<RequestBoolExp>;
}>;


export type GetAssignmentsQuery = { __typename?: 'query_root', assignments: Array<{ __typename?: 'Request', course: { __typename?: 'Course', semester: number, name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } }, track?: { __typename?: 'Track', name?: string | null, program: { __typename?: 'Program', name?: string | null, degree: { __typename?: 'Degree', name?: string | null } } } | null, type: { __typename?: 'CourseType', label: string } }, service: { __typename?: 'Service', teacher: { __typename?: 'Teacher', displayname?: string | null, email: string } } }> };

export type DummyMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type DummyMutationMutation = { __typename?: 'mutation_root', dummyFunction: Array<{ __typename: 'AppSetting' }> };

export type GetCourseRowsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetCourseRowsQuery = { __typename?: 'query_root', courses: Array<(
    { __typename?: 'Course' }
    & { ' $fragmentRefs'?: { 'CourseRowFragment': CourseRowFragment } }
  )> };

export type GetServiceRowsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetServiceRowsQuery = { __typename?: 'query_root', services: Array<(
    { __typename?: 'Service' }
    & { ' $fragmentRefs'?: { 'ServiceRowFragment': ServiceRowFragment;'TableCoursesServiceFragment': TableCoursesServiceFragment } }
  )> };

export type GetCourseDetailsQueryVariables = Exact<{
  courseId: Scalars['Int']['input'];
}>;


export type GetCourseDetailsQuery = { __typename?: 'query_root', course?: (
    { __typename?: 'Course' }
    & { ' $fragmentRefs'?: { 'CourseDetailsFragment': CourseDetailsFragment } }
  ) | null };

export type GetServiceDetailsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetServiceDetailsQuery = { __typename?: 'query_root', service?: (
    { __typename?: 'Service', teacher: (
      { __typename?: 'Teacher' }
      & { ' $fragmentRefs'?: { 'ServiceTeacherFragment': ServiceTeacherFragment } }
    ) }
    & { ' $fragmentRefs'?: { 'ServiceDetailsFragment': ServiceDetailsFragment;'ServiceRequestsFragment': ServiceRequestsFragment;'ServicePrioritiesFragment': ServicePrioritiesFragment;'ServiceMessageFragment': ServiceMessageFragment } }
  ) | null };

export const CourseRowFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseRow"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"coefficient"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}},{"kind":"Field","alias":{"kind":"Name","value":"numberOfGroups"},"name":{"kind":"Name","value":"groupsEffective"}},{"kind":"Field","name":{"kind":"Name","value":"requests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}}]}}]} as unknown as DocumentNode<CourseRowFragment, unknown>;
export const TableCoursesServiceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TableCoursesService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]} as unknown as DocumentNode<TableCoursesServiceFragment, unknown>;
export const ServiceRowFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceRow"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"modifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<ServiceRowFragment, unknown>;
export const AdminCourseTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCourseType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"coefficient"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<AdminCourseTypeFragment, unknown>;
export const AdminCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"hoursAdjusted"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}},{"kind":"Field","name":{"kind":"Name","value":"groupsAdjusted"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priorityRule"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}}]} as unknown as DocumentNode<AdminCourseFragment, unknown>;
export const AdminCoursesDegreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCoursesDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AdminCoursesDegreeFragment, unknown>;
export const AdminCoursesProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCoursesProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminCoursesProgramFragment, unknown>;
export const AdminCoursesTrackFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCoursesTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminCoursesTrackFragment, unknown>;
export const AdminCoursesCourseTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCoursesCourseType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<AdminCoursesCourseTypeFragment, unknown>;
export const AdminDegreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}}]} as unknown as DocumentNode<AdminDegreeFragment, unknown>;
export const AdminProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}}]} as unknown as DocumentNode<AdminProgramFragment, unknown>;
export const AdminProgramsDegreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminProgramsDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminProgramsDegreeFragment, unknown>;
export const AdminTrackFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}}]} as unknown as DocumentNode<AdminTrackFragment, unknown>;
export const AdminTracksDegreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTracksDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AdminTracksDegreeFragment, unknown>;
export const AdminTracksProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTracksProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminTracksProgramFragment, unknown>;
export const AdminRoleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRole"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]} as unknown as DocumentNode<AdminRoleFragment, unknown>;
export const AdminRolesTeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRolesTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]} as unknown as DocumentNode<AdminRolesTeacherFragment, unknown>;
export const AdminPriorityFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPriority"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Priority"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seniority"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"Field","name":{"kind":"Name","value":"computed"}}]}}]} as unknown as DocumentNode<AdminPriorityFragment, unknown>;
export const AdminPrioritiesServiceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]} as unknown as DocumentNode<AdminPrioritiesServiceFragment, unknown>;
export const AdminPrioritiesTeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]} as unknown as DocumentNode<AdminPrioritiesTeacherFragment, unknown>;
export const AdminPrioritiesCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<AdminPrioritiesCourseFragment, unknown>;
export const AdminPrioritiesDegreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminPrioritiesDegreeFragment, unknown>;
export const AdminPrioritiesProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminPrioritiesProgramFragment, unknown>;
export const AdminPrioritiesTrackFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminPrioritiesTrackFragment, unknown>;
export const AdminPrioritiesCourseTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesCourseType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<AdminPrioritiesCourseTypeFragment, unknown>;
export const AdminRequestFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Request"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}}]} as unknown as DocumentNode<AdminRequestFragment, unknown>;
export const AdminRequestsServiceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]} as unknown as DocumentNode<AdminRequestsServiceFragment, unknown>;
export const AdminRequestsTeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]} as unknown as DocumentNode<AdminRequestsTeacherFragment, unknown>;
export const AdminRequestsCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<AdminRequestsCourseFragment, unknown>;
export const AdminRequestsDegreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminRequestsDegreeFragment, unknown>;
export const AdminRequestsProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminRequestsProgramFragment, unknown>;
export const AdminRequestsTrackFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]} as unknown as DocumentNode<AdminRequestsTrackFragment, unknown>;
export const AdminRequestsCourseTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsCourseType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<AdminRequestsCourseTypeFragment, unknown>;
export const AdminMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]} as unknown as DocumentNode<AdminMessageFragment, unknown>;
export const AdminMessagesServiceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminMessagesService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]} as unknown as DocumentNode<AdminMessagesServiceFragment, unknown>;
export const AdminMessagesTeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminMessagesTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]} as unknown as DocumentNode<AdminMessagesTeacherFragment, unknown>;
export const AdminPositionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPosition"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"baseServiceHours"}}]}}]} as unknown as DocumentNode<AdminPositionFragment, unknown>;
export const AdminServiceModificationTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModificationType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<AdminServiceModificationTypeFragment, unknown>;
export const AdminServiceModificationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModification"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}}]} as unknown as DocumentNode<AdminServiceModificationFragment, unknown>;
export const AdminServiceModificationsServiceModificationTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModificationsServiceModificationType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<AdminServiceModificationsServiceModificationTypeFragment, unknown>;
export const AdminServiceModificationsServiceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModificationsService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]} as unknown as DocumentNode<AdminServiceModificationsServiceFragment, unknown>;
export const AdminServiceModificationsTeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModificationsTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]} as unknown as DocumentNode<AdminServiceModificationsTeacherFragment, unknown>;
export const AdminServiceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}}]} as unknown as DocumentNode<AdminServiceFragment, unknown>;
export const AdminServicesTeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServicesTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]} as unknown as DocumentNode<AdminServicesTeacherFragment, unknown>;
export const AdminTeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"baseServiceHours"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode<AdminTeacherFragment, unknown>;
export const AdminTeachersPositionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTeachersPosition"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<AdminTeachersPositionFragment, unknown>;
export const CourseExpansionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseExpansion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","alias":{"kind":"Name","value":"courseType"},"name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<CourseExpansionFragment, unknown>;
export const CoordinationDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoordinationData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coordination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]} as unknown as DocumentNode<CoordinationDataFragment, unknown>;
export const CourseCoordinatorsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseCoordinators"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoordinationData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coordination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]} as unknown as DocumentNode<CourseCoordinatorsFragment, unknown>;
export const CourseDescriptionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseDescription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}}]}}]}}]} as unknown as DocumentNode<CourseDescriptionFragment, unknown>;
export const RequestFormDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestFormData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}}]} as unknown as DocumentNode<RequestFormDataFragment, unknown>;
export const RequestCardDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestCardData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Request"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}}]} as unknown as DocumentNode<RequestCardDataFragment, unknown>;
export const CourseRequestsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseRequests"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RequestFormData"}},{"kind":"Field","name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RequestCardData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestFormData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestCardData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Request"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}}]} as unknown as DocumentNode<CourseRequestsFragment, unknown>;
export const PriorityFormDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriorityFormData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<PriorityFormDataFragment, unknown>;
export const PriorityChipDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriorityChipData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Priority"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seniority"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"Field","name":{"kind":"Name","value":"computed"}}]}}]} as unknown as DocumentNode<PriorityChipDataFragment, unknown>;
export const CoursePrioritiesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoursePriorities"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriorityFormData"}},{"kind":"Field","name":{"kind":"Name","value":"priorities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriorityChipData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriorityFormData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriorityChipData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Priority"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seniority"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"Field","name":{"kind":"Name","value":"computed"}}]}}]} as unknown as DocumentNode<CoursePrioritiesFragment, unknown>;
export const CourseArchivesDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseArchivesData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}}]} as unknown as DocumentNode<CourseArchivesDataFragment, unknown>;
export const CourseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseExpansion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseCoordinators"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseDescription"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseRequests"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoursePriorities"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseArchivesData"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoordinationData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coordination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestFormData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestCardData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Request"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriorityFormData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriorityChipData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Priority"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seniority"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"Field","name":{"kind":"Name","value":"computed"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseExpansion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","alias":{"kind":"Name","value":"courseType"},"name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseCoordinators"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseDescription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseRequests"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RequestFormData"}},{"kind":"Field","name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RequestCardData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoursePriorities"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriorityFormData"}},{"kind":"Field","name":{"kind":"Name","value":"priorities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriorityChipData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseArchivesData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}}]} as unknown as DocumentNode<CourseDetailsFragment, unknown>;
export const ServiceDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacherId"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"modifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"modificationType"},"name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}}]}}]} as unknown as DocumentNode<ServiceDetailsFragment, unknown>;
export const ServiceMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacherId"}},{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<ServiceMessageFragment, unknown>;
export const ServicePrioritiesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServicePriorities"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priorities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isPriority"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_isNull"},"value":{"kind":"BooleanValue","value":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"programId"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"trackId"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seniority"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}}]}}]} as unknown as DocumentNode<ServicePrioritiesFragment, unknown>;
export const ServiceRequestsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceRequests"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"assignment"},"name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"ASSIGNMENT"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"primary"},"name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"PRIMARY"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"secondary"},"name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"SECONDARY"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}}]}}]} as unknown as DocumentNode<ServiceRequestsFragment, unknown>;
export const TeacherTitleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherTitle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<TeacherTitleFragment, unknown>;
export const TeacherCoordinationsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherCoordinations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"programId"},"value":{"kind":"EnumValue","value":"ASC_NULLS_LAST"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"trackId"},"value":{"kind":"EnumValue","value":"ASC_NULLS_LAST"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"courseId"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<TeacherCoordinationsFragment, unknown>;
export const ServiceTeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeacherTitle"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeacherCoordinations"}},{"kind":"Field","alias":{"kind":"Name","value":"coordinationIds"},"name":{"kind":"Name","value":"coordinations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherTitle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherCoordinations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"programId"},"value":{"kind":"EnumValue","value":"ASC_NULLS_LAST"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"trackId"},"value":{"kind":"EnumValue","value":"ASC_NULLS_LAST"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"courseId"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<ServiceTeacherFragment, unknown>;
export const GetAppDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"currentPhase"},"name":{"kind":"Name","value":"currentPhaseByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"years"},"name":{"kind":"Name","value":"year"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"EnumValue","value":"DESC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"customTexts"},"name":{"kind":"Name","value":"appSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"profile"},"name":{"kind":"Name","value":"teacherByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}},{"kind":"Field","name":{"kind":"Name","value":"services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<GetAppDataQuery, GetAppDataQueryVariables>;
export const GetAdminCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdminCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"degrees"},"name":{"kind":"Name","value":"degree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminDegree"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminProgramsDegree"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTracksDegree"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminCoursesDegree"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"programs"},"name":{"kind":"Name","value":"program"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminProgram"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTracksProgram"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminCoursesProgram"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"tracks"},"name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTrack"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminCoursesTrack"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"courses"},"name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"track"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminCourse"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"types"},"name":{"kind":"Name","value":"courseType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminCourseType"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminCoursesCourseType"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminProgramsDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTracksDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCoursesDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTracksProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCoursesProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCoursesTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"hoursAdjusted"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}},{"kind":"Field","name":{"kind":"Name","value":"groupsAdjusted"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priorityRule"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCourseType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"coefficient"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminCoursesCourseType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<GetAdminCoursesQuery, GetAdminCoursesQueryVariables>;
export const InsertCourseTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertCourseTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseTypeInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertCourseType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertCourseTypesMutation, InsertCourseTypesMutationVariables>;
export const UpsertCourseTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertCourseTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseTypeInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseTypeOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertCourseType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertCourseTypesMutation, UpsertCourseTypesMutationVariables>;
export const UpdateCourseTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourseTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseTypeSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateCourseType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCourseTypesMutation, UpdateCourseTypesMutationVariables>;
export const DeleteCourseTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourseTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteCourseType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCourseTypesMutation, DeleteCourseTypesMutationVariables>;
export const InsertCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertCoursesMutation, InsertCoursesMutationVariables>;
export const UpsertCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertCoursesMutation, UpsertCoursesMutationVariables>;
export const UpdateCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCoursesMutation, UpdateCoursesMutationVariables>;
export const DeleteCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCoursesMutation, DeleteCoursesMutationVariables>;
export const InsertDegreesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertDegrees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DegreeInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertDegree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertDegreesMutation, InsertDegreesMutationVariables>;
export const UpsertDegreesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertDegrees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DegreeInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DegreeOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertDegree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertDegreesMutation, UpsertDegreesMutationVariables>;
export const UpdateDegreesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDegrees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DegreeSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateDegree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateDegreesMutation, UpdateDegreesMutationVariables>;
export const DeleteDegreesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDegrees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteDegree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteDegreesMutation, DeleteDegreesMutationVariables>;
export const InsertProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertPrograms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertProgramsMutation, InsertProgramsMutationVariables>;
export const UpsertProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertPrograms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertProgramsMutation, UpsertProgramsMutationVariables>;
export const UpdateProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePrograms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProgramsMutation, UpdateProgramsMutationVariables>;
export const DeleteProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePrograms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteProgramsMutation, DeleteProgramsMutationVariables>;
export const InsertTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertTracksMutation, InsertTracksMutationVariables>;
export const UpsertTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertTracksMutation, UpsertTracksMutationVariables>;
export const UpdateTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTracksMutation, UpdateTracksMutationVariables>;
export const DeleteTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTracksMutation, DeleteTracksMutationVariables>;
export const GetAdminRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdminRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"roles"},"name":{"kind":"Name","value":"role"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRole"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"teachers"},"name":{"kind":"Name","value":"teacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRolesTeacher"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRole"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRolesTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]} as unknown as DocumentNode<GetAdminRolesQuery, GetAdminRolesQueryVariables>;
export const UpdateCustomTextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCustomText"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertAppSettingOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"app_setting_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"updateColumns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"value"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]} as unknown as DocumentNode<UpdateCustomTextMutation, UpdateCustomTextMutationVariables>;
export const DeleteCustomTextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCustomText"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAppSettingByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]} as unknown as DocumentNode<DeleteCustomTextMutation, DeleteCustomTextMutationVariables>;
export const SetCurrentPhaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCurrentPhase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phase"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PhaseEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentPhaseByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phase"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SetCurrentPhaseMutation, SetCurrentPhaseMutationVariables>;
export const InsertRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertRolesMutation, InsertRolesMutationVariables>;
export const UpsertRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertRolesMutation, UpsertRolesMutationVariables>;
export const UpdateRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRolesMutation, UpdateRolesMutationVariables>;
export const DeleteRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteRolesMutation, DeleteRolesMutationVariables>;
export const SetCurrentYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCurrentYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateYearByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"current"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SetCurrentYearMutation, SetCurrentYearMutationVariables>;
export const InsertYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visible"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertYearOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"visible"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visible"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<InsertYearMutation, InsertYearMutationVariables>;
export const UpdateYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"YearSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateYearByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<UpdateYearMutation, UpdateYearMutationVariables>;
export const DeleteYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteYearByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<DeleteYearMutation, DeleteYearMutationVariables>;
export const CreateServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createYearServices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"p_year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateServicesMutation, CreateServicesMutationVariables>;
export const CopyCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CopyCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"copyYearCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"p_year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CopyCoursesMutation, CopyCoursesMutationVariables>;
export const ComputePrioritiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ComputePriorities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"computeYearPriorities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"p_year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ComputePrioritiesMutation, ComputePrioritiesMutationVariables>;
export const GetAdminRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdminRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"requests"},"name":{"kind":"Name","value":"request"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"track"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRequest"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"priorities"},"name":{"kind":"Name","value":"priority"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"track"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPriority"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"services"},"name":{"kind":"Name","value":"service"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRequestsService"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPrioritiesService"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"teachers"},"name":{"kind":"Name","value":"teacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRequestsTeacher"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPrioritiesTeacher"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"courses"},"name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"track"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRequestsCourse"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPrioritiesCourse"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"degrees"},"name":{"kind":"Name","value":"degree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRequestsDegree"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPrioritiesDegree"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"programs"},"name":{"kind":"Name","value":"program"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRequestsProgram"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPrioritiesProgram"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"tracks"},"name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRequestsTrack"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPrioritiesTrack"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"courseTypes"},"name":{"kind":"Name","value":"courseType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminRequestsCourseType"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPrioritiesCourseType"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Request"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPriority"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Priority"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seniority"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"Field","name":{"kind":"Name","value":"computed"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesDegree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Degree"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameDisplay"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminRequestsCourseType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPrioritiesCourseType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<GetAdminRequestsQuery, GetAdminRequestsQueryVariables>;
export const InsertPrioritiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertPriorities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PriorityInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertPriority"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertPrioritiesMutation, InsertPrioritiesMutationVariables>;
export const UpsertPrioritiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertPriorities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PriorityInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PriorityOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertPriority"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertPrioritiesMutation, UpsertPrioritiesMutationVariables>;
export const UpdatePrioritiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePriorities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrioritySetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updatePriority"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePrioritiesMutation, UpdatePrioritiesMutationVariables>;
export const DeletePrioritiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePriorities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deletePriority"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeletePrioritiesMutation, DeletePrioritiesMutationVariables>;
export const InsertRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertRequestsMutation, InsertRequestsMutationVariables>;
export const UpsertRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertRequestsMutation, UpsertRequestsMutationVariables>;
export const UpdateRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRequestsMutation, UpdateRequestsMutationVariables>;
export const DeleteRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteRequestsMutation, DeleteRequestsMutationVariables>;
export const GetAdminTeachersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdminTeachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"teachers"},"name":{"kind":"Name","value":"teacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTeacher"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminServicesTeacher"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminServiceModificationsTeacher"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminMessagesTeacher"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"positions"},"name":{"kind":"Name","value":"position"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminPosition"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTeachersPosition"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"services"},"name":{"kind":"Name","value":"service"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminService"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminServiceModificationsService"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminMessagesService"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"serviceModifications"},"name":{"kind":"Name","value":"serviceModification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminServiceModification"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"serviceModificationTypes"},"name":{"kind":"Name","value":"serviceModificationType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminServiceModificationType"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminServiceModificationsServiceModificationType"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"messages"},"name":{"kind":"Name","value":"message"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"baseServiceHours"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServicesTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModificationsTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminMessagesTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminPosition"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"baseServiceHours"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTeachersPosition"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModificationsService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminMessagesService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModification"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModificationType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminServiceModificationsServiceModificationType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]} as unknown as DocumentNode<GetAdminTeachersQuery, GetAdminTeachersQueryVariables>;
export const InsertMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertMessagesMutation, InsertMessagesMutationVariables>;
export const UpsertMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertMessagesMutation, UpsertMessagesMutationVariables>;
export const UpdateMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMessagesMutation, UpdateMessagesMutationVariables>;
export const DeleteMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMessagesMutation, DeleteMessagesMutationVariables>;
export const InsertPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertPositionsMutation, InsertPositionsMutationVariables>;
export const UpsertPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionOnConflict"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertPositionsMutation, UpsertPositionsMutationVariables>;
export const UpdatePositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updatePosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePositionsMutation, UpdatePositionsMutationVariables>;
export const DeletePositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deletePosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeletePositionsMutation, DeletePositionsMutationVariables>;
export const InsertServiceModificationTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertServiceModificationTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationTypeInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertServiceModificationType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertServiceModificationTypesMutation, InsertServiceModificationTypesMutationVariables>;
export const UpsertServiceModificationTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertServiceModificationTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationTypeInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationTypeOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertServiceModificationType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertServiceModificationTypesMutation, UpsertServiceModificationTypesMutationVariables>;
export const UpdateServiceModificationTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateServiceModificationTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationTypeSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateServiceModificationType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateServiceModificationTypesMutation, UpdateServiceModificationTypesMutationVariables>;
export const DeleteServiceModificationTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteServiceModificationTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteServiceModificationType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteServiceModificationTypesMutation, DeleteServiceModificationTypesMutationVariables>;
export const InsertServiceModificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertServiceModifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertServiceModification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertServiceModificationsMutation, InsertServiceModificationsMutationVariables>;
export const UpsertServiceModificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertServiceModifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertServiceModification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertServiceModificationsMutation, UpsertServiceModificationsMutationVariables>;
export const UpdateServiceModificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateServiceModifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceModificationSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateServiceModification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateServiceModificationsMutation, UpdateServiceModificationsMutationVariables>;
export const DeleteServiceModificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteServiceModifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteServiceModification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteServiceModificationsMutation, DeleteServiceModificationsMutationVariables>;
export const InsertServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertServicesMutation, InsertServicesMutationVariables>;
export const UpsertServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertServicesMutation, UpsertServicesMutationVariables>;
export const UpdateServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateServicesMutation, UpdateServicesMutationVariables>;
export const DeleteServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteServicesMutation, DeleteServicesMutationVariables>;
export const InsertTeachersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertTeachers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeacherInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"insertData"},"name":{"kind":"Name","value":"insertTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertTeachersMutation, InsertTeachersMutationVariables>;
export const UpsertTeachersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertTeachers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeacherInsertInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TeacherOnConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upsertData"},"name":{"kind":"Name","value":"insertTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onConflict"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertTeachersMutation, UpsertTeachersMutationVariables>;
export const UpdateTeachersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTeachers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeacherSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updateData"},"name":{"kind":"Name","value":"updateTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTeachersMutation, UpdateTeachersMutationVariables>;
export const DeleteTeachersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeachers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"deleteData"},"name":{"kind":"Name","value":"deleteTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTeachersMutation, DeleteTeachersMutationVariables>;
export const DeletePriorityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePriority"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePriorityByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePriorityMutation, DeletePriorityMutationVariables>;
export const DeleteComputedPriorityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComputedPriority"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePriorityByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"seniority"},"value":{"kind":"NullValue"}},{"kind":"ObjectField","name":{"kind":"Name","value":"isPriority"},"value":{"kind":"NullValue"}},{"kind":"ObjectField","name":{"kind":"Name","value":"computed"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteComputedPriorityMutation, DeleteComputedPriorityMutationVariables>;
export const UpsertPriorityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertPriority"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seniority"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isPriority"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertPriorityOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"seniority"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seniority"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isPriority"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isPriority"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"computed"},"value":{"kind":"BooleanValue","value":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"priority_service_id_course_id_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"updateColumns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"seniority"},{"kind":"EnumValue","value":"isPriority"},{"kind":"EnumValue","value":"computed"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpsertPriorityMutation, UpsertPriorityMutationVariables>;
export const GetAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"requests"},"name":{"kind":"Name","value":"request"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"courseId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"ASSIGNMENT"}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}}]}}]} as unknown as DocumentNode<GetAssignmentQuery, GetAssignmentQueryVariables>;
export const InsertAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hours"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertRequestOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"ASSIGNMENT"}},{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hours"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InsertAssignmentMutation, InsertAssignmentMutationVariables>;
export const UpdateAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hours"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRequestByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hours"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;
export const DeleteRequestCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRequestCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRequestByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRequestCardMutation, DeleteRequestCardMutationVariables>;
export const UpsertRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestTypeEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hours"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertRequestOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestType"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hours"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"request_service_id_course_id_type_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"updateColumns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"hours"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpsertRequestMutation, UpsertRequestMutationVariables>;
export const DeleteRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestTypeEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"courseId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestType"}}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteRequestMutation, DeleteRequestMutationVariables>;
export const GetServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"services"},"name":{"kind":"Name","value":"service"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]}}]} as unknown as DocumentNode<GetServicesQuery, GetServicesQueryVariables>;
export const GetCourseArchivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseArchives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trackIdComp"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IntComparisonExp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"semester"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"typeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"courses"},"name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"programId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"trackId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trackIdComp"}}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"semester"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"typeId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"typeId"}}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"EnumValue","value":"DESC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"ASSIGNMENT"}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RequestCardData"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestCardData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Request"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}}]} as unknown as DocumentNode<GetCourseArchivesQuery, GetCourseArchivesQueryVariables>;
export const UpdateDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCourseByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>;
export const UpdateServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hours"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hours"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const GetModificationTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetModificationTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"modificationTypes"},"name":{"kind":"Name","value":"serviceModificationType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetModificationTypesQuery, GetModificationTypesQueryVariables>;
export const InsertModificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertModification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modificationTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hours"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertServiceModificationOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"typeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modificationTypeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hours"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InsertModificationMutation, InsertModificationMutationVariables>;
export const DeleteModificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteModification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteServiceModificationByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteModificationMutation, DeleteModificationMutationVariables>;
export const UpsertMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertMessageOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"message_service_id_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"updateColumns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"content"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpsertMessageMutation, UpsertMessageMutationVariables>;
export const DeleteMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const GetAssignmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssignments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestBoolExp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"assignments"},"name":{"kind":"Name","value":"request"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"ASSIGNMENT"}}]}}]},{"kind":"Variable","name":{"kind":"Name","value":"where"}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"track"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAssignmentsQuery, GetAssignmentsQueryVariables>;
export const DummyMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DummyMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dummyFunction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<DummyMutationMutation, DummyMutationMutationVariables>;
export const GetCourseRowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseRows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"courses"},"name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hoursEffective"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gt"},"value":{"kind":"IntValue","value":"0"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"groupsEffective"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gt"},"value":{"kind":"IntValue","value":"0"}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"degree"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"program"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"track"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseRow"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseRow"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"coefficient"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}},{"kind":"Field","alias":{"kind":"Name","value":"numberOfGroups"},"name":{"kind":"Name","value":"groupsEffective"}},{"kind":"Field","name":{"kind":"Name","value":"requests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}}]}}]} as unknown as DocumentNode<GetCourseRowsQuery, GetCourseRowsQueryVariables>;
export const GetServiceRowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServiceRows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"services"},"name":{"kind":"Name","value":"service"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceRow"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TableCoursesService"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceRow"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"modifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TableCoursesService"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}}]} as unknown as DocumentNode<GetServiceRowsQuery, GetServiceRowsQueryVariables>;
export const GetCourseDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"course"},"name":{"kind":"Name","value":"courseByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseExpansion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","alias":{"kind":"Name","value":"courseType"},"name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoordinationData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coordination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseCoordinators"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoordinationData"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseDescription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestFormData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RequestCardData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Request"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hoursPerGroup"},"name":{"kind":"Name","value":"hoursEffective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseRequests"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RequestFormData"}},{"kind":"Field","name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RequestCardData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriorityFormData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriorityChipData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Priority"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seniority"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"Field","name":{"kind":"Name","value":"computed"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoursePriorities"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriorityFormData"}},{"kind":"Field","name":{"kind":"Name","value":"priorities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"service"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayname"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriorityChipData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseArchivesData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"courseId"},"name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseExpansion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseCoordinators"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseDescription"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseRequests"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoursePriorities"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseArchivesData"}}]}}]} as unknown as DocumentNode<GetCourseDetailsQuery, GetCourseDetailsQueryVariables>;
export const GetServiceDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServiceDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"service"},"name":{"kind":"Name","value":"serviceByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceTeacher"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceRequests"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServicePriorities"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherTitle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayname"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherCoordinations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"programId"},"value":{"kind":"EnumValue","value":"ASC_NULLS_LAST"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"trackId"},"value":{"kind":"EnumValue","value":"ASC_NULLS_LAST"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"courseId"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceTeacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeacherTitle"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeacherCoordinations"}},{"kind":"Field","alias":{"kind":"Name","value":"coordinationIds"},"name":{"kind":"Name","value":"coordinations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacherId"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"modifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hours"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"modificationType"},"name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hours"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceRequests"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"assignment"},"name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"ASSIGNMENT"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"primary"},"name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"PRIMARY"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"secondary"},"name":{"kind":"Name","value":"requests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"SECONDARY"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hoursWeighted"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServicePriorities"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priorities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isPriority"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_isNull"},"value":{"kind":"BooleanValue","value":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"semester"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"label"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"programId"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"trackId"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"course"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"degree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"nameDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seniority"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Service"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teacherId"}},{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<GetServiceDetailsQuery, GetServiceDetailsQueryVariables>;