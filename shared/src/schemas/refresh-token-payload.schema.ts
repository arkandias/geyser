import { z } from "zod";

import { baseTokenPayloadSchema } from "./base-token-payload.schema.ts";

export const refreshTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    orgId: z.number(),
    userId: z.number(),
    isAdmin: z.boolean(),
  }),
);

export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;
