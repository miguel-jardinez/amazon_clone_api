import { ConfigService } from '@nestjs/config';
import { EnvRepository } from './domain/env.repository';
export declare class EnvConfigService implements EnvRepository {
    private readonly configService;
    constructor(configService: ConfigService);
    getBoolean(value: string): boolean;
    getNumber(value: string): number;
    getString(value: string): string;
    isDevelop(): boolean;
    isProduction(): boolean;
    getDatabaseUrl(): string;
    configJwt(): {
        secret: string;
        expiresIn: string;
    };
}
