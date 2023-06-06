import { Repository } from 'typeorm';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { ProfileServiceRepository } from '../domain/profile-service.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';
export declare class ProfileService implements ProfileServiceRepository {
    private readonly profileRepository;
    private readonly logger;
    constructor(profileRepository: Repository<ProfileEntity>);
    createProfile(userId: string, createProfile: CreateProfileDto): Promise<ProfileEntity | null>;
    updateProfile(id: string, updateProfile: UpdateProfileDto): Promise<SimpleResponse>;
    getProfile(user_id: string): Promise<ProfileEntity>;
}
