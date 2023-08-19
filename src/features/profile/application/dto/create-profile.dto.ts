import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ProfileEntityRepository } from '../../domain/profile-entity.repository';

export class CreateProfileDto implements ProfileEntityRepository {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone_code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone_number: string;
}
