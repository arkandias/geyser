import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";

import { ConfigService } from "./config.service";
import { envSchema } from "./env.dto";

@Module({
  imports: [
    NestConfigModule.forRoot({
      ignoreEnvFile: process.env["NODE_ENV"] === "production",
      envFilePath: [".env.development.local", ".env.development"],
      validate: (config: Record<string, unknown>) => envSchema.parse(config),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
