import { ProfileEntity } from '../../profile/application/entities/profile.entity';
import { CreateProductRepository } from './create-product.repository';

export interface CreateProductEntityRepository extends CreateProductRepository {
  id: string;
  profile: ProfileEntity;
}
