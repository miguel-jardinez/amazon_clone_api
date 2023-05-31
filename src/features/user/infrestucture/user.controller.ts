import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { UserEntity } from '../application/entities/user.entity';
import { CreateUserDto } from '../application/models/create-user.dto';
import { DeleteUserDto } from '../application/models/delete-user.dto';
import { UserService } from '../application/user.service';
import { UserRepository } from '../domain/user.repository';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController implements UserRepository {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserEntity | null> {
    return this.userService.createUser(user);
  }

  @Delete()
  deleteUser(@Body() deleteUser: DeleteUserDto): Promise<{ message: string }> {
    return this.userService.deleteUser(deleteUser);
  }

  @Get('id/:id')
  getById(@Param() id: string): Promise<UserEntity | null> {
    return this.userService.getById(id);
  }

  @Get()
  finAllUsers(): Promise<UserEntity[]> {
    return Promise.resolve([]);
  }
}
