import { PhaseTypeEnum, RequestTypeEnum, RoleTypeEnum } from "@/gql/graphql.ts";

export const isPhaseType = (phase: unknown): phase is PhaseTypeEnum =>
  Object.values(PhaseTypeEnum).includes(phase as PhaseTypeEnum);

export const isRequestType = (rt: unknown): rt is RequestTypeEnum =>
  Object.values(RequestTypeEnum).includes(rt as RequestTypeEnum);

export const isRoleType = (rt: unknown): rt is RoleTypeEnum =>
  Object.values(RoleTypeEnum).includes(rt as RoleTypeEnum);
