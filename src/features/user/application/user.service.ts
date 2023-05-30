import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PasswordService } from '../../../core/shared/services/password/application/password.service';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';

@Injectable()
export class UserService implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}
  async createUser(user: CreateUserDto): Promise<UserEntity | null> {
    try {
      user.password = await this.passwordService.hashPassword(user.password);
      const data = this.userEntity.create(user);
      return await this.userEntity.save(data);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(email: string): Promise<string> {
    try {
      const data = await this.userEntity.delete({ email });

      if (data.affected === 0) {
        return `User ${email} was not deleted`;
      }

      return `User ${email} was deleted`;
    } catch (e) {
      console.log(e);
    }
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    try {
      return this.userEntity.findOneByOrFail({ email });
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id: string): Promise<UserEntity | null> {
    try {
      return this.userEntity.findOneByOrFail({ id });
    } catch (e) {
      console.log(e);
    }
  }

  async updateUser(email: string, user: UpdateUserDto): Promise<string> {
    try {
      const data = await this.userEntity.update({ email }, user);

      if (data.affected === 0) {
        return `User ${email} was not deleted`;
      }

      return `User ${email} was updated`;
    } catch (e) {
      console.log(e);
    }
  }
}
