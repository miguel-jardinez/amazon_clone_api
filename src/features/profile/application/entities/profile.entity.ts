import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  name: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  last_name: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  phone_code: string;

  @Column('text', { nullable: true })
  @ApiProperty()
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
  @ApiProperty({ type: () => [ProductEntity] })
  products?: ProductEntity[];
}
