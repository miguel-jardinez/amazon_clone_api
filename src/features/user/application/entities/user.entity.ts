import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserRoles } from '../../../../core/models/UserRoles';
import { ProfileEntity } from '../../../profile/application/entities/profile.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Exclude()
  @Column('text')
  password: string;

  @Column({ type: 'simple-array', enum: UserRoles, default: UserRoles.CLIENT })
  role: UserRoles[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile?: ProfileEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
