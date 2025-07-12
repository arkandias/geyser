import { z } from "zod/v4";

import { baseTokenPayloadSchema } from "./base-token-payload.schema.ts";
import { roleTypeSchema } from "./role-type.schema.ts";

export const accessTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    orgId: z.number(),
    userId: z.number(),
    isAdmin: z.boolean(),
    allowedRoles: z.array(roleTypeSchema),
    defaultRole: roleTypeSchema,
  }),
);

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
