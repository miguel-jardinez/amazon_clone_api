import { ProductEntity } from '../../../products/application/entities/product.entity';
import { UserEntity } from '../../../user/application/entities/user.entity';
import { ProfileEntityRepository } from '../../domain/profile-entity.repository';
export declare class ProfileEntity implements ProfileEntityRepository {
    id: string;
    name: string;
    last_name: string;
    phone_code: string;
    phone_number: string;
    user: UserEntity;
    products?: ProductEntity[];
}
