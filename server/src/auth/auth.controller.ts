import { randomUUID } from "node:crypto";

import { ConfigService } from "../config/config.service";
import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Get("verify")
  async verify(@Req() req: Request): Promise<void> {
    await this.authService.verifyToken(req.cookies["access_token"]);
  }

  @Get("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { sub: uid } = await this.authService.verifyToken(
      req.cookies["refresh_token"],
    );
    await this.authService.setAccessCookie(res, uid);
    await this.authService.setRefreshCookie(res, uid);
  }

  @Post("login")
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // Prevent CSRF attacks
    const stateId = this.authService.newState(req.url);

    // Building authentication URL
    const authUrl = new URL("/auth/realms/geyser/protocol/openid-connect/auth");
    authUrl.searchParams.append("client_id", "geyser-backend");
    authUrl.searchParams.append(
      "redirect_uri",
      `${req.protocol}://${req.get("host")}/auth/callback`,
    );
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", "openid email");
    authUrl.searchParams.append("state", stateId);
    // todo: client secret

    res.redirect(authUrl.toString());
  }

  @Get("callback")
  async callback(
    @Query("code") code: string,
    @Query("state") state: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const redirectURL = this.authService.getState(state);
    const uid = await this.authService.exchangeCodeForTokens(
      code,
      req.get("host"),
    );
    await this.authService.setAccessCookie(res, uid);
    await this.authService.setRefreshCookie(res, uid);
    return res.redirect(redirectURL || "/");
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: this.configService.nodeEnv === "production",
      sameSite: "strict",
      path: "/",
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: this.configService.nodeEnv === "production",
      sameSite: "strict",
      path: "/api/refresh",
    });
  }
}
