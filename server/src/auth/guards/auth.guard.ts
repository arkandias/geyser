import { RoleType } from "@geyser/shared";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from "@nestjs/common";
import { Request } from "express";
import { z } from "zod/v4";

import { ConfigService } from "../../config/config.service";
import { JwtService } from "../jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract required headers
    const orgId = z.coerce
      .number()
      .optional()
      .parse(
        Array.isArray(request.headers["x-org-id"])
          ? request.headers["x-org-id"].at(-1) // Last value
          : request.headers["x-org-id"],
      );
    const userId = z.coerce
      .number()
      .optional()
      .parse(
        Array.isArray(request.headers["x-user-id"])
          ? request.headers["x-user-id"].at(-1) // Last value
          : request.headers["x-user-id"],
      );
    const userRole = Array.isArray(request.headers["x-user-role"])
      ? request.headers["x-user-role"].at(-1) // Last value
      : request.headers["x-user-role"];

    // Check for super admin authentication first
    const adminSecret = request.headers["x-admin-secret"] as string;
    if (adminSecret) {
      if (adminSecret === this.configService.api.adminSecret) {
        // Super admin: accept headers as-is
        request.auth = {
          orgId,
          userId,
          userRole,
          isSuperAdmin: true,
        };
        return true;
      } else {
        throw new UnauthorizedException("Invalid admin secret");
      }
    }

    // Fall back to JWT authentication
    const accessToken = request.cookies["access_token"] as string | undefined;

    if (!accessToken) {
      throw new UnauthorizedException(
        "Authentication required: provide either X-Admin-Secret header or valid JWT token",
      );
    }

    // Verify JWT token
    const payload = await this.jwtService.verifyAccessToken(accessToken);

    // Validate X-Org-Id header against JWT
    if (orgId && orgId !== payload.orgId) {
      throw new UnauthorizedException(
        `X-Org-Id header '${orgId}' does not match organization id '${payload.orgId}' from access token`,
      );
    }

    // Validate X-User-Id header against JWT
    if (userId && userId !== payload.userId) {
      throw new UnauthorizedException(
        `X-User-Id header '${userId}' does not match user id '${payload.userId}' from access token`,
      );
    }

    // Validate X-User-Role header against JWT allowed roles
    const userRoleWithDefault = userRole ?? payload.defaultRole;
    if (!payload.allowedRoles.includes(userRoleWithDefault as RoleType)) {
      throw new UnauthorizedException(
        `${userRole ? "X-User-Role header" : "User default role"} '${userRoleWithDefault}' not in user allowed roles from access token: [${payload.allowedRoles.join(", ")}]`,
      );
    }

    // JWT validation successful
    request.auth = {
      orgId: payload.orgId,
      userId: payload.userId,
      userRole: userRoleWithDefault,
      jwtPayload: payload,
      isSuperAdmin: false,
    };

    return true;
  }
}

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}
