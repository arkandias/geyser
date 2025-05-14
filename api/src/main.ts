import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin:
      configService.nodeEnv === "production" ? configService.api.origin : "*",
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(configService.port);
  console.log(
    `Application is running on: http://localhost:${configService.port}`,
  );
}

void bootstrap();
