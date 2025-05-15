import { z } from "zod";

import { HasuraClaimsSchema } from "./hasura-claims.dto.js";
import { RoleTypeSchema } from "./role-type.dto.js";

export const AccessTokenClaimsSchema = z.object({
  uid: z.string(),
  allowedRoles: z.array(RoleTypeSchema),
  hasura: HasuraClaimsSchema,
});

export type AccessTokenClaims = z.infer<typeof AccessTokenClaimsSchema>;
