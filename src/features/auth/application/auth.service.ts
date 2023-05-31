import {
  ClassSerializerInterceptor,
  HttpStatus,
  Injectable,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../../user/application/entities/user.entity';
import { UserService } from '../../user/application/user.service';
import { AuthRepository } from '../domain/auth.repository';
import { AuthExceptionService } from '../utils/auth-exception.service';
import { LoginResponseDto } from './models/login-response.dto';
import { RegisterAuthDto } from './models/register-auth.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class AuthService implements AuthRepository {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEntity): Promise<LoginResponseDto | null> {
    try {
      const token = this.jwtService.sign({ id: user.id });

      return new LoginResponseDto(user, token);
    } catch (e) {
      this.logger.error(`Error to login ${user.email} :: ${new Date()}`);
      new AuthExceptionService(e.message, HttpStatus.CONFLICT);
    }
  }

  async register(register: RegisterAuthDto): Promise<LoginResponseDto | null> {
    try {
      const data = await this.userService.createUser(register);
      this.logger.log(
        `User ${register.email} successfully registered :: ${new Date()}`,
      );

      return new LoginResponseDto(data, 'token');
    } catch (e) {
      this.logger.error(`Error to register ${register.email} :: ${new Date()}`);
      new AuthExceptionService(e.message, HttpStatus.CONFLICT);
    }
  }
}
