import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from '../../../core/shared/services/password/application/password.service';

@Injectable()
export class UserService implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}
  async createUser(user: CreateUserDto) {
    try {
      user.password = await this.passwordService.hashPassword(user.password);
      const data = this.userEntity.create(user);
      const userCreated = await this.userEntity.save(data);

      return userCreated;
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
      const data = this.userEntity.findOneByOrFail({ email });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id: string): Promise<UserEntity | null> {
    try {
      const data = this.userEntity.findOneByOrFail({ id });
      return data;
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
