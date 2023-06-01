import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileEntity } from './application/entities/profile.entity';
import { ProfileService } from './application/profile.service';
import { ProfileController } from './infrestructure/profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
