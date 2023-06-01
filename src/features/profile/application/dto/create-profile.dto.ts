import { IsNotEmpty, IsString } from 'class-validator';

import { ProfileEntityRepository } from '../../domain/profile-entity.repository';

export class CreateProfileDto implements ProfileEntityRepository {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phone_code: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
