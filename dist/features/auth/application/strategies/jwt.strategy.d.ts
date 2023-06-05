import { Strategy } from 'passport-jwt';
import { EnvConfigService } from '../../../../core/env/env.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly envConfigService;
    constructor(envConfigService: EnvConfigService);
    validate(payload: {
        id: string;
    }): {
        id: string;
    };
}
export {};
