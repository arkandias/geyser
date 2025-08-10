import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Role } from "@/role/role.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findByUserId(userId: number): Promise<Role[]> {
    return this.roleRepository.findBy({ teacher_id: userId });
  }
}
