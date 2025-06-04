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
      domain: this.configService.parentDomain,
      httpOnly: true,
      secure: this.configService.api.url.protocol === "https:",
      sameSite: "lax",
      maxAge: this.configService.jwt.accessTokenMaxAge,
      path: "/",
    };
  }

  private refreshCookieOptions(): CookieOptions {
    return {
      domain: this.configService.parentDomain,
      httpOnly: true,
      secure: this.configService.api.url.protocol === "https:",
      sameSite: "lax",
      maxAge: this.configService.jwt.refreshTokenMaxAge,
      path: "/auth/token/refresh",
    };
  }

  async setAccessCookie(res: Response, uid: string): Promise<void> {
    const accessToken = await this.jwtService.makeAccessToken(uid);
    res.cookie("access_token", accessToken, this.accessCookieOptions());
  }

  async setRefreshCookie(res: Response, uid: string): Promise<void> {
    const refreshToken = await this.jwtService.makeRefreshToken(uid);
    res.cookie("refresh_token", refreshToken, this.refreshCookieOptions());
  }

  async setAuthCookies(res: Response, uid: string): Promise<void> {
    await this.setAccessCookie(res, uid);
    await this.setRefreshCookie(res, uid);
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
