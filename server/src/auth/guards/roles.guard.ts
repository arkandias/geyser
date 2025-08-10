import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { AuthGuard } from "@/auth/guards/auth.guard";
import { JwtService } from "@/auth/jwt.service";
import { ConfigService } from "@/config/config.service";

export const ROLES_KEY = "roles";

@Injectable()
export class RolesGuard extends AuthGuard implements CanActivate {
  constructor(
    configService: ConfigService,
    jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super(configService, jwtService);
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, run the parent AuthGuard validation
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      return false;
    }

    // Get the authorized roles from the decorator metadata
    const authorizedRoles = this.reflector.getAllAndOverride<
      string[] | undefined
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    // If no roles are specified, just authentication is enough
    if (!authorizedRoles || authorizedRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    // Admin bypasses all role checks
    if (request.auth?.isAdmin) {
      return true;
    }

    // For users, check if their role matches any of the required roles
    const userRole = request.auth?.role;
    if (!userRole) {
      throw new ForbiddenException("User role not found");
    }
    if (!authorizedRoles.includes(userRole)) {
      throw new ForbiddenException(
        `Access denied. Authorized roles: [${authorizedRoles.join(", ")}], user role: ${userRole}`,
      );
    }

    return true;
  }
}

export function Roles(...roles: string[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
}
