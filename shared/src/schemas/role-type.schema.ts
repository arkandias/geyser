import { z } from "zod/v4";

export const roleTypeSchema = z.enum(["admin", "commissioner", "teacher"]);

export type RoleType = z.infer<typeof roleTypeSchema>;
