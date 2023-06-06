import { PasswordRepository } from '../domain/password.repository';
export declare class PasswordService implements PasswordRepository {
    private readonly logger;
    hashPassword(password: string): Promise<string>;
    verifyPassword(hashedPassword: string, password: string): Promise<boolean>;
}
