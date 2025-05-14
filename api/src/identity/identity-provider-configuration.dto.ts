import { z } from "zod";

export const IdentityProviderConfigurationSchema = z
  .object({
    issuer: z.string(),
    authorization_endpoint: z.string(),
    token_endpoint: z.string(),
    jwks_uri: z.string(),
  })
  .transform((data) => {
    return {
      issuerURL: data.issuer,
      authURL: data.authorization_endpoint,
      tokenURL: data.token_endpoint,
      jwksURL: data.jwks_uri,
    };
  });

export type IdentityProviderConfiguration = z.infer<
  typeof IdentityProviderConfigurationSchema
>;
