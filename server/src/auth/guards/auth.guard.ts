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
    const userId = Array.isArray(request.headers["x-user-id"])
      ? request.headers["x-user-id"].at(-1) // Last value
      : request.headers["x-user-id"];
    const userRole = Array.isArray(request.headers["x-user-role"])
      ? request.headers["x-user-role"].at(-1) // Last value
      : request.headers["x-user-role"];

    // Check for super admin authentication first
    const adminSecret = request.headers["x-admin-secret"] as string;
    if (adminSecret) {
      if (adminSecret === this.configService.api.adminSecret) {
        // Super admin: accept headers as-is
        request.auth = {
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

    // Validate X-User-Id header against JWT
    if (userId && userId !== payload.userId) {
      throw new UnauthorizedException(
        `X-User-Id header '${userId}' does not match user id '${payload.userId}'`,
      );
    }

    // Validate X-User-Role against JWT allowed roles
    const userRoleWithDefault = userRole ?? payload.defaultRole;
    if (!payload.allowedRoles.includes(userRoleWithDefault as RoleType)) {
      throw new UnauthorizedException(
        `${userRole ? "X-User-Role header" : "User default role"} '${userRoleWithDefault}' not in user allowed roles: [${payload.allowedRoles.join(", ")}]`,
      );
    }

    // JWT validation successful
    request.auth = {
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
