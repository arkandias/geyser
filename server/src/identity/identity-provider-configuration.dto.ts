import { z } from "zod";

export const identityProviderConfigurationSchema = z
  .object({
    issuer: z.string(),
    authorization_endpoint: z.string(),
    token_endpoint: z.string(),
    jwks_uri: z.string(),
    end_session_endpoint: z.string(),
  })
  .transform((data) => ({
    issuerUrl: data.issuer,
    authUrl: data.authorization_endpoint,
    tokenUrl: data.token_endpoint,
    jwksUrl: data.jwks_uri,
    logoutUrl: data.end_session_endpoint,
  }));

export type IdentityProviderConfiguration = z.infer<
  typeof identityProviderConfigurationSchema
>;
