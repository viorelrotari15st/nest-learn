import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  createRole = async (dto: CreateRoleDto) => {
    const role = await this.roleRepository.create(dto);
    return role;
  };

  getRoleByValue = async (value: string) => {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  };
}
