import { HttpException, HttpStatus, Logger } from '@nestjs/common';
export declare class UserExceptionService extends HttpException {
    constructor(message: string, status: HttpStatus);
}
export declare const UserException: (error: any, value: string, logger: Logger) => UserExceptionService;
