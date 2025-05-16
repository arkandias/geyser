import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/config.module";
import { IdentityService } from "./identity.service";

@Module({
  imports: [ConfigModule],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
