import { z } from "zod";

export const roleTypeSchema = z.enum(["admin", "commissioner", "teacher"]);

export type RoleType = z.infer<typeof roleTypeSchema>;
