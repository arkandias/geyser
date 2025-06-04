import { z } from "zod/v4";

import { baseTokenPayloadSchema } from "./base-token-payload.schema.js";
import { roleTypeSchema } from "./role-type.schema.js";

export const accessTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    userId: z.string(),
    allowedRoles: z.array(roleTypeSchema),
    defaultRole: roleTypeSchema,
    displayname: z.string(),
    active: z.boolean(),
  }),
);

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
