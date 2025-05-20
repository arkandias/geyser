import { z } from "zod";

import { baseTokenPayloadSchema } from "./base-token-payload.dto.js";
import { hasuraClaimsSchema } from "./hasura-claims.dto.js";
import { roleTypeSchema } from "./role-type.dto.js";

export const accessTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.object({
    uid: z.string(),
    displayname: z.string(),
    active: z.boolean(),
    roles: z.array(roleTypeSchema),
    "https://hasura.io/jwt/claims": hasuraClaimsSchema,
  }),
);

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
