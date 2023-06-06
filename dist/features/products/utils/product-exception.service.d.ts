import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ProductExceptionService extends HttpException {
    constructor(message: string, status: HttpStatus);
}
