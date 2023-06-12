import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: string;

  @Column('text')
  @ApiProperty()
  description: string;

  @Column('text', { default: 'https://placehold.co/500x500' })
  @ApiProperty()
  image: string;

  @Column('text')
  @ApiProperty()
  name: string;

  @ManyToOne(
    () => ProfileEntity,
    (profile: ProfileEntity) => profile.products,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
