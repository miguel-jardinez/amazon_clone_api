import { Body, Controller, Get, Put, Req, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { ProfileEntity } from '../application/entities/profile.entity';
import { ProfileService } from '../application/profile.service';
import { ProfileControllerRepository } from '../domain/profile-controller.repository';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController implements ProfileControllerRepository {
  constructor(private readonly profileService: ProfileService) {}

  @Put()
  updateProfile(
    @Request() request: RequestModel,
    @Body() updateProfile: UpdateProfileDto,
  ): Promise<SimpleResponse> {
    const id = request.profile_id;

    return this.profileService.updateProfile(id, updateProfile);
  }

  @Get()
  getProfile(@Req() request: RequestModel): Promise<ProfileEntity> {
    return this.profileService.getProfile(request.user_id);
  }
}
