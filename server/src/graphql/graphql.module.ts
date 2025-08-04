import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { GraphqlController } from "./graphql.controller";

@Module({
  imports: [AuthModule],
  controllers: [GraphqlController],
})
export class GraphqlModule {}
