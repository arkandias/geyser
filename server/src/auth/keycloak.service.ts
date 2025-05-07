import { ConfigService } from "../config/config.service";
import { errorMessage } from "@geyser/shared";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import jose from "jose";

import { IdentityProvider } from "./identity-provider.interface";
import {
  IdentityTokenPayload,
  IdentityTokenPayloadSchema,
} from "./identity-token-payload.dto";
import { IdentityTokenRequestParameters } from "./identity-token-request-parameters.interface";
import {
  IdentityTokenResponseSchema,
  TokenResponse,
} from "./identity-token-response.dto";

@Injectable()
export class KeycloakService implements IdentityProvider {
  private readonly jwks: ReturnType<typeof jose.createRemoteJWKSet>;

  constructor(private configService: ConfigService) {
    this.jwks = jose.createRemoteJWKSet(
      new URL(this.configService.keycloak.certsURL),
    );
  }

  async verifyToken(token: string): Promise<IdentityTokenPayload> {
    try {
      // Decode the token's protected header to get the key ID
      const protectedHeaderParameters = jose.decodeProtectedHeader(token);

      // Get the public key from Keycloak's JWKS
      const key = await this.jwks(protectedHeaderParameters);

      // Verify the token with the public key
      const verified = await jose.jwtVerify(token, key);

      return IdentityTokenPayloadSchema.parse(verified.payload);
    } catch (error) {
      throw new UnauthorizedException(
        `Identity token verification failed: ${errorMessage(error)}`,
      );
    }
  }

  async requestToken(
    params: IdentityTokenRequestParameters,
  ): Promise<TokenResponse> {
    try {
      const response = await axios.post(
        this.configService.keycloak.tokenURL,
        new URLSearchParams({ ...params }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      return IdentityTokenResponseSchema.parse(response.data);
    } catch (error) {
      throw new UnauthorizedException(
        `Identity token request failed: ${errorMessage(error)}`,
      );
    }
  }
}
