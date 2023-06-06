export interface PasswordRepository {
    hashPassword(password: string): Promise<string>;
    verifyPassword(hashedPassword: string, password: string): Promise<boolean>;
}
