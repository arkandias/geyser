import { z } from "zod/v4";

export const oidcTokenResponseSchema = z
  .looseObject({
    access_token: z.string(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
  }));

export type OidcTokenResponse = z.infer<typeof oidcTokenResponseSchema>;
