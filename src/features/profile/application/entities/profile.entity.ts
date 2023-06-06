import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductEntity } from '../../../products/application/entities/product.entity';
import { UserEntity } from '../../../user/application/entities/user.entity';
import { ProfileEntityRepository } from '../../domain/profile-entity.repository';

@Entity('profile')
export class ProfileEntity implements ProfileEntityRepository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  last_name: string;

  @Column('text', { nullable: true })
  phone_code: string;

  @Column('text', { nullable: true })
  phone_number: string;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userid' })
  user: UserEntity;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.profile, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  products?: ProductEntity[];
}
