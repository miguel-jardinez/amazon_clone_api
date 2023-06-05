import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProfileEntity } from '../../../profile/application/entities/profile.entity';
import { CreateProductEntityRepository } from '../../domain/create-product-entity.repository';

@Entity('products')
export class ProductEntity implements CreateProductEntityRepository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  description: string;

  @Column('text', { default: 'https://placehold.co/500x500' })
  image: string;

  @Column('text')
  name: string;

  @Column('text', { default: 0.0 })
  starts: number;

  @ManyToOne(() => ProfileEntity, (profile: ProfileEntity) => profile.products)
  profile: ProfileEntity;
}
