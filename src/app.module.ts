import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from './core/database/typeorm.service';
import { SharedModule } from './core/shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { ProfileModule } from './features/profile/profile.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useClass: TypeOrmConfigService,
    }),
    SharedModule,
    UserModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
