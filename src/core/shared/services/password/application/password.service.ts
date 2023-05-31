import { Injectable, Logger } from '@nestjs/common';
import { hash, verify } from 'argon2';

import { PasswordRepository } from '../domain/password.repository';
import { PasswordException } from '../utils/password-exception.service';

@Injectable()
export class PasswordService implements PasswordRepository {
  private readonly logger = new Logger(PasswordException.name);
  async hashPassword(password: string): Promise<string> {
    try {
      return await hash(password);
    } catch (e) {
      this.logger.log(`Password not hashed :: ${new Date()}`);
      PasswordException(e);
    }
  }

  async verifyPassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    try {
      return await verify(hashedPassword, password);
    } catch (e) {
      this.logger.log(`Password not verified :: ${new Date()}`);
      PasswordException(e);
    }
  }
}
