import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { GraphqlController } from "./graphql.controller";

@Module({
  imports: [AuthModule, ConfigModule],
  controllers: [GraphqlController],
})
export class GraphqlModule {}
