import { randomUUID } from "node:crypto";

import {
  AccessTokenPayload,
  type BaseTokenPayload,
  type OmitWithIndex,
  accessTokenPayloadSchema,
  baseTokenPayloadSchema,
  roleTypeSchema,
} from "@geyser/shared";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CookieOptions, Response } from "express";
import jose from "jose";

import { ConfigService } from "../config/config.service";
import { KeysService } from "../keys/keys.service";
import { RolesService } from "../roles/roles.service";
import { User } from "../users/user.entity";

@Injectable()
export class JwtService {
  constructor(
    private configService: ConfigService,
    private keysService: KeysService,
    private rolesService: RolesService,
  ) {}

  private async makeToken(
    payload: Omit<BaseTokenPayload, "iss" | "iat" | "jti">,
  ): Promise<string> {
    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "RS256" })
      .setIssuer(this.configService.apiUrl.href)
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
        issuer: this.configService.apiUrl.href,
        audience: this.configService.apiUrl.href,
        requiredClaims: ["sub", "exp", "iat", "jti", "scope"],
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

  private async makeAccessToken(user: User): Promise<string> {
    const { uid, displayname, active } = user;
    const roles = await this.rolesService.findByUid(uid);
    const roleTypes = roles
      .map((role) => roleTypeSchema.parse(role.type))
      .concat("teacher");

    return this.makeToken({
      sub: uid,
      aud: this.configService.apiUrl.href,
      exp: Math.floor(
        (Date.now() + this.configService.jwt.accessTokenMaxAge) / 1000,
      ),
      typ: "Bearer",
      uid,
      displayname,
      active,
      roles: roleTypes,
      "https://hasura.io/jwt/claims": {
        "X-Hasura-User-Id": uid,
        "X-Hasura-Allowed-Roles": roleTypes,
        "X-Hasura-Default-Role": "teacher",
      },
    } satisfies OmitWithIndex<AccessTokenPayload, "iss" | "iat" | "jti">);
  }

  private async makeRefreshToken(user: User): Promise<string> {
    const { uid } = user;
    return this.makeToken({
      sub: uid,
      aud: this.configService.apiUrl.href,
      exp: Math.floor(
        (Date.now() + this.configService.jwt.refreshTokenMaxAge) / 1000,
      ),
      typ: "Refresh",
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

  async verifyRefreshToken(refreshToken: string): Promise<BaseTokenPayload> {
    const payload = await this.verifyToken(refreshToken, "Refresh");

    const parsed = baseTokenPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      throw new UnauthorizedException({
        message: "Invalid refresh token",
        error: `${parsed.error.name}: ${parsed.error.message}`,
      });
    }

    return parsed.data;
  }

  private accessCookieOptions(): CookieOptions {
    return {
      domain: "geyser.localhost",
      httpOnly: true,
      secure: this.configService.apiUrl.protocol === "https:",
      sameSite: "lax",
      maxAge: this.configService.jwt.accessTokenMaxAge,
      path: "/",
    };
  }

  private refreshCookieOptions(): CookieOptions {
    return {
      domain: "geyser.localhost",
      httpOnly: true,
      secure: this.configService.apiUrl.protocol === "https:",
      sameSite: "lax",
      maxAge: this.configService.jwt.refreshTokenMaxAge,
      path: "/auth/refresh",
    };
  }

  async setAccessCookie(res: Response, user: User): Promise<void> {
    const accessToken = await this.makeAccessToken(user);
    res.cookie("access_token", accessToken, this.accessCookieOptions());
  }

  async setRefreshCookie(res: Response, user: User): Promise<void> {
    const refreshToken = await this.makeRefreshToken(user);
    res.cookie("refresh_token", refreshToken, this.refreshCookieOptions());
  }

  unsetAccessCookie(res: Response): void {
    res.clearCookie("access_token", this.accessCookieOptions());
  }

  unsetRefreshCookie(res: Response): void {
    res.clearCookie("refresh_token", this.refreshCookieOptions());
  }
}
