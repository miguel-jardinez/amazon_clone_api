import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductExceptionService extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
