import { randomUUID } from "node:crypto";

import {
  AccessTokenPayload,
  type BaseTokenPayload,
  type OmitWithIndex,
  accessTokenPayloadSchema,
  roleTypeSchema,
} from "@geyser/shared";
import {
  RefreshTokenPayload,
  refreshTokenPayloadSchema,
} from "@geyser/shared/dist/schemas/refresh-token-payload.schema";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import jose from "jose";

import { ConfigService } from "../config/config.service";
import { KeysService } from "../keys/keys.service";
import { RoleService } from "../role/role.service";

@Injectable()
export class JwtService {
  constructor(
    private configService: ConfigService,
    private keysService: KeysService,
    private roleService: RoleService,
  ) {}

  private async makeToken(
    payload: Omit<BaseTokenPayload, "iss" | "iat" | "jti">,
  ): Promise<string> {
    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "RS256" })
      .setIssuer(this.configService.api.url.href)
      .setIssuedAt()
      .setJti(randomUUID())
      .sign(this.keysService.privateKey);
  }

  private async verifyToken<T extends BaseTokenPayload>(
    token: string,
    typ?: string,
  ): Promise<T> {
    let result: jose.JWTVerifyResult<T>;
    try {
      result = await jose.jwtVerify<T>(token, this.keysService.publicKey, {
        issuer: this.configService.api.url.href,
        audience: this.configService.api.url.href,
        requiredClaims: ["sub", "exp", "iat", "jti"],
      });
    } catch (error) {
      if (error instanceof jose.errors.JOSEError) {
        throw new UnauthorizedException({
          message: "Token verification failed",
          error: `${error.name}: ${error.message}`,
        });
      }
      throw error;
    }

    if (typ && result.payload.typ !== typ) {
      throw new UnauthorizedException({
        message: "Token verification failed",
        error: "Invalid token type",
      });
    }

    return result.payload;
  }

  async makeAccessToken(orgId: number, userId: number): Promise<string> {
    const userRoles = await this.roleService.findByUserId(userId);
    const roles = userRoles.map((userRole) =>
      roleTypeSchema.parse(userRole.role),
    );
    if (!roles.includes("teacher")) {
      roles.push("teacher");
    }
    roles.sort();

    return this.makeToken({
      sub: userId,
      aud: this.configService.api.url.href,
      exp: Math.floor(
        (Date.now() + this.configService.jwt.accessTokenMaxAge) / 1000,
      ),
      typ: "Bearer",
      orgId,
      userId,
      allowedRoles: roles,
      defaultRole: roles.includes("organizer") ? "organizer" : "teacher",
    } satisfies OmitWithIndex<AccessTokenPayload, "iss" | "iat" | "jti">);
  }

  async makeRefreshToken(orgId: number, userId: number): Promise<string> {
    return this.makeToken({
      sub: userId,
      aud: this.configService.api.url.href,
      exp: Math.floor(
        (Date.now() + this.configService.jwt.refreshTokenMaxAge) / 1000,
      ),
      typ: "Refresh",
      orgId,
      userId,
    } satisfies OmitWithIndex<BaseTokenPayload, "iss" | "iat" | "jti">);
  }

  async verifyAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    const payload = await this.verifyToken(accessToken, "Bearer");

    const parsed = accessTokenPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      throw new UnauthorizedException({
        message: "Invalid access token",
        error: `${parsed.error.name}: ${parsed.error.message}`,
      });
    }

    return parsed.data;
  }

  async verifyRefreshToken(refreshToken: string): Promise<RefreshTokenPayload> {
    const payload = await this.verifyToken(refreshToken, "Refresh");

    const parsed = refreshTokenPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      throw new UnauthorizedException({
        message: "Invalid refresh token",
        error: `${parsed.error.name}: ${parsed.error.message}`,
      });
    }

    return parsed.data;
  }
}
