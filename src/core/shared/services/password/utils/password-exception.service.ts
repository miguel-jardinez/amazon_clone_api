import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExceptionService extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}

export const PasswordException = (error: any): UserExceptionService => {
  return new UserExceptionService(
    `${error.message}`,
    HttpStatus.NOT_ACCEPTABLE,
  );
};
