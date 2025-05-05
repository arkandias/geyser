import { ConfigModule } from "../config/config.module";
import { RolesModule } from "../roles/roles.module";
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { KeycloakService } from "./keycloak.service";

@Module({
  imports: [ConfigModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService, KeycloakService],
  exports: [AuthService],
})
export class AuthModule {}
