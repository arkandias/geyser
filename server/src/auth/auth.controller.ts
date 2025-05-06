import { ConfigService } from "../config/config.service";
import { Cookies } from "../cookies/cookies.decorator";
import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";

import { AuthService } from "./auth.service";
import { KeycloakService } from "./keycloak.service";

@Controller("auth")
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private keycloakService: KeycloakService,
  ) {}

  @Get("verify")
  async verify(@Cookies("access_token") accessToken: string): Promise<void> {
    await this.authService.verifyToken(
      accessToken,
      this.configService.tokenMinValidity,
    );
  }

  @Get("refresh")
  async refresh(
    @Cookies() refreshToken: string,
    @Query("redirect") redirect: string = "/",
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    try {
      const { sub: uid } = await this.authService.verifyToken(refreshToken);
      await this.authService.setAccessCookie(res, uid);
      await this.authService.setRefreshCookie(res, uid);

      res.redirect(redirect);
    } catch (error) {
      const params = new URLSearchParams({ redirect });
      res.redirect(`/auth/login?${params.toString()}`);
    }
  }

  @Get("login")
  async login(
    @Query("redirect") redirect: string = "/",
    @Res({ passthrough: true }) res: Response,
  ) {
    const redirectURI = `${this.configService.rootURL}/api/auth/callback`;

    // Prevent CSRF attacks
    const stateId = this.authService.newState(redirect, redirectURI);

    // Building authentication URL
    const authUrl = new URL(this.configService.keycloak.authURL);
    authUrl.searchParams.append(
      "client_id",
      this.configService.keycloak.clientId,
    );
    authUrl.searchParams.append("redirect_uri", redirectURI);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", "openid email");
    authUrl.searchParams.append("state", stateId);

    res.redirect(authUrl.toString());
  }

  @Get("callback")
  async callback(
    @Query("code") code: string,
    @Query("state") state: string,
    @Res() res: Response,
  ): Promise<void> {
    const { originalURL, redirectURI } = this.authService.getState(state);
    const { accessToken } = await this.keycloakService.exchangeCodeForTokens(
      redirectURI,
      code,
    );
    const payload = await this.keycloakService.verifyToken(accessToken);
    const uid = String(payload["email"]);

    if (!uid) {
      throw new UnauthorizedException("Missing claim 'email' in token");
    }

    await this.authService.setAccessCookie(res, uid);
    await this.authService.setRefreshCookie(res, uid);
    return res.redirect(originalURL || "/");
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
