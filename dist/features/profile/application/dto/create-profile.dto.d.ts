import { ProfileEntityRepository } from '../../domain/profile-entity.repository';
export declare class CreateProfileDto implements ProfileEntityRepository {
    name: string;
    last_name: string;
    phone_code: string;
    phone_number: string;
}
