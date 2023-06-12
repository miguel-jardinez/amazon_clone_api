import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
}
