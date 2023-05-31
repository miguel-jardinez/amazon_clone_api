import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 30)
  @IsString()
  @IsNotEmpty()
  password: string;
}
