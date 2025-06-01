import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { GraphqlController } from "./graphql.controller";
import { GraphqlService } from "./graphql.service";

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [GraphqlController],
  providers: [GraphqlService],
})
export class GraphqlModule {}
