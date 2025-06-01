import { baseTokenPayloadSchema } from "@geyser/shared";
import { z } from "zod/v4";

export const oidcTokenPayloadSchema = baseTokenPayloadSchema.partial().and(
  z.looseObject({
    uid: z.string(),
  }),
);

export type OidcTokenPayload = z.infer<typeof oidcTokenPayloadSchema>;
