import { z } from "zod/v4";

import { baseTokenPayloadSchema } from "./base-token-payload.schema.js";
import { hasuraClaimsSchema } from "./hasura-claims.schema.js";
import { roleTypeSchema } from "./role-type.schema.js";

export const accessTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    uid: z.string(),
    displayname: z.string(),
    active: z.boolean(),
    roles: z.array(roleTypeSchema),
    "https://hasura.io/jwt/claims": hasuraClaimsSchema,
  }),
);

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
