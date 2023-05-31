import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthExceptionService extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
