import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DatabaseError } from 'pg-protocol';
import { QueryFailedError } from 'typeorm';

import { DatabaseErrorsCodes } from '../../../core/shared/services/database/utils/database-errors-codes';

export class UserExceptionService extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}

export const UserException = (
  error: any,
  value: string,
  logger: Logger,
): UserExceptionService => {
  const defaultMessage =
    error?.message ?? `Error in database ${value} :: ${new Date()}`;

  const defaultCode = error?.message
    ? HttpStatus.NOT_FOUND
    : HttpStatus.INTERNAL_SERVER_ERROR;

  if (error instanceof QueryFailedError) {
    const data = error.driverError as DatabaseError;
    const code = data.code as DatabaseErrorsCodes;

    if (code === '23505') {
      const message = `${value} already exist`;

      logger.error(message);
      throw new UserExceptionService(message, HttpStatus.CONFLICT);
    }
  }

  logger.error(defaultMessage);
  throw new UserExceptionService(defaultMessage, defaultCode);
};
