import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordService } from '../../core/shared/services/password/application/password.service';
import { ProfileModule } from '../profile/profile.module';
import { UserEntity } from './application/entities/user.entity';
import { UserService } from './application/user.service';
import { UserController } from './infrestucture/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ProfileModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
