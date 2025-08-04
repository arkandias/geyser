import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";

import { ConfigService } from "./config.service";
import { envSchema } from "./env.schema";

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: false,
      ignoreEnvFile: process.env["NODE_ENV"] === "production",
      validate: (config: Record<string, unknown>) => envSchema.parse(config),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
