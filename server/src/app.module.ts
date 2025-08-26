import { Module } from "@nestjs/common";
import { JwksModule } from "nestjs-jwks";

import { AuthModule } from "@/auth/auth.module";
import { ConfigModule } from "@/config/config.module";
import { ConfigService } from "@/config/config.service";
import { DatabaseModule } from "@/database/database.module";
import { GraphqlModule } from "@/graphql/graphql.module";
import { HealthModule } from "@/health/health.module";
import { RoleModule } from "@/role/role.module";
import { UserModule } from "@/user/user.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DatabaseModule,
    GraphqlModule,
    HealthModule,
    JwksModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.jwks,
        keysDirectory: "./keys",
      }),
      controller: {
        path: ".well-known",
        endpoint: "jwks.json",
        headers: {},
      },
    }),
    RoleModule,
    UserModule,
  ],
})
export class AppModule {}
