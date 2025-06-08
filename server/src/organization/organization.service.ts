import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Organization } from "./organization.entity";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
  ) {}

  async findByKey(key: string): Promise<Organization | null> {
    return this.orgRepository.findOne({ where: { key } });
  }
}
