import { PhaseEnum, RequestTypeEnum, RoleTypeEnum } from "@/gql/graphql.ts";

export const isPhase = (phase: unknown): phase is PhaseEnum =>
  Object.values(PhaseEnum).includes(phase as PhaseEnum);

export const isRequestType = (rt: unknown): rt is RequestTypeEnum =>
  Object.values(RequestTypeEnum).includes(rt as RequestTypeEnum);

export const isRoleType = (rt: unknown): rt is RoleTypeEnum =>
  Object.values(RoleTypeEnum).includes(rt as RoleTypeEnum);
