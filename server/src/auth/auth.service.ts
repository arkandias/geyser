import { randomUUID } from "node:crypto";

import {
  AccessTokenPayload,
  type BaseTokenPayload,
  RefreshTokenPayload,
  accessTokenPayloadSchema,
  refreshTokenPayloadSchema,
  roleTypeSchema,
} from "@geyser/shared";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CookieOptions, Response } from "express";
import jose, { JWTVerifyResult } from "jose";

import { OmitWithIndex } from "../common/types";
import { ConfigService } from "../config/config.service";
import { KeysService } from "../keys/keys.service";
import { RolesService } from "../roles/roles.service";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private keysService: KeysService,
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {}

  private async makeToken(
    payload: Omit<BaseTokenPayload, "iss" | "iat" | "jti">,
  ): Promise<string> {
    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "RS256" })
      .setIssuer(this.configService.api.url)
      .setIssuedAt()
      .setJti(randomUUID())
      .sign(this.keysService.privateKey);
  }

  private async verifyToken<T extends BaseTokenPayload>(
    token: string,
    scope?: string,
  ): Promise<T> {
    let result: JWTVerifyResult<T>;
    try {
      result = await jose.jwtVerify<T>(token, this.keysService.publicKey, {
        issuer: this.configService.api.url,
        audience: this.configService.api.url,
        requiredClaims: ["sub", "exp", "iat", "jti", "scope"],
      });
    } catch (error) {
      if (error instanceof jose.errors.JOSEError) {
        throw new UnauthorizedException("Token verification failed");
      }
      throw error;
    }

    if (scope) {
      const payloadScopes = result.payload.scope?.split(" ");
      scope.split(" ").forEach((s) => {
        if (!payloadScopes?.includes(s)) {
          throw new UnauthorizedException("Token verification failed");
        }
      });
    }

    return result.payload;
  }

  async getUser(uid: string): Promise<User> {
    const user = await this.usersService.findByUid(uid);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return user;
  }

  private async makeAccessToken(user: User): Promise<string> {
    const { uid, displayname, active } = user;
    const roles = await this.rolesService.findByUid(uid);
    const roleTypes = roles
      .map((role) => roleTypeSchema.parse(role.type))
      .concat("teacher");

    return this.makeToken({
      sub: uid,
      aud: [
        this.configService.api.url,
        this.configService.api.origin + "/graphql",
      ],
      exp: Math.floor(
        (Date.now() + this.configService.jwt.accessTokenMaxAge) / 1000,
      ),
      scope: "access",
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
      aud: this.configService.api.url,
      exp: Math.floor(
        (Date.now() + this.configService.jwt.refreshTokenMaxAge) / 1000,
      ),
      scope: "refresh",
      uid,
    } satisfies OmitWithIndex<RefreshTokenPayload, "iss" | "iat" | "jti">);
  }

  async verifyAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    const payload = await this.verifyToken(accessToken, "access");

    const parsed = accessTokenPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      throw new UnauthorizedException("Invalid access token");
    }

    return parsed.data;
  }

  async verifyRefreshToken(refreshToken: string): Promise<RefreshTokenPayload> {
    const payload = await this.verifyToken(refreshToken, "refresh");

    const parsed = refreshTokenPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return parsed.data;
  }

  private accessCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.configService.api.secure,
      sameSite: "lax",
      maxAge: this.configService.jwt.accessTokenMaxAge,
      path: "/",
    };
  }

  private refreshCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.configService.api.secure,
      sameSite: "lax",
      maxAge: this.configService.jwt.refreshTokenMaxAge,
      path: "/api/auth/refresh",
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
