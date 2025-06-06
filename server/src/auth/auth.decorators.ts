import { type ExecutionContext, createParamDecorator } from "@nestjs/common";
import type { Request } from "express";

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): number | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.auth) {
      throw new Error("UserId decorator can only be used with AuthGuard");
    }

    return request.auth.userId;
  },
);

export const UserRole = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.auth) {
      throw new Error("UserRole decorator can only be used with AuthGuard");
    }

    return request.auth.userRole;
  },
);

export const IsSuperAdmin = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): boolean => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.auth) {
      throw new Error("IsSuperAdmin decorator can only be used with AuthGuard");
    }

    return request.auth.isSuperAdmin ?? false;
  },
);
