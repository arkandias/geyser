import { ConfigService } from "../config/config.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import jose, { createRemoteJWKSet } from "jose";

@Injectable()
export class KeycloakService {
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor(private configService: ConfigService) {
    const { url, realm } = this.configService.keycloak;
    const jwksURL = `${url}/realms/${realm}/protocol/openid-connect/certs`;
    this.jwks = jose.createRemoteJWKSet(new URL(jwksURL));
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
      throw new UnauthorizedException('Missing claim "kid" in token');
    }

    // Get the public key from Keycloak
    const key = await this.jwks({ kid });

    // Verify the token with the public key
    const verified = await jose.jwtVerify(token, key);

    return verified.payload;
  }
}
