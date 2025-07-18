import { baseTokenPayloadSchema } from "@geyser/shared/dist/schemas/base-token-payload.schema.ts";
import { z } from "zod";

export const refreshTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    orgId: z.number(),
    userId: z.number(),
    isAdmin: z.boolean(),
  }),
);

export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;
