import { LogLevel } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { Env } from "./config/env.schema";

async function bootstrap() {
  const logLevels: LogLevel[] =
    process.env["NODE_ENV"] === "development"
      ? ["error", "warn", "log", "debug"]
      : ["error", "warn", "log"];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  app.use(cookieParser());

  // Enable CORS
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true, // Essential for cookies
    allowedHeaders: ["Content-Type", "Authorization", "x-hasura-role"], // Add any custom headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: false, // This is important for OPTIONS requests
    optionsSuccessStatus: 204, // This ensures OPTIONS returns 204 status
  });

  const configService = app.get(ConfigService<Env, true>);
  const port = configService.getOrThrow("PORT");

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
