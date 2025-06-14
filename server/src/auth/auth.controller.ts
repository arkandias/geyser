import { AccessTokenPayload, errorMessage } from "@geyser/shared";
import {
  BadRequestException,
  Controller,
  Get,
  Head,
  NotFoundException,
  Param,
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
  readonly callbackUrl: URL;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private cookiesService: CookiesService,
    private jwtService: JwtService,
    private oidcService: OidcService,
    private organizationService: OrganizationService,
    private userService: UserService,
  ) {
    this.callbackUrl = new URL(
      this.configService.api.url.href.replace(/\/$/, "") + "/auth/callback",
    );
  }

  @Head("org/:key")
  async checkOrganization(@Param("key") key: string): Promise<void> {
    const exists = await this.organizationService.exists(key);
    if (!exists) {
      throw new NotFoundException("Organization not found");
    }
  }

  @Get("login")
  login(
    @Query("organization_key") organizationKey: string | undefined,
    @Query("redirect_url") redirectUrl: string | undefined,
    @Res() res: Response,
  ) {
    if (!organizationKey) {
      throw new BadRequestException("Missing organization_key query param");
    }

    // Use state parameter to prevent CSRF attacks
    const stateId = this.authService.setState({ organizationKey, redirectUrl });

    // Building authentication URL
    const authUrl = new URL(this.oidcService.metadata.authUrl);
    authUrl.searchParams.set("client_id", this.configService.oidc.clientId);
    authUrl.searchParams.set("redirect_uri", this.callbackUrl.href);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "email");
    authUrl.searchParams.set("prompt", "login");
    authUrl.searchParams.set("state", stateId);

    res.redirect(authUrl.href);
  }

  @Get("callback")
  async callback(
    @Query("code") code: string | undefined,
    @Query("state") state: string | undefined,
    @Res() res: Response,
  ): Promise<void> {
    let redirectUrl: URL | null = null;
    try {
      if (!code) {
        throw new BadRequestException("Missing code");
      }
      if (!state) {
        throw new BadRequestException("Missing state");
      }

      const { organizationKey: key, redirectUrl: url } =
        this.authService.getState(state);
      redirectUrl = url;

      const organization = await this.organizationService.findByKey(key);
      if (!organization) {
        throw new UnauthorizedException(`Organization '${key}' not found`);
      }

      const { accessToken: identityToken } =
        await this.oidcService.requestToken({
          client_id: this.configService.oidc.clientId,
          client_secret: this.configService.oidc.clientSecret,
          grant_type: "authorization_code",
          code,
          redirect_uri: this.callbackUrl.href,
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

  @Post("logout")
  logout(@Res() res: Response): void {
    this.cookiesService.unsetAuthCookies(res);
    res.status(200).json({ message: "Logged out" });
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
