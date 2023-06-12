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
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { UserEntity } from '../application/entities/user.entity';
import { CreateUserDto } from '../application/models/create-user.dto';
import { DeleteUserDto } from '../application/models/delete-user.dto';
import { UserService } from '../application/user.service';
import { UserControllerRepository } from '../domain/user-controller.repository';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
export class UserController implements UserControllerRepository {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ status: '2XX', type: UserEntity })
  createUser(@Body() user: CreateUserDto): Promise<UserEntity | null> {
    return this.userService.createUser(user);
  }

  @Delete()
  @ApiOkResponse({
    status: '2XX',
  })
  deleteUser(@Body() deleteUser: DeleteUserDto): Promise<SimpleResponse> {
    return this.userService.deleteUser(deleteUser);
  }

  @Get(':id')
  @ApiOkResponse({
    status: '2XX',
    type: UserEntity,
  })
  @ApiParam({ name: 'id', type: () => String })
  getById(@Param('id') id: string): Promise<UserEntity | null> {
    return this.userService.getById(id);
  }

  @Get()
  @ApiOkResponse({
    status: '2XX',
    type: [UserEntity],
  })
  finAllUsers(): Promise<UserEntity[]> {
    return this.userService.finAllUsers();
  }
}
