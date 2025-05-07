import type { IdentityTokenPayload } from "./identity-token-payload.dto";
import type { IdentityTokenRequestParameters } from "./identity-token-request-parameters.interface";
import type { TokenResponse } from "./identity-token-response.dto";

export interface IdentityProvider {
  requestToken(
    parameters: IdentityTokenRequestParameters,
  ): Promise<TokenResponse>;
  verifyToken(token: string): Promise<IdentityTokenPayload>;
}
