import { Logger } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/all-exceptions.filter";
import { LoggingInterceptor } from "./common/logging.interceptor";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger("Bootstrap");
  const configService = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);

  const allowOrigin =
    configService.nodeEnv === "production"
      ? [configService.api.origin]
      : ["http://localhost", "http://localhost:5173"];
  const credentials = true;
  logger.log("CORS configuration:");
  logger.log(`- Allow origin: ${allowOrigin.join(", ")}`);
  logger.log(`- Credentials: ${credentials}`);
  app.enableCors({
    origin: allowOrigin,
    credentials,
  });

  app.use(cookieParser());
  if (configService.nodeEnv === "development") {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(configService.port);
  logger.log(
    `Server running at http://localhost:${configService.port} (${configService.nodeEnv})`,
  );
}

void bootstrap();
