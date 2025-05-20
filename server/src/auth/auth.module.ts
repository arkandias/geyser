import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/config.module";
import { IdentityModule } from "../identity/identity.module";
import { KeysModule } from "../keys/keys.module";
import { RolesModule } from "../roles/roles.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { StateService } from "./state.service";

@Module({
  imports: [ConfigModule, IdentityModule, KeysModule, RolesModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, StateService],
})
export class AuthModule {}
