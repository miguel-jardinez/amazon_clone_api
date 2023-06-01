import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { PasswordService } from '../../../core/shared/services/password/application/password.service';
import { CreateProfileDto } from '../../profile/application/dto/create-profile.dto';
import { ProfileService } from '../../profile/application/profile.service';
import { UserRepository } from '../domain/user.repository';
import { UserException } from '../utils/user-exception.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './models/create-user.dto';
import { DeleteUserDto } from './models/delete-user.dto';

@Injectable()
export class UserService implements UserRepository {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly profileService: ProfileService,
  ) {}
  async createUser(user: CreateUserDto): Promise<UserEntity | null> {
    try {
      user.password = await this.passwordService.hashPassword(user.password);
      const userCreated = this.userEntity.create(user);

      this.logger.log(
        `${user.email} was created successfully :: ${new Date()}`,
      );
      const userData = await this.userEntity.save(userCreated);
      await this.profileService.createProfile(
        userData.id,
        {} as CreateProfileDto,
      );

      return userData;
    } catch (error: any) {
      UserException(error, user.email, this.logger);
    }
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<SimpleResponse> {
    try {
      const data = await this.userEntity.delete({ email: deleteUserDto.email });

      if (data.affected === 0) {
        this.logger.log(
          `Users ${deleteUserDto.email} not deleted :: ${new Date()}`,
        );
        throw new HttpException(
          `User ${
            deleteUserDto.email
          } was not found and deleted :: ${new Date()}`,
          HttpStatus.NOT_FOUND,
        );
      }

      this.logger.log(`Users ${deleteUserDto.email} deleted :: ${new Date()}`);

      return {
        message: `User ${deleteUserDto.email} was deleted`,
      };
    } catch (error) {
      UserException(error, deleteUserDto.email, this.logger);
    }
  }

  async getById(id: string): Promise<UserEntity | null> {
    try {
      const data = await this.userEntity.findOneByOrFail({ id });
      this.logger.log(`Users ${data.email} found :: ${new Date()}`);

      return data;
    } catch (e) {
      UserException(e, id, this.logger);
    }
  }

  async finAllUsers(): Promise<UserEntity[]> {
    try {
      const data = await this.userEntity.find();
      this.logger.log(`All users found :: ${new Date()}`);

      return data;
    } catch (error) {
      UserException(error, 'Get All Users', this.logger);
    }
  }

  async verifyUserLogin(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    try {
      const data = await this.userEntity.findOneByOrFail({ email });
      const isPasswordValid = await this.passwordService.verifyPassword(
        data.password,
        password,
      );

      if (!isPasswordValid) {
        throw new HttpException(
          'Email or password incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }
      delete data.password;

      return data;
    } catch (e) {
      UserException(e, email, this.logger);
    }
  }
}
