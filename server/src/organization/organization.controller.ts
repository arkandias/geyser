import { OrganizationData } from "@geyser/shared/dist/schemas/organization-data.schema";
import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
} from "@nestjs/common";

import { OrganizationService } from "@/organization/organization.service";

@Controller("organization")
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get(":key")
  async getOrganization(@Param("key") key: string): Promise<OrganizationData> {
    // Admin organization
    if (key === "admin") {
      return {
        id: 0,
      };
    }

    const organization = await this.organizationService.findByKey(key);
    if (!organization) {
      throw new NotFoundException("Organization not found");
    }
    if (!organization.active) {
      throw new ForbiddenException("Organization not active");
    }
    return {
      id: organization.id,
    };
  }
}
