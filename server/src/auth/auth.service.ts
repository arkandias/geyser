import { KeysService } from "../keys/keys.service";
import { RolesService } from "../roles/roles.service";
import { Injectable } from "@nestjs/common";
import jose from "jose";

import { KeycloakJwtService } from "./keycloak-jwt.service";
import { LoginResponseDto } from "./login-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private keysService: KeysService,
    private keycloakJwtService: KeycloakJwtService,
    private rolesService: RolesService,
  ) {}

  /**
   * Verify Keycloak token and issue a new token with role information
   * @param token The JWT token from Keycloak
   * @returns A new token with user role information
   */
  async exchangeToken(token: string): Promise<LoginResponseDto> {
    const email = await this.keycloakJwtService.verifyToken(token);

    // Get user roles from the database
    const roles = await this.rolesService.findByEmail(email);

    // Create a payload for the new token
    const payload = {
      sub: email,
      aud: "hasura",
      "x-hasura-user-id": email,
      "x-hasura-allowed-roles": roles.map((role) => role.type),
      "x-hasura-default-role": "teacher",
    };

    const privateKey = this.keysService.getPrivateKey();
    if (!privateKey) {
      throw new Error("Failed to sign JWT: No private key provided");
    }

    // Generate a new token with role information
    const accessToken = await new jose.SignJWT(payload)
      .setIssuedAt()
      .setIssuer("geyser-backend")
      .setAudience(["hasura", "geyser-backend"])
      .setExpirationTime("1h")
      .sign(privateKey);

    return { accessToken };
  }
}
