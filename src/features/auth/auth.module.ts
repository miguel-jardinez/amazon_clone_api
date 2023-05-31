import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EnvConfigService } from '../../core/env/env.service';
import { UserModule } from '../user/user.module';
import { AuthService } from './application/auth.service';
import { LocalStrategy } from './application/strategies/local.strategy';
import { AuthController } from './infrestucture/auth.controller';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
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
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
