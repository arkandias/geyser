import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";

import { AppModule } from "@/app.module";
import { LoggingInterceptor } from "@/common/logging.interceptor";
import { ConfigService } from "@/config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.api.allowedOrigins,
    credentials: true,
  });

  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.use(compression());

  if (configService.nodeEnv === "development") {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  await app.listen(configService.port);
  logger.log(
    `Server running at http://localhost:${configService.port} (${configService.nodeEnv})`,
  );
}

void bootstrap();
