import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { KeysModule } from "./keys/keys.module";
import { RolesModule } from "./roles/roles.module";
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigModule, AuthModule, DatabaseModule, KeysModule, RolesModule, HealthModule],
})
export class AppModule {}
