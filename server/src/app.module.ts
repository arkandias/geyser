import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [ConfigModule, AuthModule, DatabaseModule, RolesModule],
})
export class AppModule {}
