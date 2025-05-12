import { Cookies } from "../common/cookies.decorator";
import { ConfigService } from "../config/config.service";
import type { AccessTokenClaims } from "@geyser/shared";
import { Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import type { Response } from "express";

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
  async verify(
    @Cookies("access_token") accessToken: string,
  ): Promise<AccessTokenClaims> {
    return await this.authService.verifyAccessToken(accessToken);
  }

  @Post("refresh")
  async refresh(
    @Cookies("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { sub: uid } =
      await this.authService.verifyRefreshToken(refreshToken);
    await this.authService.setAccessCookie(res, uid);
    await this.authService.setRefreshCookie(res, uid);
    res.status(HttpStatus.OK);
  }

  @Get("login")
  login(
    @Query("redirect") redirectURL: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    const callbackURL = `${this.configService.apiURL}/auth/callback`;

    // Use state parameter to prevent CSRF attacks
    const stateId = this.authService.newState(
      { redirect_uri: callbackURL },
      redirectURL,
    );

    // Building authentication URL
    const authUrl = new URL(this.configService.keycloak.authURL);
    authUrl.searchParams.append(
      "client_id",
      this.configService.keycloak.clientId,
    );
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("state", stateId);
    authUrl.searchParams.append("scope", "openid");
    authUrl.searchParams.append("redirect_uri", callbackURL);

    res.redirect(authUrl.toString());
  }

  @Get("callback")
  async callback(
    @Query("code") code: string,
    @Query("state") state: string,
    @Res() res: Response,
  ): Promise<void> {
    const { parameters, redirectURL } = this.authService.getState(state);
    const { accessToken } = await this.keycloakService.requestToken({
      client_id: this.configService.keycloak.clientId,
      client_secret: this.configService.keycloak.clientSecret,
      grant_type: "authorization_code",
      code,
      ...parameters,
    });
    const { uid } = await this.keycloakService.verifyToken(accessToken);

    await this.authService.setAccessCookie(res, uid);
    await this.authService.setRefreshCookie(res, uid);

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    res.redirect(redirectURL || this.configService.apiURL);
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response): void {
    this.authService.unsetAccessCookie(res);
    this.authService.unsetRefreshCookie(res);
    res.status(HttpStatus.NO_CONTENT);
  }
}
