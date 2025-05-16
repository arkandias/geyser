import { JWTPayloadSchema } from "@geyser/shared";
import { z } from "zod";

export const IdentityTokenPayloadSchema = JWTPayloadSchema.required({
  iss: true,
  aud: true,
  exp: true,
}).and(
  z.object({
    uid: z.string(),
  }),
);

export type IdentityTokenPayload = z.infer<typeof IdentityTokenPayloadSchema>;
