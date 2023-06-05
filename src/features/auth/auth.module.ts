import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { EnvConfigService } from '../../core/env/env.service';
import { UserModule } from '../user/user.module';
import { AuthService } from './application/auth.service';
import { JwtAuthGuard } from './application/guards/jwt-auth.guard';
import { LocalStrategy } from './application/strategies/local.strategy';
import { AuthController } from './infrestucture/auth.controller';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: EnvConfigService) => {
        return {
          secret: configService.configJwt().secret,
          signOptions: {
            expiresIn: configService.configJwt().expiresIn,
          },
        };
      },
      inject: [EnvConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
