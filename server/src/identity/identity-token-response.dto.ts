import { z } from "zod";

export const IdentityTokenResponseSchema = z
  .object({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
    id_token: z.string(),
    refresh_token: z.string().optional(),
  })
  .transform((data) => {
    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      idToken: data.id_token,
      refreshToken: data.refresh_token,
    };
  });

export type TokenResponse = z.infer<typeof IdentityTokenResponseSchema>;
