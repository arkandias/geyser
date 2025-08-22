import { baseTokenPayloadSchema } from "@geyser/shared/dist/schemas/base-token-payload.schema";
import { z } from "zod";

export const refreshTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.looseObject({
    orgId: z.number(),
    userId: z.number(),
    hasAccess: z.boolean(),
    isAdmin: z.boolean(),
  }),
);

export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;
