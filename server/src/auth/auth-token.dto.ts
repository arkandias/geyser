import { z } from "zod";

export const AuthTokenSchema = z.object({
  uid: z.string(),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;
