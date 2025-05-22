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
import { OidcService } from "../oidc/oidc.service";
import { UsersService } from "../users/users.service";
import { CallbackQueryDto } from "./callback-query.dto";
import { JwtService } from "./jwt.service";
import { RedirectUrlDto } from "./redirect-url.dto";
import { StateService } from "./state.service";
import { UrlService } from "./url.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: JwtService,
    private configService: ConfigService,
    private oidcService: OidcService,
    private stateService: StateService,
    private urlService: UrlService,
    private usersService: UsersService,
  ) {}

  private async setUserCookies(res: Response, uid: string): Promise<void> {
    const user = await this.usersService.findByUid(uid);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    await this.authService.setAccessCookie(res, user);
    await this.authService.setRefreshCookie(res, user);
  }

  @Get("login")
  login(
    @Query() loginQueryDto: RedirectUrlDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { redirectUrl } = loginQueryDto;
    const url = this.urlService.validateRedirectUrl(redirectUrl);

    // Use state parameter to prevent CSRF attacks
    const stateId = this.stateService.newState(url);

    // Building authentication URL
    const authUrl = new URL(this.oidcService.metadata.authUrl);
    authUrl.searchParams.set("client_id", this.configService.oidc.clientId);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("state", stateId);
    authUrl.searchParams.set("scope", "openid");
    authUrl.searchParams.set(
      "redirect_uri",
      this.urlService.loginCallbackUrl.href,
    );

    res.redirect(authUrl.toString());
  }

  @Get("login/callback")
  async callback(
    @Query() callbackQueryDto: CallbackQueryDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { state, code } = callbackQueryDto;

    let redirectUrl: URL | null = null;
    try {
      redirectUrl = this.stateService.getState(state, req).redirectUrl;

      const { accessToken: identityToken } =
        await this.oidcService.requestToken({
          client_id: this.configService.oidc.clientId,
          client_secret: this.configService.oidc.clientSecret,
          grant_type: "authorization_code",
          code,
          redirect_uri: this.urlService.loginCallbackUrl.href,
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
    @Query() redirectUrlDto: RedirectUrlDto,
    @Res({ passthrough: true }) res: Response,
  ): void {
    const { redirectUrl } = redirectUrlDto;
    const url = this.urlService.validateRedirectUrl(redirectUrl);

    const postLogoutRedirectUrl = this.urlService.logoutCallbackUrl;
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
    this.authService.unsetAccessCookie(res);
    this.authService.unsetRefreshCookie(res);

    res.redirect(logoutUrl.href);
  }

  @Get("logout/callback")
  postLogout(
    @Query() redirectUrlDto: RedirectUrlDto,
    @Res({ passthrough: true }) res: Response,
  ): void {
    const { redirectUrl } = redirectUrlDto;
    const url = this.urlService.validateRedirectUrl(redirectUrl);

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
    return this.authService.verifyAccessToken(accessToken);
  }

  @Post("token/refresh")
  async refresh(
    @Cookies("refresh_token") refreshToken: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException("Missing refresh token");
    }
    const { sub } = await this.authService.verifyRefreshToken(refreshToken);
    await this.setUserCookies(res, sub);
  }
}
