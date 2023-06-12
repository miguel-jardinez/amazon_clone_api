import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
