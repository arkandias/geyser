import { z } from "zod";

export const AuthTokenSchema = z.object({
  email: z.string(),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;
