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

import { getHeader } from "../../common/utils";
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

    // Extract headers
    const orgId = z.coerce
      .number()
      .optional()
      .parse(getHeader(request, "x-org-id"));
    const userId = z.coerce
      .number()
      .optional()
      .parse(getHeader(request, "x-user-id"));
    const role = getHeader(request, "x-role");

    // Check for admin secret first
    const adminSecret = getHeader(request, "x-admin-secret");
    if (adminSecret) {
      if (adminSecret === this.configService.api.adminSecret) {
        // Admin: accept headers as-is
        request.auth = {
          orgId,
          userId,
          isAdmin: true,
          role,
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

    // Headers validation for non-admin user
    if (!payload.isAdmin) {
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

      // Validate X-Role header against JWT allowed roles
      if (role && !payload.allowedRoles.includes(role as RoleType)) {
        throw new UnauthorizedException(
          `X-Role header '${role}' not in user allowed roles from access token: [${payload.allowedRoles.join(", ")}]`,
        );
      }
    }

    // JWT validation successful
    request.auth = {
      orgId: payload.orgId,
      userId: payload.userId,
      isAdmin: payload.isAdmin,
      role: role ?? payload.defaultRole,
      jwtPayload: payload,
    };

    return true;
  }
}

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}
