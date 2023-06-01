import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileExceptionService extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
