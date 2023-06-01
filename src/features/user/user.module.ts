import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordService } from '../../core/shared/services/password/application/password.service';
import { ProfileService } from '../profile/application/profile.service';
import { UserEntity } from './application/entities/user.entity';
import { UserService } from './application/user.service';
import { UserController } from './infrestucture/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, PasswordService, ProfileService],
  exports: [UserService],
})
export class UserModule {}
