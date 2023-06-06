import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { CreateProfileDto } from '../application/dto/create-profile.dto';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { ProfileEntity } from '../application/entities/profile.entity';
export interface ProfileServiceRepository {
    createProfile(userId: string, createProfile?: CreateProfileDto): Promise<ProfileEntity | null>;
    updateProfile(id: string, updateProfile: UpdateProfileDto): Promise<SimpleResponse>;
    getProfile(user_id: string): Promise<ProfileEntity>;
}
