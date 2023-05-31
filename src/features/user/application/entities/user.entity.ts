import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserRoles } from '../../../../core/models/UserRoles';

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

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
