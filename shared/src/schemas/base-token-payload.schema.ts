import { z } from "zod";

export const baseTokenPayloadSchema = z.looseObject({
  iss: z.string(),
  sub: z.number(),
  aud: z.union([z.string(), z.array(z.string())]),
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
  typ: z.string(),
});

export type BaseTokenPayload = z.infer<typeof baseTokenPayloadSchema>;
