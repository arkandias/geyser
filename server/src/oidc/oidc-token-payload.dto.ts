import { baseTokenPayloadSchema } from "@geyser/shared";
import { z } from "zod";

export const oidcTokenPayloadSchema = baseTokenPayloadSchema.partial().and(
  z.object({
    uid: z.string(),
  }),
);

export type OidcTokenPayload = z.infer<typeof oidcTokenPayloadSchema>;
