import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

import { PasswordRepository } from '../domain/password.repository';

@Injectable()
export class PasswordService implements PasswordRepository {
  async hashPassword(password: string): Promise<string> {
    try {
      return await hash(password);
    } catch (e) {
      console.log(e);
    }
  }

  async verifyPassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    try {
      return await verify(hashedPassword, password);
    } catch (e) {
      console.log(e);
    }
  }
}
