import { z } from "zod";

export const RoleTypeSchema = z.enum(["admin", "commissioner", "teacher"]);

export type RoleType = z.infer<typeof RoleTypeSchema>;
