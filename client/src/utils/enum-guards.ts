import {
  LocaleEnum,
  PhaseEnum,
  RequestTypeEnum,
  RoleEnum,
} from "@/gql/graphql.ts";

export const isLocale = (locale: unknown): locale is LocaleEnum =>
  Object.values(LocaleEnum).includes(locale as LocaleEnum);

export const isPhase = (phase: unknown): phase is PhaseEnum =>
  Object.values(PhaseEnum).includes(phase as PhaseEnum);

export const isRequestType = (rt: unknown): rt is RequestTypeEnum =>
  Object.values(RequestTypeEnum).includes(rt as RequestTypeEnum);

export const isRole = (role: unknown): role is RoleEnum =>
  Object.values(RoleEnum).includes(role as RoleEnum);
