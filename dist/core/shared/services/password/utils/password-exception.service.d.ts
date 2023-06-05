import { HttpException, HttpStatus } from '@nestjs/common';
export declare class UserExceptionService extends HttpException {
    constructor(message: string, status: HttpStatus);
}
export declare const PasswordException: (error: any) => UserExceptionService;
