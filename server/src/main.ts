import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./common/logging.interceptor";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger("Bootstrap");
  const configService = app.get(ConfigService);

  logger.log("CORS configuration:");
  logger.log(`- Allow origin: ${configService.origin}`);
  logger.log(`- Credentials: true`);
  app.enableCors({
    origin: configService.origin,
    credentials: true,
  });

  app.use(cookieParser());
  if (configService.nodeEnv === "development") {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  await app.listen(configService.port);
  logger.log(
    `Server running at http://localhost:${configService.port} (${configService.nodeEnv})`,
  );
}

void bootstrap();
