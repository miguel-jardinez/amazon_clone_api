import { Repository } from 'typeorm';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { PasswordService } from '../../../core/shared/services/password/application/password.service';
import { ProfileService } from '../../profile/application/profile.service';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './models/create-user.dto';
import { DeleteUserDto } from './models/delete-user.dto';
export declare class UserService implements UserRepository {
    private readonly userEntity;
    private readonly passwordService;
    private readonly profileService;
    private readonly logger;
    constructor(userEntity: Repository<UserEntity>, passwordService: PasswordService, profileService: ProfileService);
    createUser(user: CreateUserDto): Promise<UserEntity | null>;
    deleteUser(deleteUserDto: DeleteUserDto): Promise<SimpleResponse>;
    getById(id: string): Promise<UserEntity | null>;
    finAllUsers(): Promise<UserEntity[]>;
    verifyUserLogin(email: string, password: string): Promise<UserEntity | null>;
}
