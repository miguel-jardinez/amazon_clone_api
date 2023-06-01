import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';

export interface ProfileControllerRepository {
  updateProfile(
    request: RequestModel,
    updateProfile: UpdateProfileDto,
  ): Promise<SimpleResponse>;
}
