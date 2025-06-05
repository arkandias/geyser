import { z } from "zod/v4";

import { baseTokenPayloadSchema } from "./base-token-payload.schema.ts";
import { roleTypeSchema } from "./role-type.schema.ts";

export const accessTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    userId: z.string(),
    allowedRoles: z.array(roleTypeSchema),
    defaultRole: roleTypeSchema,
  }),
);

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
