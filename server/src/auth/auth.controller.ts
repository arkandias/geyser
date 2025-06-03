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
import { UsersService } from "../users/users.service";
import { JwtService } from "./jwt.service";
import { OidcService } from "./oidc.service";
import { StateService } from "./state.service";

@Controller("auth")
export class AuthController {
  loginCallbackUrl: URL;
  logoutCallbackUrl: URL;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private oidcService: OidcService,
    private stateService: StateService,
    private usersService: UsersService,
  ) {
    this.loginCallbackUrl = new URL(
      "/auth/login/callback",
      this.configService.apiUrl,
    );
    this.logoutCallbackUrl = new URL(
      "/auth/logout/callback",
      this.configService.apiUrl,
    );
  }

  @Get("login")
  login(
    @Query("redirect_url") redirectUrl: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    const url = this.validateRedirectUrl(redirectUrl);

    // Use state parameter to prevent CSRF attacks
    const stateId = this.stateService.newState(url);

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
      redirectUrl = this.stateService.getState(state, req).redirectUrl;

      const { accessToken: identityToken } =
        await this.oidcService.requestToken({
          client_id: this.configService.oidc.clientId,
          client_secret: this.configService.oidc.clientSecret,
          grant_type: "authorization_code",
          code,
          redirect_uri: this.loginCallbackUrl.href,
        });

      const { uid } = await this.oidcService.verifyToken(identityToken);
      await this.setUserCookies(res, uid);

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
    const url = this.validateRedirectUrl(redirectUrl);

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
    this.jwtService.unsetAccessCookie(res);
    this.jwtService.unsetRefreshCookie(res);

    res.redirect(logoutUrl.href);
  }

  @Get("logout/callback")
  postLogout(
    @Query("redirect_url") redirectUrl: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): void {
    const url = this.validateRedirectUrl(redirectUrl);

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
    await this.setUserCookies(res, sub);
  }

  private validateRedirectUrl(redirectUrl: string | undefined): URL | null {
    if (!redirectUrl) {
      return null;
    }

    let url: URL;
    try {
      url = new URL(redirectUrl);
    } catch (_) {
      throw new UnauthorizedException("Invalid redirect URL");
    }

    if (
      url.protocol === this.configService.apiUrl.protocol &&
      url.hostname.endsWith(this.configService.parentDomain)
    ) {
      return url;
    }

    throw new UnauthorizedException("Redirect URL not allowed");
  }

  private async setUserCookies(res: Response, uid: string): Promise<void> {
    const user = await this.usersService.findByUid(uid);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    await this.jwtService.setAccessCookie(res, user);
    await this.jwtService.setRefreshCookie(res, user);
  }
}
