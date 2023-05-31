import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 30)
  @IsString()
  @IsNotEmpty()
  password: string;
}
