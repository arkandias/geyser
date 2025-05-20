import { baseTokenPayloadSchema } from "@geyser/shared";
import { z } from "zod";

export const identityTokenPayloadSchema = baseTokenPayloadSchema.partial().and(
  z.object({
    uid: z.string(),
  }),
);

export type IdentityTokenPayload = z.infer<typeof identityTokenPayloadSchema>;
