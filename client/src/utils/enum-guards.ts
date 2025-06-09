import { PhaseEnum, RequestTypeEnum, RoleEnum } from "@/gql/graphql.ts";

export const isPhaseType = (phase: unknown): phase is PhaseEnum =>
  Object.values(PhaseEnum).includes(phase as PhaseEnum);

export const isRequestType = (rt: unknown): rt is RequestTypeEnum =>
  Object.values(RequestTypeEnum).includes(rt as RequestTypeEnum);

export const isRoleType = (rt: unknown): rt is RoleEnum =>
  Object.values(RoleEnum).includes(rt as RoleEnum);
