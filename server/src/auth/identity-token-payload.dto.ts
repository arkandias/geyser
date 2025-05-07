import { z } from "zod";

export const IdentityTokenPayloadSchema = z.object({
  uid: z.string(),
});

export type IdentityTokenPayload = z.infer<typeof IdentityTokenPayloadSchema>;
