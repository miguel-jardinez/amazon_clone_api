import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/application/entities/user.entity';
import { UserService } from '../../user/application/user.service';
import { AuthRepository } from '../domain/auth.repository';
import { LoginResponseDto } from './models/login-response.dto';
import { RegisterAuthDto } from './models/register-auth.dto';
export declare class AuthService implements AuthRepository {
    private readonly userService;
    private readonly jwtService;
    private readonly logger;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: UserEntity): Promise<LoginResponseDto | null>;
    register(register: RegisterAuthDto): Promise<LoginResponseDto | null>;
}
