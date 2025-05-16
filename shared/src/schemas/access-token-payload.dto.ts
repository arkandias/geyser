import type { z } from "zod";

import { AccessTokenClaimsSchema } from "./access-token-claims.dto.js";
import { JWTPayloadSchema } from "./jwt-payload.dto.js";

export const AccessTokenPayloadSchema = JWTPayloadSchema.required().and(
  AccessTokenClaimsSchema,
);

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>;
