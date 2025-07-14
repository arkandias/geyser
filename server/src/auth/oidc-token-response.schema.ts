import { z } from "zod";

export const oidcTokenResponseSchema = z
  .looseObject({
    access_token: z.string(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
  }));

export type OidcTokenResponse = z.infer<typeof oidcTokenResponseSchema>;
