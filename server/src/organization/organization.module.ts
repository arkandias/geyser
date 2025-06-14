import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizationController } from "./organization.controller";
import { Organization } from "./organization.entity";
import { OrganizationService } from "./organization.service";

@Module({
  controllers: [OrganizationController],
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
