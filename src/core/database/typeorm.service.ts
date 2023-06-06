import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { EnvConfigService } from '../env/env.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly envConfigService: EnvConfigService) {}
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.envConfigService.getDatabaseUrl(),
      entities: [`${__dirname}/../../**/*.entity.{ts,js}`],
      synchronize: this.envConfigService.isDevelop(),
      logging: true,
      logger: 'file',
      autoLoadEntities: true,
      migrationsRun: this.envConfigService.isProduction(),
      migrations: [`${__dirname}/../../migrations/**/*.{ts,js}`],
    };
  }
}
