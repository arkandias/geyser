import { AccessTokenPayload, errorMessage } from "@geyser/shared";
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import type { Response } from "express";

import { Cookies } from "../common/cookies.decorator";
import { ConfigService } from "../config/config.service";
import { OrganizationService } from "../organization/organization.service";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { CookiesService } from "./cookies.service";
import { JwtService } from "./jwt.service";
import { OidcService } from "./oidc.service";

@Controller("auth")
export class AuthController {
  readonly loginCallbackUrl: URL;
  readonly logoutCallbackUrl: URL;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private cookiesService: CookiesService,
    private jwtService: JwtService,
    private oidcService: OidcService,
    private organizationService: OrganizationService,
    private userService: UserService,
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
    @Res() res: Response,
  ) {
    if (!redirectUrl) {
      throw new BadRequestException("Missing redirect URL");
    }

    // Use state parameter to prevent CSRF attacks
    const stateId = this.authService.newState(redirectUrl);

    // Building authentication URL
    const authUrl = new URL(this.oidcService.metadata.authUrl);
    authUrl.searchParams.set("client_id", this.configService.oidc.clientId);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("state", stateId);
    authUrl.searchParams.set("scope", "openid");
    authUrl.searchParams.set("redirect_uri", this.loginCallbackUrl.href);

    res.redirect(authUrl.href);
  }

  @Get("login/callback")
  async loginCallback(
    @Query("state") state: string | undefined,
    @Query("code") code: string | undefined,
    @Res() res: Response,
  ): Promise<void> {
    if (!state) {
      throw new BadRequestException("Missing state");
    }
    if (!code) {
      throw new BadRequestException("Missing code");
    }

    const { redirectUrl } = this.authService.getState(state);
    const subdomain = redirectUrl?.hostname.split(".")[0] ?? "";
    const key =
      this.configService.nodeEnv === "development" &&
      this.configService.organizationKey
        ? this.configService.organizationKey
        : subdomain;

    try {
      const organization = await this.organizationService.findByKey(key);
      if (!organization) {
        throw new UnauthorizedException(
          `Organization '${subdomain}' not found`,
        );
      }

      const { accessToken: identityToken } =
        await this.oidcService.requestToken({
          client_id: this.configService.oidc.clientId,
          client_secret: this.configService.oidc.clientSecret,
          grant_type: "authorization_code",
          code,
          redirect_uri: this.loginCallbackUrl.href,
        });

      const { email } = await this.oidcService.verifyToken(identityToken);

      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException(`User '${email}' not found`);
      }
      if (!user.access) {
        throw new UnauthorizedException("User does not have access");
      }

      await this.cookiesService.setAuthCookies(res, organization.id, user.id);

      if (redirectUrl) {
        res.redirect(redirectUrl.toString());
      } else {
        res.status(200).json({ message: "Logged in" });
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
    @Res() res: Response,
  ): void {
    if (!redirectUrl) {
      throw new BadRequestException("Missing redirect URL");
    }

    // Use state parameter to prevent CSRF attacks
    const stateId = this.authService.newState(redirectUrl);

    // Building logout URL
    const logoutUrl = new URL(this.oidcService.metadata.logoutUrl);
    logoutUrl.searchParams.set("client_id", this.configService.oidc.clientId);
    logoutUrl.searchParams.set("state", stateId);
    logoutUrl.searchParams.set(
      "post_logout_redirect_uri",
      this.logoutCallbackUrl.href,
    );

    // Removing cookies
    this.cookiesService.unsetAuthCookies(res);

    res.redirect(logoutUrl.href);
  }

  @Get("logout/callback")
  logoutCallback(
    @Query("state") state: string | undefined,
    @Res() res: Response,
  ): void {
    if (!state) {
      throw new BadRequestException("Missing state");
    }

    const redirectUrl = this.authService.getState(state).redirectUrl;
    if (redirectUrl) {
      res.redirect(redirectUrl.href);
    } else {
      res.status(200).json({ message: "Logged out" });
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
    const { orgId, userId } =
      await this.jwtService.verifyRefreshToken(refreshToken);
    await this.cookiesService.setAuthCookies(res, orgId, userId);

    res.status(200).json({ message: "Token refreshed successfully" });
  }
}
