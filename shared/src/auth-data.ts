import { z } from "zod";

export const AuthDataSchema = z.object({
  expiresAt: z
    .number()
    .int()
    .positive({
      message: "Expiration timestamp must be a positive integer",
    })
    .optional(),
  userId: z.string().optional(),
  allowedRoles: z.array(z.string()).optional(),
  defaultRole: z.string().optional(),
});

export type AuthData = z.infer<typeof AuthDataSchema>;
