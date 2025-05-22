import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { UrlService } from "./auth/url.service";
import { LoggingInterceptor } from "./common/logging.interceptor";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger("Bootstrap");
  const configService = app.get(ConfigService);
  const urlService = app.get(UrlService);

  const origin = urlService.subdomains;
  const credentials = true;
  logger.log("CORS configuration:");
  logger.log(`- Allow origin: ${origin}`);
  logger.log(`- Credentials: ${credentials}`);
  app.enableCors({
    origin: origin,
    credentials,
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
