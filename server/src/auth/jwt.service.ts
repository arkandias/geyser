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
import jose from "jose";

import { ConfigService } from "../config/config.service";
import { KeysService } from "../keys/keys.service";
import { RolesService } from "../roles/roles.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtService {
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

  async makeAccessToken(uid: string): Promise<string> {
    const user = await this.usersService.findByUid(uid);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const roles = await this.rolesService.findByUid(uid);
    const roleTypes = roles
      .map((role) => roleTypeSchema.parse(role.type))
      .concat("teacher")
      .sort();

    return this.makeToken({
      sub: uid,
      aud: this.configService.api.url.href,
      exp: Math.floor(
        (Date.now() + this.configService.jwt.accessTokenMaxAge) / 1000,
      ),
      typ: "Bearer",
      userId: uid,
      allowedRoles: roleTypes,
      defaultRole: "teacher",
      displayname: user.displayname,
      active: user.active,
    } satisfies OmitWithIndex<AccessTokenPayload, "iss" | "iat" | "jti">);
  }

  async makeRefreshToken(uid: string): Promise<string> {
    return this.makeToken({
      sub: uid,
      aud: this.configService.api.url.href,
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
}
