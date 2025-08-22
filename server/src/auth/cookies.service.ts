import { Injectable } from "@nestjs/common";
import { CookieOptions, Response } from "express";

import { JwtService } from "@/auth/jwt.service";
import { ConfigService } from "@/config/config.service";

@Injectable()
export class CookiesService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private accessCookieOptions(): CookieOptions {
    return {
      domain: this.configService.api.url.hostname,
      httpOnly: true,
      secure: this.configService.api.url.protocol === "https:",
      sameSite: "lax",
      maxAge: this.configService.jwt.accessTokenMaxAge,
      path: this.configService.api.url.pathname.replace(/\/?$/, "/"),
    };
  }

  private refreshCookieOptions(): CookieOptions {
    return {
      domain: this.configService.api.url.hostname,
      httpOnly: true,
      secure: this.configService.api.url.protocol === "https:",
      sameSite: "lax",
      maxAge: this.configService.jwt.refreshTokenMaxAge,
      path: this.configService.api.url.pathname.replace(
        /\/?$/,
        "/auth/token/refresh",
      ),
    };
  }

  async setAccessCookie(
    res: Response,
    data: {
      orgId: number;
      userId: number;
      hasAccess: boolean;
      isAdmin: boolean;
    },
  ): Promise<void> {
    const accessToken = await this.jwtService.makeAccessToken(data);
    res.cookie("access_token", accessToken, this.accessCookieOptions());
  }

  async setRefreshCookie(
    res: Response,
    data: {
      orgId: number;
      userId: number;
      hasAccess: boolean;
      isAdmin: boolean;
    },
  ): Promise<void> {
    const refreshToken = await this.jwtService.makeRefreshToken(data);
    res.cookie("refresh_token", refreshToken, this.refreshCookieOptions());
  }

  async setAuthCookies(
    res: Response,
    data: {
      orgId: number;
      userId: number;
      hasAccess: boolean;
      isAdmin: boolean;
    },
  ): Promise<void> {
    await this.setAccessCookie(res, data);
    await this.setRefreshCookie(res, data);
  }

  unsetAccessCookie(res: Response): void {
    res.clearCookie("access_token", this.accessCookieOptions());
  }

  unsetRefreshCookie(res: Response): void {
    res.clearCookie("refresh_token", this.refreshCookieOptions());
  }

  unsetAuthCookies(res: Response): void {
    this.unsetAccessCookie(res);
    this.unsetRefreshCookie(res);
  }
}
