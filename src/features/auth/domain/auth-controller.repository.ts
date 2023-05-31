import { UserEntity } from '../../user/application/entities/user.entity';
import { LoginResponseDto } from '../application/models/login-response.dto';
import { RegisterAuthDto } from '../application/models/register-auth.dto';

export interface AuthControllerRepository {
  login(req: { user: UserEntity }): Promise<LoginResponseDto | null>;
  register(register: RegisterAuthDto): Promise<LoginResponseDto | null>;
}
