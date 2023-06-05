import { HttpException, HttpStatus } from '@nestjs/common';
export declare class AuthExceptionService extends HttpException {
    constructor(message: string, status: HttpStatus);
}
