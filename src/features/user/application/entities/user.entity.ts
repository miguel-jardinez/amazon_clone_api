import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserRoles } from '../../../../core/models/UserRoles';
import { ProfileEntity } from '../../../profile/application/entities/profile.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('text', { unique: true })
  @ApiProperty()
  email: string;

  @Exclude()
  @Column('text')
  @ApiProperty()
  password: string;

  @Column({ type: 'simple-array', enum: UserRoles, default: UserRoles.CLIENT })
  @ApiProperty({
    name: 'User Roles',
    enum: UserRoles,
    default: UserRoles.CLIENT,
  })
  role: UserRoles[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @ApiProperty({ type: () => ProfileEntity })
  profile?: ProfileEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
