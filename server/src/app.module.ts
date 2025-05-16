import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./health/health.module";
import { KeysModule } from "./keys/keys.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DatabaseModule,
    HealthModule,
    KeysModule,
    RolesModule,
  ],
})
export class AppModule {}
