import { Env } from "../config/env.schema";
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private configService: ConfigService<Env, true>,
    private authService: AuthService,
  ) {}

  @Get("check")
  async check(@Req() request: Request): Promise<void> {
    // todo: check access_token, if not try to refresh; return 200 or 401
    // todo: return expiration infos, etc.
  }

  @Post("login")
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Authorization token is required");
    }

    const token = authHeader.substring(7);

    const { accessToken } = await this.authService.exchangeToken(token);

    response.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: this.configService.getOrThrow("NODE_ENV") === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds todo: align with token expireAt
      path: "/",
    });

    // todo: refresh cookie
    response.cookie("refresh_token", accessToken, {
      httpOnly: true,
      secure: this.configService.nodeEnv === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds todo: align with token expireAt
      path: "/api/auth/refresh",
    });

    return { token: accessToken };
  }

  @Post("refresh")
  async refresh(@Req() request: Request): Promise<void> {
    // todo: return 200 or 401
  }

  @Post("logout")
  async logout(@Req() request: Request): Promise<void> {
    // todo: delete cookies; return 200
  }
}
