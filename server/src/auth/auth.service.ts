import { randomUUID } from "node:crypto";

import { ConfigService } from "../config/config.service";
import { KeysService } from "../keys/keys.service";
import { RolesService } from "../roles/roles.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";
import jose from "jose";

import { AuthState } from "./auth-state.interface";
import { HasuraClaims } from "./hasura-claims.dto";
import { JWTPayload } from "./jwt-payload.dto";

@Injectable()
export class AuthService {
  private stateRecord = new Map<string, AuthState>();

  constructor(
    private configService: ConfigService,
    private keysService: KeysService,
    private rolesService: RolesService,
  ) {}

  async verifyToken(token?: string, minValidity?: number): Promise<JWTPayload> {
    if (!token) {
      throw new UnauthorizedException("Missing token");
    }

    let payload: JWTPayload;
    try {
      const result = await jose.jwtVerify<JWTPayload>(
        token,
        this.keysService.getPublicKey(),
        {
          issuer: "api",
          audience: "api",
          requiredClaims: ["sub", "exp", "nbf", "iat", "jti"],
        },
      );
      payload = result.payload;
    } catch (error) {
      throw new UnauthorizedException(`Token verification failed: ${error}`);
    }

    if (minValidity) {
      const nowSeconds = Math.floor(Date.now() / 1000);
      const timeRemaining = payload.exp - nowSeconds;

      if (timeRemaining < minValidity) {
        throw new UnauthorizedException("Token is about to expire");
      }
    }

    return payload;
  }

  async makeToken(
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

  async makeAccessToken(uid: string) {
    const roles = await this.rolesService.findByUid(uid);

    const payload: {
      [namespace: string]: HasuraClaims;
    } = {
      [this.configService.hasura.claimsNamespace]: {
        "x-hasura-user-id": uid,
        "x-hasura-allowed-roles": roles.map((role) => role.type),
        "x-hasura-default-role": "teacher",
      },
    };

    return this.makeToken({
      sub: uid,
      aud: ["api", "hasura"],
      exp: Math.floor(
        (Date.now() + this.configService.jwt.accessTokenMaxAge) / 1000,
      ),
      ...payload,
    });
  }

  async makeRefreshToken(uid: string) {
    return this.makeToken({
      sub: uid,
      aud: ["api"],
      exp: Math.floor(
        (Date.now() + this.configService.jwt.refreshTokenMaxAge) / 1000,
      ),
    });
  }

  async setAccessCookie(res: Response, uid: string) {
    const accessToken = await this.makeAccessToken(uid);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: this.configService.nodeEnv === "production",
      sameSite: "strict",
      maxAge: this.configService.jwt.accessTokenMaxAge,
      path: "/",
    });
  }

  async setRefreshCookie(res: Response, uid: string) {
    const refreshToken = await this.makeRefreshToken(uid);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: this.configService.nodeEnv === "production",
      sameSite: "strict",
      maxAge: this.configService.jwt.refreshTokenMaxAge,
      path: "/api/auth/refresh",
    });
  }

  newState(originalURL: string, redirectURI: string): string {
    const id = randomUUID();
    const expiresAt = Date.now() + this.configService.stateExpirationTime;
    this.stateRecord.set(id, { expiresAt, originalURL, redirectURI });
    return id;
  }

  getState(id: string): { originalURL: string; redirectURI: string } {
    const authState = this.stateRecord.get(id);
    if (!authState) {
      throw new UnauthorizedException("State not found");
    }
    const { expiresAt, ...rest } = authState;
    if (authState.expiresAt < Date.now()) {
      throw new UnauthorizedException("State has expired");
    }
    return rest;
  }
}
