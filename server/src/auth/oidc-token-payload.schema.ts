import { baseTokenPayloadSchema } from "@geyser/shared";
import { z } from "zod";

export const oidcTokenPayloadSchema = baseTokenPayloadSchema.partial().and(
  z.looseObject({
    email: z.string(),
    roles: z.array(z.string()).optional(),
  }),
);

export type OidcTokenPayload = z.infer<typeof oidcTokenPayloadSchema>;
