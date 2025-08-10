import { Module } from "@nestjs/common";

import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { CookiesService } from "@/auth/cookies.service";
import { JwtService } from "@/auth/jwt.service";
import { OidcService } from "@/auth/oidc.service";
import { KeysModule } from "@/keys/keys.module";
import { OrganizationModule } from "@/organization/organization.module";
import { RoleModule } from "@/role/role.module";
import { UserModule } from "@/user/user.module";

@Module({
  imports: [KeysModule, OrganizationModule, RoleModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, CookiesService, JwtService, OidcService],
  exports: [JwtService],
})
export class AuthModule {}
