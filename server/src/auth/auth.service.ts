import { randomUUID } from "node:crypto";

import { ConfigService } from "../config/config.service";
import { KeysService } from "../keys/keys.service";
import { RolesService } from "../roles/roles.service";
import {
  AccessTokenClaims,
  AccessTokenPayload,
  AccessTokenPayloadSchema,
  type JWTPayload,
  errorMessage,
} from "@geyser/shared";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CookieOptions, Response } from "express";
import jose from "jose";

import { IdentityTokenRequestParameters } from "./identity-token-request-parameters.interface";
import { IdentityTokenRequestState } from "./identity-token-request-state.interface";

@Injectable()
export class AuthService {
  private stateRecord = new Map<string, IdentityTokenRequestState>();

  constructor(
    private configService: ConfigService,
    private keysService: KeysService,
    private rolesService: RolesService,
  ) {}

  private async makeToken(
    payload: {
      sub: string;
      aud: string | string[];
      exp: number | string | Date;
      nbf?: number | string | Date;
      iat?: number | string | Date;
      jti?: string;
    } & Record<string, unknown>,
  ): Promise<string> {
    const { sub, aud, exp, nbf, iat, jti, ...rest } = payload;
    return new jose.SignJWT(rest)
      .setProtectedHeader({ alg: "RS256" })
      .setIssuer("api")
      .setSubject(sub)
      .setAudience(aud)
      .setExpirationTime(exp)
      .setNotBefore(nbf ?? "0s")
      .setIssuedAt(iat ?? "0s")
      .setJti(jti ?? randomUUID())
      .sign(this.keysService.getPrivateKey());
  }

  private async makeAccessTokenClaims(uid: string): Promise<AccessTokenClaims> {
    const roles = await this.rolesService.findByUid(uid);
    const roleTypes = roles.map((role) => role.type).concat("teacher");

    return {
      uid,
      roles: roleTypes,
      hasura: {
        "X-Hasura-User-Id": uid,
        "X-Hasura-Allowed-Roles": roleTypes,
        "X-Hasura-Default-Role": "teacher",
      },
    };
  }

  private async makeAccessToken(uid: string): Promise<string> {
    const payload = await this.makeAccessTokenClaims(uid);

    return this.makeToken({
      sub: uid,
      aud: ["api-access", "hasura"],
      exp: Math.floor(
        (Date.now() + this.configService.jwt.accessTokenMaxAge) / 1000,
      ),
      ...payload,
    });
  }

  private async makeRefreshToken(uid: string): Promise<string> {
    return this.makeToken({
      sub: uid,
      aud: ["api-refresh"],
      exp: Math.floor(
        (Date.now() + this.configService.jwt.refreshTokenMaxAge) / 1000,
      ),
    });
  }

  private async verifyToken(
    token?: string,
    options?: jose.JWTVerifyOptions,
  ): Promise<JWTPayload> {
    if (!token) {
      throw new UnauthorizedException(
        "Token verification failed: Missing token",
      );
    }

    try {
      const result = await jose.jwtVerify<JWTPayload>(
        token,
        this.keysService.getPublicKey(),
        {
          issuer: "api",
          audience: "api",
          requiredClaims: ["sub", "exp", "nbf", "iat", "jti"],
          ...options,
        },
      );
      return result.payload;
    } catch (error) {
      throw new UnauthorizedException(
        `Token verification failed: ${errorMessage(error)}`,
      );
    }
  }

  async verifyAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    const payload = await this.verifyToken(accessToken, {
      audience: "api-access",
    });
    return AccessTokenPayloadSchema.parse(payload);
  }

  async verifyRefreshToken(refreshToken: string): Promise<JWTPayload> {
    return this.verifyToken(refreshToken, {
      audience: "api-refresh",
    });
  }

  private accessCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.configService.nodeEnv === "production",
      sameSite: "lax",
      maxAge: this.configService.jwt.accessTokenMaxAge,
      path: "/",
    };
  }

  private refreshCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.configService.nodeEnv === "production",
      sameSite: "lax",
      maxAge: this.configService.jwt.refreshTokenMaxAge,
      path: "/api/auth/refresh",
    };
  }

  async setAccessCookie(res: Response, uid: string): Promise<void> {
    const accessToken = await this.makeAccessToken(uid);
    res.cookie("access_token", accessToken, this.accessCookieOptions());
  }

  async setRefreshCookie(res: Response, uid: string): Promise<void> {
    const refreshToken = await this.makeRefreshToken(uid);
    res.cookie("refresh_token", refreshToken, this.refreshCookieOptions());
  }

  unsetAccessCookie(res: Response): void {
    res.clearCookie("access_token", this.accessCookieOptions());
  }

  unsetRefreshCookie(res: Response): void {
    res.clearCookie("refresh_token", this.refreshCookieOptions());
  }

  newState(
    parameters: Partial<IdentityTokenRequestParameters>,
    redirectURL?: string,
  ): string {
    const id = randomUUID();
    const expiresAt = Date.now() + this.configService.stateExpirationTime;
    this.stateRecord.set(id, { parameters, expiresAt, redirectURL });
    return id;
  }

  getState(id: string): IdentityTokenRequestState {
    const authState = this.stateRecord.get(id);
    if (!authState) {
      throw new UnauthorizedException("State not found");
    }
    if (authState.expiresAt < Date.now()) {
      throw new UnauthorizedException("State has expired");
    }
    return authState;
  }
}
