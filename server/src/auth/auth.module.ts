import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { RolesModule } from "../roles/roles.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { KeycloakJwtService } from "./keycloak-jwt.service";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        publicKey: configService.jwt.publicKey,
        privateKey: configService.jwt.privateKey,
        signOptions: {
          algorithm: "ES256",
          issuer: configService.rootUrl,
          expiresIn: configService.jwt.expiresIn,
        },
      }),
    }),
    RolesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, KeycloakJwtService],
  exports: [AuthService],
})
export class AuthModule {}
