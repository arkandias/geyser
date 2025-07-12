import { AccessTokenPayload, errorMessage } from "@geyser/shared";
import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import type { Response } from "express";

import { Cookies } from "../common/cookies.decorator";
import { ConfigService } from "../config/config.service";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { CookiesService } from "./cookies.service";
import { JwtService } from "./jwt.service";
import { OidcService } from "./oidc.service";

@Controller("auth")
export class AuthController {
  readonly postLoginUrl: URL;
  readonly postLogoutUrl: URL;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private cookiesService: CookiesService,
    private jwtService: JwtService,
    private oidcService: OidcService,
    private userService: UserService,
  ) {
    this.postLoginUrl = new URL(
      this.configService.api.url.href.replace(/\/$/, "") +
        "/auth/login/callback",
    );
    this.postLogoutUrl = new URL(
      this.configService.api.url.href.replace(/\/$/, "") +
        "/auth/logout/callback",
    );
  }

  @Get("login")
  login(
    @Query("org_id", ParseIntPipe) orgId: number,
    @Query("redirect_url") redirectUrl: string | undefined,
    @Res() res: Response,
  ): void {
    // Use state parameter to prevent CSRF attacks
    const stateId = this.authService.setState({ orgId, redirectUrl });

    // Building authentication URL
    const authUrl = new URL(this.oidcService.metadata.authUrl);
    authUrl.searchParams.set("client_id", this.configService.oidc.clientId);
    authUrl.searchParams.set("redirect_uri", this.postLoginUrl.href);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "email");
    authUrl.searchParams.set("prompt", "login");
    authUrl.searchParams.set("state", stateId);

    res.redirect(authUrl.href);
  }

  @Get("login/callback")
  async loginCallback(
    @Query("error") error: string | undefined,
    @Query("error_description") errorDescription: string | undefined,
    @Query("code") code: string | undefined,
    @Query("state") state: string | undefined,
    @Res() res: Response,
  ): Promise<void> {
    if (error) {
      throw new InternalServerErrorException(
        `Identity provider returned error ${error}: ${errorDescription}`,
      );
    }

    let redirectUrl: URL | null = null;
    try {
      if (!code) {
        throw new BadRequestException("Missing code");
      }
      if (!state) {
        throw new BadRequestException("Missing state");
      }

      const { orgId, ...rest } = this.authService.getState(state);
      redirectUrl = rest.redirectUrl;

      const identityToken = await this.oidcService.requestToken({
        client_id: this.configService.oidc.clientId,
        client_secret: this.configService.oidc.clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: this.postLoginUrl.href,
      });

      const { email, roles } =
        await this.oidcService.verifyToken(identityToken);

      const user = await this.userService.findByOidEmail(orgId, email);
      const isAdmin = !!roles?.includes("admin");

      if (!isAdmin) {
        if (!user) {
          throw new UnauthorizedException(
            `User '${email}' not found in organization ${orgId}`,
          );
        }
        if (!user.access) {
          throw new UnauthorizedException("User does not have access");
        }
      }

      await this.cookiesService.setAuthCookies(
        res,
        orgId,
        user?.id ?? 0, // 0 is a special id for non-user admin
        isAdmin,
      );

      if (redirectUrl) {
        redirectUrl.searchParams.set("post_login", "true");
        res.redirect(redirectUrl.href);
      } else {
        res.status(200).json({ message: "Logged in" });
      }
    } catch (error) {
      if (redirectUrl) {
        redirectUrl.searchParams.set("auth_error", errorMessage(error));
        res.redirect(redirectUrl.href);
      } else {
        throw error;
      }
    }
  }

  @Get("logout")
  logout(
    @Query("org_id", ParseIntPipe) orgId: number,
    @Query("redirect_url") redirectUrl: string | undefined,
    @Res() res: Response,
  ): void {
    // Use state parameter to prevent CSRF attacks
    const stateId = this.authService.setState({ orgId, redirectUrl });

    // Building logout URL
    const logoutUrl = new URL(this.oidcService.metadata.logoutUrl);
    logoutUrl.searchParams.set("client_id", this.configService.oidc.clientId);
    logoutUrl.searchParams.set(
      "post_logout_redirect_uri",
      this.postLogoutUrl.href,
    );
    logoutUrl.searchParams.set("state", stateId);

    // Removing cookies
    this.cookiesService.unsetAuthCookies(res);

    res.redirect(logoutUrl.href);
  }

  @Get("logout/callback")
  logoutCallback(
    @Query("error") error: string | undefined,
    @Query("error_description") errorDescription: string | undefined,
    @Query("state") state: string | undefined,
    @Res() res: Response,
  ): void {
    if (error) {
      throw new InternalServerErrorException(
        `Identity provider returned error ${error}: ${errorDescription}`,
      );
    }

    let redirectUrl: URL | null = null;
    try {
      if (!state) {
        throw new BadRequestException("Missing state");
      }

      redirectUrl = this.authService.getState(state).redirectUrl;

      if (redirectUrl) {
        redirectUrl.searchParams.set("post_logout", "true");
        res.redirect(redirectUrl.href);
      } else {
        res.status(200).json({ message: "Logged out" });
      }
    } catch (error) {
      if (redirectUrl) {
        redirectUrl.searchParams.set("auth_error", errorMessage(error));
        res.redirect(redirectUrl.href);
      } else {
        throw error;
      }
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
    @Res() res: Response,
  ): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException("Missing refresh token");
    }
    const { orgId, userId, isAdmin } =
      await this.jwtService.verifyRefreshToken(refreshToken);
    await this.cookiesService.setAuthCookies(res, orgId, userId, isAdmin);

    res.status(200).json({ message: "Token refreshed successfully" });
  }
}
