import type { LogLevel } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const logLevels: LogLevel[] =
    process.env["NODE_ENV"] === "development"
      ? ["error", "warn", "log", "debug"]
      : ["error", "warn", "log"];

  // todo: logging
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  app.use(cookieParser());

  // todo: CORS
  // Enable CORS
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true, // Essential for cookies
    allowedHeaders: ["Content-Type", "Authorization", "x-hasura-role"], // Add any custom headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: false, // This is important for OPTIONS requests
    optionsSuccessStatus: 204, // This ensures OPTIONS returns 204 status
  });

  const configService = app.get(ConfigService);
  const port = configService.port;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

void bootstrap();
