import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/config.module";
import { KeysModule } from "../keys/keys.module";
import { RolesModule } from "../roles/roles.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CookiesService } from "./cookies.service";
import { JwtService } from "./jwt.service";
import { OidcService } from "./oidc.service";

@Module({
  imports: [ConfigModule, KeysModule, RolesModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, CookiesService, JwtService, OidcService],
  exports: [JwtService],
})
export class AuthModule {}
