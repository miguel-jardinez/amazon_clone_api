import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProfileEntity } from '../../../profile/application/entities/profile.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProfileEntity, (profile: ProfileEntity) => profile.products)
  profile: ProfileEntity;
}
