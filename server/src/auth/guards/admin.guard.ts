import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from "@nestjs/common";
import { Request } from "express";

import { AuthGuard } from "./auth.guard";

@Injectable()
export class AdminGuard extends AuthGuard implements CanActivate {
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, run the parent AuthGuard validation
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest<Request>();

    if (!request.auth?.isAdmin) {
      throw new UnauthorizedException("Admin access denied");
    }

    return true;
  }
}

export function Admin() {
  return applyDecorators(UseGuards(AdminGuard));
}
