import { UserRoles } from '../../../../core/models/UserRoles';
import { ProfileEntity } from '../../../profile/application/entities/profile.entity';
export declare class UserEntity {
    id: string;
    email: string;
    password: string;
    role: UserRoles[];
    profile?: ProfileEntity;
    constructor(partial: Partial<UserEntity>);
}
