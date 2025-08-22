import { z } from "zod";

import { baseTokenPayloadSchema } from "./base-token-payload.schema.ts";

export const accessTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    orgId: z.number(),
    userId: z.number(),
    hasAccess: z.boolean(),
    isAdmin: z.boolean(),
    allowedRoles: z.array(z.string()),
    defaultRole: z.string(),
  }),
);

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
