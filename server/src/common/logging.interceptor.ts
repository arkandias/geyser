import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, finalize } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  private requestLogText(request: Request): string {
    return `${request.method} ${request.url} ${request.ip}`;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    this.logger.debug(`IN  | ${this.requestLogText(request)}`);

    const now = Date.now();
    return next.handle().pipe(
      finalize(() => {
        const response = ctx.getResponse<Response>();
        this.logger.debug(
          `OUT | ${this.requestLogText(response.req)} | Status: ${response.statusCode} | Duration: ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
