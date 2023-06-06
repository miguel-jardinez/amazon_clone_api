import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvConfigService } from '../env/env.service';
export declare class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private readonly envConfigService;
    constructor(envConfigService: EnvConfigService);
    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions;
}
