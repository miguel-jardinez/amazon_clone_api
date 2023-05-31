import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '../application/auth.service';
import { LocalAuthGuard } from '../application/guards/local-auth.guard';
import { LoginResponseDto } from '../application/models/login-response.dto';
import { RegisterAuthDto } from '../application/models/register-auth.dto';
import { AuthControllerRepository } from '../domain/auth-controller.repository';

@Controller('auth')
export class AuthController implements AuthControllerRepository {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): Promise<LoginResponseDto | null> {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(
    @Body() register: RegisterAuthDto,
  ): Promise<LoginResponseDto | null> {
    return this.authService.register(register);
  }
}
