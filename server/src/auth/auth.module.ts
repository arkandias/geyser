import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/config.module";
import { KeysModule } from "../keys/keys.module";
import { OrganizationModule } from "../organization/organization.module";
import { RoleModule } from "../role/role.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CookiesService } from "./cookies.service";
import { JwtService } from "./jwt.service";
import { OidcService } from "./oidc.service";

@Module({
  imports: [
    ConfigModule,
    KeysModule,
    OrganizationModule,
    RoleModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CookiesService, JwtService, OidcService],
  exports: [JwtService],
})
export class AuthModule {}
