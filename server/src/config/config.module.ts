import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";

import { ConfigService } from "./config.service";
import { EnvSchema } from "./env.schema";

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: EnvSchema.parse,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
