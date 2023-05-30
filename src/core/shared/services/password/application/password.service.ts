import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { PasswordRepository } from '../domain/password.repository';

@Injectable()
export class PasswordService implements PasswordRepository {
  async hashPassword(password: string): Promise<string> {
    try {
      const hashPassword = await hash(password);
      return hashPassword;
    } catch (e) {
      console.log(e);
    }
  }

  async verifyPassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    try {
      const isValidPassword = await verify(hashedPassword, password);
      return isValidPassword;
    } catch (e) {
      console.log(e);
    }
  }
}
