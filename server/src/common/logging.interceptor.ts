import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  private requestLogText(request: Request): string {
    return `${request.method} ${request.url} ${request.ip}`;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const now = Date.now();

    this.logger.debug(`IN  | ${this.requestLogText(request)}`);

    response.on("finish", () => {
      this.logger.debug(
        `OUT | ${this.requestLogText(request)} | Status: ${response.statusCode} | Duration: ${Date.now() - now}ms`,
      );
    });

    return next.handle();
  }
}
