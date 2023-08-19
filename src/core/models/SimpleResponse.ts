import { ApiProperty } from '@nestjs/swagger';

export class SimpleResponse {
  @ApiProperty()
  message: string;

  static response(message: string): { message: string } {
    return {
      message,
    };
  }
}
