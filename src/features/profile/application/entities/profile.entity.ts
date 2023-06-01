import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}