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

  const allowOrigin =
    configService.nodeEnv === "production"
      ? [configService.apiUrl.origin + "/*"] // todo
      : ["http://dev.geyser.localhost", "http://preview.geyser.localhost"];
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

  await app.listen(configService.port);
  logger.log(
    `Server running at http://localhost:${configService.port} (${configService.nodeEnv})`,
  );
}

void bootstrap();
