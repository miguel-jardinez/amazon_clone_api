import { AuthService } from '../application/auth.service';
import { LoginResponseDto } from '../application/models/login-response.dto';
import { RegisterAuthDto } from '../application/models/register-auth.dto';
import { AuthControllerRepository } from '../domain/auth-controller.repository';
export declare class AuthController implements AuthControllerRepository {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<LoginResponseDto | null>;
    register(register: RegisterAuthDto): Promise<LoginResponseDto | null>;
}
