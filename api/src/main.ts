import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger("Bootstrap");
  const configService = app.get(ConfigService);

  const allowOrigin =
    configService.nodeEnv === "production" ? configService.api.origin : "*";
  logger.log(`CORS enabled: ${allowOrigin}`);
  app.enableCors({
    origin: allowOrigin,
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(configService.port);
  logger.log(
    `Server running at http://localhost:${configService.port} (${configService.nodeEnv})`,
  );
}

void bootstrap();
