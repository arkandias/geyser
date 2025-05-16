import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { ConfigModule } from "../config/config.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [ConfigModule, HttpModule, TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
