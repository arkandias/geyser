import { ConfigService } from "../config/config.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import jose, { createRemoteJWKSet } from "jose";

@Injectable()
export class KeycloakJwtService {
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor(private configService: ConfigService) {
    const { url, realm } = this.configService.keycloak;
    const jwksURL = `${url}/realms/${realm}/protocol/openid-connect/certs`;
    this.jwks = jose.createRemoteJWKSet(new URL(jwksURL));
  }

  async verifyToken(token: string): Promise<string> {
    // Decode the token to get the kid (key ID)
    const decoded = jose.decodeJwt(token);
    if (!decoded) {
      throw new UnauthorizedException("Invalid token");
    }

    // Get the key ID from the token header
    const kid = String(decoded["kid"]);
    if (!decoded["kid"]) {
      throw new UnauthorizedException('Missing claim "kid"');
    }

    // Get the public key from Keycloak
    const key = await this.jwks({ kid });

    // Verify the token with the public key
    let verified: jose.JWTVerifyResult;
    try {
      verified = await jose.jwtVerify(token, key);
    } catch (error) {
      throw new UnauthorizedException(
        error instanceof Error ? error.message : "Token verification failed",
      );
    }

    if (!verified.payload["email"]) {
      throw new UnauthorizedException('Missing claim "email"');
    }

    return String(verified.payload["email"]);
  }
}
