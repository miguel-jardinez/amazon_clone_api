import { UserEntity } from '../../user/application/entities/user.entity';
export interface ProfileEntityRepository {
    id?: string;
    name: string;
    last_name: string;
    phone_code: string;
    phone_number: string;
    user?: UserEntity;
}
