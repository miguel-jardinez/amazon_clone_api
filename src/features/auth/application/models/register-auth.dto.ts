import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @Length(8, 30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
