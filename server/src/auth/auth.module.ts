import { ConfigModule } from "../config/config.module";
import { KeysService } from "../keys/keys.service";
import { RolesModule } from "../roles/roles.module";
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { KeycloakService } from "./keycloak.service";

@Module({
  imports: [ConfigModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService, KeysService, KeycloakService],
})
export class AuthModule {}
