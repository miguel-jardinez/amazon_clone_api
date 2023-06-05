import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ProfileExceptionService extends HttpException {
    constructor(message: string, status: HttpStatus);
}
