export const HASURA_ROLES = {
  ADMIN: "admin",
  COMMISSIONER: "commissioner",
  TEACHER: "teacher",
} as const;

export type HasuraRole = (typeof HASURA_ROLES)[keyof typeof HASURA_ROLES];

export const isHasuraRole = (role: unknown): role is HasuraRole =>
  Object.values(HASURA_ROLES).includes(role as HasuraRole);
