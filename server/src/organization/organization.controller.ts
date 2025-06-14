import { Controller, Head, NotFoundException, Param } from "@nestjs/common";

import { OrganizationService } from "./organization.service";

@Controller("organization")
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Head(":key")
  async checkOrganization(@Param("key") key: string): Promise<void> {
    const exists = await this.organizationService.exists(key);
    if (!exists) {
      throw new NotFoundException("Organization not found");
    }
  }
}
