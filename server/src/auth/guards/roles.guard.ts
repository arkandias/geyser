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

import { ConfigService } from "../../config/config.service";
import { JwtService } from "../jwt.service";
import { AuthGuard } from "./auth.guard";

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

    // Get the required roles from the decorator metadata
    const requiredRoles = this.reflector.getAllAndOverride<
      string[] | undefined
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    // If no roles are specified, just authentication is enough
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    // Super admin bypasses all role checks
    if (request.auth?.isSuperAdmin) {
      return true;
    }

    // For JWT users, check if their role matches any of the required roles
    const userRole = request.auth?.userRole;
    if (!userRole) {
      throw new ForbiddenException("User role not found");
    }

    const hasRole = requiredRoles.includes(userRole);
    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required roles: [${requiredRoles.join(", ")}], user role: ${userRole}`,
      );
    }

    return true;
  }
}

export function Roles(...roles: string[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
}
