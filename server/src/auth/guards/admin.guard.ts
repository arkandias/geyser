import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from "@nestjs/common";
import { Request } from "express";

import { AuthGuard } from "@/auth/guards/auth.guard";

@Injectable()
export class AdminGuard extends AuthGuard implements CanActivate {
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, run the parent AuthGuard validation
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      throw new UnauthorizedException("Authentication required");
    }

    const request = context.switchToHttp().getRequest<Request>();

    if (!request.auth?.isAdmin) {
      throw new ForbiddenException("Admin access denied");
    }

    return true;
  }
}

export function Admin() {
  return applyDecorators(UseGuards(AdminGuard));
}
