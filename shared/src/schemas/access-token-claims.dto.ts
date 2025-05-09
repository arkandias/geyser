import { z } from "zod";

import { HasuraClaimsSchema } from "./hasura-claims.dto.js";

export const AccessTokenClaimsSchema = z.object({
  uid: z.string(),
  roles: z.array(z.string()),
  hasura: HasuraClaimsSchema,
});

export type AccessTokenClaims = z.infer<typeof AccessTokenClaimsSchema>;
