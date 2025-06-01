import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { GraphqlModule } from "./graphql/graphql.module";
import { HealthModule } from "./health/health.module";
import { KeysModule } from "./keys/keys.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DatabaseModule,
    GraphqlModule,
    HealthModule,
    KeysModule,
    RolesModule,
    UsersModule,
  ],
})
export class AppModule {}
