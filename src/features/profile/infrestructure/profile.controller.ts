import { Body, Controller, Put, Request } from '@nestjs/common';

import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { ProfileService } from '../application/profile.service';
import { ProfileControllerRepository } from '../domain/profile-controller.repository';

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
}
