import { z } from "zod/v4";

import { baseTokenPayloadSchema } from "./base-token-payload.schema.ts";

export const refreshTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    orgId: z.number(),
    userId: z.number(),
  }),
);

export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;
