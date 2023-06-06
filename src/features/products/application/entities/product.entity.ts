import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(
    () => ProfileEntity,
    (profile: ProfileEntity) => profile.products,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
