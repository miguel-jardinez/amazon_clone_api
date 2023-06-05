import { ProfileEntity } from '../../../profile/application/entities/profile.entity';
import { CreateProductEntityRepository } from '../../domain/create-product-entity.repository';
export declare class ProductEntity implements CreateProductEntityRepository {
    id: string;
    description: string;
    image: string;
    name: string;
    profile: ProfileEntity;
}
