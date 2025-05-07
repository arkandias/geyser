import type { IdentityTokenRequestParameters } from "./identity-token-request-parameters.interface";

export interface IdentityTokenRequestState {
  parameters: Partial<IdentityTokenRequestParameters>;
  expiresAt: number;
  redirectURL?: string;
}
