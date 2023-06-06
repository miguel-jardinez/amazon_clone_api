import { Strategy } from 'passport-local';
import { UserEntity } from '../../../user/application/entities/user.entity';
import { UserService } from '../../../user/application/user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(email: string, password: string): Promise<UserEntity>;
}
export {};
