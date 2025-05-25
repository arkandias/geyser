import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/config.module";
import { KeysModule } from "../keys/keys.module";
import { OidcModule } from "../oidc/oidc.module";
import { RolesModule } from "../roles/roles.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { JwtService } from "./jwt.service";
import { StateService } from "./state.service";

@Module({
  imports: [ConfigModule, KeysModule, OidcModule, RolesModule, UsersModule],
  controllers: [AuthController],
  providers: [JwtService, StateService],
})
export class AuthModule {}
