import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole({ userId, value }: AddRoleDto) {
    const user = await this.userRepository.findByPk(userId);
    const role = await this.roleService.getRoleByValue(value);

    if (role && user) {
      await user.$add('role', role.id);

      return role;
    } else {
      throw new HttpException(
        !role ? 'Role not founded' : 'User not founded',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addBan({ userId, banReason }: BanUserDto) {
    const user = await this.userRepository.findByPk(userId);
    if (user && banReason) {
      user.banned = true;
      user.banReason = banReason;
      await user.save();
      return user;
    } else {
      throw new HttpException('User not founded', HttpStatus.NOT_FOUND);
    }
  }
  async removeBan({ userId }: BanUserDto) {
    const user = await this.userRepository.findByPk(userId);
    if (user) {
      user.banned = false;
      user.banReason = null;
      return user.save();
    } else {
      throw new HttpException('User not founded', HttpStatus.NOT_FOUND);
    }
  }
}
