import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/config.module";
import { OidcService } from "./oidc.service";

@Module({
  imports: [ConfigModule],
  providers: [OidcService],
  exports: [OidcService],
})
export class OidcModule {}
