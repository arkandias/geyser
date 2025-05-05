import { z } from "zod";

export const JWTPayloadSchema = z.object({
  iss: z.string(),
  sub: z.string(),
  aud: z.union([z.string(), z.array(z.string())]),
  exp: z.number(),
  nbf: z.number(),
  iat: z.number(),
  jti: z.string(),
});

export type JWTPayload = z.infer<typeof JWTPayloadSchema>;
