import { errorMessage } from "@geyser/shared";
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request } from "express";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  override catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Only log 5xx errors (server errors)
    if (status >= 500) {
      this.logger.error({
        status,
        message: errorMessage(exception, "Internal server error"),
        request: {
          ip: request.ip,
          method: request.method,
          path: request.url,
          headers: request.headers,
        },
      });
    }

    super.catch(exception, host);
  }
}
