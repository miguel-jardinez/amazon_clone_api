import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { UserRoles } from '../../../../core/models/UserRoles';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;

  @IsEnum(UserRoles)
  @IsArray()
  @IsNotEmpty()
  role: UserRoles[];
}
