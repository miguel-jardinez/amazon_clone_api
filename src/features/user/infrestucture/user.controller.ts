import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { CreateUserDto } from '../application/models/create-user.dto';
import { UpdateUserDto } from '../application/models/update-user.dto';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../application/entities/user.entity';

@Controller('user')
export class UserController implements UserRepository {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserEntity | null> {
    return this.userService.createUser(user);
  }

  @Delete()
  deleteUser(@Body() email: string): Promise<string> {
    return this.userService.deleteUser(email);
  }

  @Get()
  getByEmail(@Body() email: string): Promise<UserEntity | null> {
    return this.userService.getByEmail(email);
  }

  @Get(':id')
  getById(@Body() id: string): Promise<UserEntity | null> {
    return this.userService.getById(id);
  }

  @Put()
  updateUser(@Request() req, @Body() user: UpdateUserDto): Promise<string> {
    const id = req.user.id;

    return this.userService.updateUser(id, user);
  }
}
