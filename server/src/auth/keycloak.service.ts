import { ConfigService } from "../config/config.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import jose, { createRemoteJWKSet } from "jose";

import { KeycloakToken } from "./keycloak-token.interface";

@Injectable()
export class KeycloakService {
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor(private configService: ConfigService) {
    this.jwks = jose.createRemoteJWKSet(
      new URL(this.configService.keycloak.certsURL),
    );
  }

  async verifyJWT(token: string): Promise<jose.JWTPayload> {
    // Decode the token to get the key ID
    const decoded = jose.decodeJwt(token);
    if (!decoded) {
      throw new UnauthorizedException("Invalid token");
    }

    // Get the key ID from the token header
    const kid = String(decoded["kid"]);
    if (!decoded["kid"]) {
      throw new UnauthorizedException("Missing claim 'kid' in token");
    }

    // Get the public key from Keycloak
    const key = await this.jwks({ kid });

    // Verify the token with the public key
    const verified = await jose.jwtVerify(token, key);

    return verified.payload;
  }

  async exchangeCodeForTokens(
    redirectURI: string,
    code: string,
  ): Promise<KeycloakToken> {
    try {
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: this.configService.keycloak.clientId,
        client_secret: this.configService.keycloak.clientSecret,
        redirect_uri: redirectURI,
        code,
      });

      const response = await axios.post(
        this.configService.keycloak.tokenURL,
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        idToken: response.data.id_token,
        expiresIn: response.data.expires_in,
      };
    } catch (error) {
      throw new UnauthorizedException(
        "Failed to exchange authorization code for tokens",
      );
    }
  }
}
