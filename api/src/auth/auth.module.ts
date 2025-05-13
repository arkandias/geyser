import { ConfigModule } from "../config/config.module";
import { IdentityModule } from "../identity/identity.module";
import { KeysModule } from "../keys/keys.module";
import { RolesModule } from "../roles/roles.module";
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [ConfigModule, IdentityModule, KeysModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
