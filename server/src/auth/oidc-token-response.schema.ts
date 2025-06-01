import { z } from "zod/v4";

export const oidcTokenResponseSchema = z
  .looseObject({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
    id_token: z.string(),
    refresh_token: z.string().optional(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
    idToken: data.id_token,
    refreshToken: data.refresh_token,
  }));

export type OidcTokenResponse = z.infer<typeof oidcTokenResponseSchema>;
