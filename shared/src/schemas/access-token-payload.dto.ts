import { z } from "zod";

import { HasuraClaimsSchema } from "./hasura-claims.dto.js";

export const AccessTokenPayloadSchema = z.object({
  uid: z.string(),
  roles: z.array(z.string()),
  hasura: HasuraClaimsSchema,
});

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>;
