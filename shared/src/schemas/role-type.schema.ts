import { z } from "zod/v4";

export const roleTypeSchema = z.enum(
  ["organizer", "commissioner", "teacher"],
  "Invalid role",
);

export type RoleType = z.infer<typeof roleTypeSchema>;
