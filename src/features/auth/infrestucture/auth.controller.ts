import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../application/auth.service';
import { Public } from '../application/decorators/IsPublic';
import { LocalAuthGuard } from '../application/guards/local-auth.guard';
import { LoginResponseDto } from '../application/models/login-response.dto';
import { RegisterAuthDto } from '../application/models/register-auth.dto';
import { AuthControllerRepository } from '../domain/auth-controller.repository';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements AuthControllerRepository {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  @ApiOkResponse({ type: LoginResponseDto, status: '2XX' })
  login(@Req() req): Promise<LoginResponseDto | null> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  @ApiOkResponse({ type: LoginResponseDto, status: '2XX' })
  register(
    @Body() register: RegisterAuthDto,
  ): Promise<LoginResponseDto | null> {
    return this.authService.register(register);
  }
}
