import { z } from "zod";

import { baseTokenPayloadSchema } from "./base-token-payload.dto.js";

export const refreshTokenPayloadSchema = baseTokenPayloadSchema.and(
  z.object({
    uid: z.string(),
  }),
);

export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;
