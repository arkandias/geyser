import { randomUUID } from "node:crypto";

import {
  AccessTokenPayload,
  type BaseTokenPayload,
  type OmitWithIndex,
  accessTokenPayloadSchema,
} from "@geyser/shared";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import jose from "jose";
import { JwksService } from "nestjs-jwks";

import {
  RefreshTokenPayload,
  refreshTokenPayloadSchema,
} from "@/auth/refresh-token-payload.schema";
import { joseErrorMessage } from "@/common/utils";
import { ConfigService } from "@/config/config.service";
import { RoleService } from "@/role/role.service";

@Injectable()
export class JwtService {
  constructor(
    private configService: ConfigService,
    private jwksService: JwksService,
    private roleService: RoleService,
  ) {}

  private async makeToken(
    payload: Omit<BaseTokenPayload, "iss" | "iat" | "jti">,
  ): Promise<string> {
    return new jose.SignJWT(payload)
      .setProtectedHeader({
        alg: this.jwksService.alg,
        kid: this.jwksService.kid,
      })
      .setIssuer(this.configService.api.url.href)
      .setIssuedAt()
      .setJti(randomUUID())
      .sign(this.jwksService.privateKey);
  }

  private async verifyToken<T extends BaseTokenPayload>(
    token: string,
    typ?: string,
  ): Promise<T> {
    let result: jose.JWTVerifyResult<T>;
    try {
      result = await jose.jwtVerify<T>(token, this.jwksService.getKey, {
        issuer: this.configService.api.url.href,
        audience: this.configService.api.url.href,
        requiredClaims: ["sub", "exp", "iat", "jti"],
      });
    } catch (error) {
      if (error instanceof jose.errors.JOSEError) {
        throw new UnauthorizedException({
          message: "Token verification failed",
          error: joseErrorMessage(error),
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

  async makeAccessToken(data: {
    orgId: number;
    userId: number;
    hasAccess: boolean;
    isAdmin: boolean;
  }): Promise<string> {
    const userRoles = await this.roleService.findByUserId(data.userId);
    const roles = userRoles.map((userRole) => userRole.role);
    // Add base role
    if (!roles.includes("teacher")) {
      roles.push("teacher");
    }
    roles.sort();

    return this.makeToken({
      sub: data.userId,
      aud: this.configService.api.url.href,
      exp: Math.floor(
        (Date.now() + this.configService.jwt.accessTokenMaxAge) / 1000,
      ),
      typ: "Bearer",
      ...data,
      allowedRoles: roles,
      defaultRole: "teacher",
    } satisfies OmitWithIndex<AccessTokenPayload, "iss" | "iat" | "jti">);
  }

  async makeRefreshToken(data: {
    orgId: number;
    userId: number;
    hasAccess: boolean;
    isAdmin: boolean;
  }): Promise<string> {
    return this.makeToken({
      sub: data.userId,
      aud: this.configService.api.url.href,
      exp: Math.floor(
        (Date.now() + this.configService.jwt.refreshTokenMaxAge) / 1000,
      ),
      typ: "Refresh",
      ...data,
    } satisfies OmitWithIndex<RefreshTokenPayload, "iss" | "iat" | "jti">);
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
