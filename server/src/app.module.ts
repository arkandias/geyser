import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { GraphqlModule } from "./graphql/graphql.module";
import { HealthModule } from "./health/health.module";
import { KeysModule } from "./keys/keys.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DatabaseModule,
    GraphqlModule,
    HealthModule,
    KeysModule,
    RoleModule,
    UserModule,
  ],
})
export class AppModule {}
