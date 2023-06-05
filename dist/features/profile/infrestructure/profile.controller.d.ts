import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { ProfileEntity } from '../application/entities/profile.entity';
import { ProfileService } from '../application/profile.service';
import { ProfileControllerRepository } from '../domain/profile-controller.repository';
export declare class ProfileController implements ProfileControllerRepository {
    private readonly profileService;
    constructor(profileService: ProfileService);
    updateProfile(request: RequestModel, updateProfile: UpdateProfileDto): Promise<SimpleResponse>;
    getProfile(request: RequestModel): Promise<ProfileEntity>;
}
