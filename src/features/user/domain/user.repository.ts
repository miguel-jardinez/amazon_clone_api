import { UserEntity } from '../application/entities/user.entity';
import { CreateUserDto } from '../application/models/create-user.dto';
import { DeleteUserDto } from '../application/models/delete-user.dto';

export interface UserRepository {
  getById(id: string): Promise<UserEntity | null>;
  createUser(user: CreateUserDto): Promise<UserEntity | null>;
  deleteUser(email: DeleteUserDto): Promise<{ message: string }>;
  finAllUsers(): Promise<UserEntity[]>;
}
