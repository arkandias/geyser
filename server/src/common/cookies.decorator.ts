import { type ExecutionContext, createParamDecorator } from "@nestjs/common";
import type { Request } from "express";

export const Cookies = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (data ? request.cookies[data] : request.cookies) as
      | string
      | undefined;
  },
);
