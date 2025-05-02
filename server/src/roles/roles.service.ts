import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  /**
   * Find roles for a specific user by email
   * @param email User identifier from Keycloak
   * @returns Roles or null if not found TODO: update doc
   */
  async findByEmail(email: string): Promise<Role[]> {
    return this.roleRepository.findBy({ uid: email });
  }
}
