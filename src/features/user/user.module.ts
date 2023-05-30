import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './infrestucture/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './application/entities/user.entity';
import { PasswordService } from '../../core/shared/services/password/application/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
