import { UserEntity } from '../application/entities/user.entity';
import { CreateUserDto } from '../application/models/create-user.dto';
import { DeleteUserDto } from '../application/models/delete-user.dto';
import { UserService } from '../application/user.service';
import { UserControllerRepository } from '../domain/user-controller.repository';
export declare class UserController implements UserControllerRepository {
    private readonly userService;
    constructor(userService: UserService);
    createUser(user: CreateUserDto): Promise<UserEntity | null>;
    deleteUser(deleteUser: DeleteUserDto): Promise<{
        message: string;
    }>;
    getById(id: string): Promise<UserEntity | null>;
    finAllUsers(): Promise<UserEntity[]>;
}
