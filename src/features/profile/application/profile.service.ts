import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { ProfileServiceRepository } from '../domain/profile-service.repository';
import { ProfileExceptionService } from '../utils/profile-exception.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService implements ProfileServiceRepository {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async createProfile(
    userId: string,
    createProfile: CreateProfileDto,
  ): Promise<ProfileEntity | null> {
    try {
      const profile = this.profileRepository.create({
        ...createProfile,
        user: { id: userId },
      });

      const data = await this.profileRepository.save(profile);
      this.logger.log(`Profile created to user ${userId}`);

      return data;
    } catch (e) {
      this.logger.error(`Failed to create profile to user ${userId}`);
      throw new ProfileExceptionService(
        e.message,
        e.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProfile(
    id: string,
    updateProfile: UpdateProfileDto,
  ): Promise<SimpleResponse> {
    try {
      const profile = await this.profileRepository.update(
        { id },
        updateProfile,
      );

      if (profile.affected === 0) {
        throw new HttpException(
          `Profile ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      this.logger.log(`Profile ${id} successfully updated`);
      return SimpleResponse.response(`Profile ${id} successfully updated`);
    } catch (e) {
      throw new ProfileExceptionService(
        e.message,
        e.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProfile(user_id: string): Promise<ProfileEntity> {
    try {
      const profile = await this.profileRepository.findOneByOrFail({
        user: { id: user_id },
      });
      this.logger.log(`Profile found to user ${user_id}`);

      return profile;
    } catch (e) {
      throw new ProfileExceptionService(
        e.message,
        e.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
