import { RequestTypeEnum, RoleTypeEnum } from "@/gql/graphql.ts";

export const isRequestType = (rt: unknown): rt is RequestTypeEnum =>
  Object.values(RequestTypeEnum).includes(rt as RequestTypeEnum);

export const isRole = (role: unknown): role is RoleTypeEnum =>
  Object.values(RoleTypeEnum).includes(role as RoleTypeEnum);
