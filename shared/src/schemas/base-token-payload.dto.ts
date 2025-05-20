import { z } from "zod";

export const baseTokenPayloadSchema = z
  .object({
    iss: z.string(),
    sub: z.string(),
    aud: z.union([z.string(), z.array(z.string())]),
    exp: z.number(),
    iat: z.number(),
    jti: z.string(),
    scope: z.string().optional(),
  })
  .passthrough();

export type BaseTokenPayload = z.infer<typeof baseTokenPayloadSchema>;
