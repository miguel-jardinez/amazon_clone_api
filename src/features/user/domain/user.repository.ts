import { UserEntity } from '../application/entities/user.entity';
import { CreateUserDto } from '../application/models/create-user.dto';
import { UpdateUserDto } from '../application/models/update-user.dto';

export interface UserRepository {
  getById(id: string): Promise<UserEntity | null>;
  getByEmail(email: string): Promise<UserEntity | null>;
  createUser(user: CreateUserDto): Promise<UserEntity | null>;
  deleteUser(email: string): Promise<string>;
  updateUser(email: string, user: UpdateUserDto): Promise<string>;
}
