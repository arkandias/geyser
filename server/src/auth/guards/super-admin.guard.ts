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

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract the admin secret from headers
    const adminSecret = request.headers["x-admin-secret"] as string;

    if (!adminSecret) {
      throw new UnauthorizedException("X-Admin-Secret header is required");
    }

    if (adminSecret !== this.configService.api.adminSecret) {
      throw new UnauthorizedException("Invalid admin secret");
    }

    // Mark the request as super admin authenticated
    request.auth = {
      ...(request.auth ?? {}),
      isSuperAdmin: true,
    };

    return true;
  }
}

export function SuperAdmin() {
  return applyDecorators(UseGuards(SuperAdminGuard));
}
