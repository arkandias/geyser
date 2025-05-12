import { ConfigModule } from "../config/config.module";
import { KeysModule } from "../keys/keys.module";
import { RolesModule } from "../roles/roles.module";
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { KeycloakService } from "./keycloak.service";

@Module({
  imports: [ConfigModule, KeysModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService, KeycloakService],
})
export class AuthModule {}
