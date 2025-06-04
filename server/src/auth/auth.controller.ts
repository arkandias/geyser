import { AccessTokenPayload, errorMessage } from "@geyser/shared";
import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request, Response } from "express";

import { Cookies } from "../common/cookies.decorator";
import { ConfigService } from "../config/config.service";
import { AuthService } from "./auth.service";
import { CookiesService } from "./cookies.service";
import { JwtService } from "./jwt.service";
import { OidcService } from "./oidc.service";

@Controller("auth")
export class AuthController {
  loginCallbackUrl: URL;
  logoutCallbackUrl: URL;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private cookiesService: CookiesService,
    private jwtService: JwtService,
    private oidcService: OidcService,
  ) {
    this.loginCallbackUrl = new URL(
      "/auth/login/callback",
      this.configService.api.url,
    );
    this.logoutCallbackUrl = new URL(
      "/auth/logout/callback",
      this.configService.api.url,
    );
  }

  @Get("login")
  login(
    @Query("redirect_url") redirectUrl: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    const url = this.authService.validateRedirectUrl(redirectUrl);

    // Use state parameter to prevent CSRF attacks
    const stateId = this.authService.newState(url);

    // Building authentication URL
    const authUrl = new URL(this.oidcService.metadata.authUrl);
    authUrl.searchParams.set("client_id", this.configService.oidc.clientId);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("state", stateId);
    authUrl.searchParams.set("scope", "openid");
    authUrl.searchParams.set("redirect_uri", this.loginCallbackUrl.href);

    res.redirect(authUrl.toString());
  }

  @Get("login/callback")
  async callback(
    @Query("state") state: string | undefined,
    @Query("code") code: string | undefined,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (!state) {
      throw new UnauthorizedException("Missing state");
    }
    if (!code) {
      throw new UnauthorizedException("Missing code");
    }

    let redirectUrl: URL | null = null;
    try {
      redirectUrl = this.authService.getState(state, req).redirectUrl;

      const { accessToken: identityToken } =
        await this.oidcService.requestToken({
          client_id: this.configService.oidc.clientId,
          client_secret: this.configService.oidc.clientSecret,
          grant_type: "authorization_code",
          code,
          redirect_uri: this.loginCallbackUrl.href,
        });

      const { email: uid } = await this.oidcService.verifyToken(identityToken);
      await this.cookiesService.setAuthCookies(res, uid);

      if (redirectUrl) {
        res.redirect(redirectUrl.toString());
      } else {
        res
          .status(200)
          .contentType("text/plain")
          .send("Authentication successful");
      }
    } catch (error) {
      if (redirectUrl) {
        redirectUrl.searchParams.set("auth_error", errorMessage(error));
        res.redirect(redirectUrl.toString());
      } else {
        throw error;
      }
    }
  }

  @Get("logout")
  logout(
    @Query("redirect_url") redirectUrl: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): void {
    const url = this.authService.validateRedirectUrl(redirectUrl);

    const postLogoutRedirectUrl = this.logoutCallbackUrl;
    if (url) {
      postLogoutRedirectUrl.searchParams.set("redirect_url", url.href);
    }

    // Building logout URL
    const logoutUrl = new URL(this.oidcService.metadata.logoutUrl);
    if (url) {
      logoutUrl.searchParams.set(
        "post_logout_redirect_uri",
        postLogoutRedirectUrl.href,
      );
      logoutUrl.searchParams.set("client_id", "backend");
    }

    // Removing cookies
    this.cookiesService.unsetAuthCookies(res);

    res.redirect(logoutUrl.href);
  }

  @Get("logout/callback")
  postLogout(
    @Query("redirect_url") redirectUrl: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): void {
    const url = this.authService.validateRedirectUrl(redirectUrl);

    if (url) {
      res.redirect(url.href);
    }
  }

  @Get("token/verify")
  async verify(
    @Cookies("access_token") accessToken: string | undefined,
  ): Promise<AccessTokenPayload> {
    if (!accessToken) {
      throw new UnauthorizedException("Missing access token");
    }
    return this.jwtService.verifyAccessToken(accessToken);
  }

  @Post("token/refresh")
  async refresh(
    @Cookies("refresh_token") refreshToken: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException("Missing refresh token");
    }
    const { sub } = await this.jwtService.verifyRefreshToken(refreshToken);
    await this.cookiesService.setAuthCookies(res, sub);
  }
}
