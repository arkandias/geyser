import { Injectable } from "@nestjs/common";
import { CookieOptions, Response } from "express";

import { ConfigService } from "../config/config.service";
import { JwtService } from "./jwt.service";

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
    orgId: number,
    userId: number,
  ): Promise<void> {
    const accessToken = await this.jwtService.makeAccessToken(orgId, userId);
    res.cookie("access_token", accessToken, this.accessCookieOptions());
  }

  async setRefreshCookie(
    res: Response,
    orgId: number,
    userId: number,
  ): Promise<void> {
    const refreshToken = await this.jwtService.makeRefreshToken(orgId, userId);
    res.cookie("refresh_token", refreshToken, this.refreshCookieOptions());
  }

  async setAuthCookies(
    res: Response,
    orgId: number,
    userId: number,
  ): Promise<void> {
    await this.setAccessCookie(res, orgId, userId);
    await this.setRefreshCookie(res, orgId, userId);
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
