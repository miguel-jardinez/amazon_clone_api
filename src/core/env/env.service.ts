import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvRepository } from './domain/env.repository';

@Injectable()
export class EnvConfigService implements EnvRepository {
  constructor(private readonly configService: ConfigService) {}

  getBoolean(value: string): boolean {
    return this.configService.get<boolean>(value);
  }

  getNumber(value: string): number {
    return this.configService.get<number>(value);
  }

  getString(value: string): string {
    return this.configService.get<string>(value);
  }

  isDevelop(): boolean {
    const data = this.getString('NODE_ENV');
    return data === 'development';
  }

  isProduction(): boolean {
    const data = this.getString('NODE_ENV');
    return data === 'production';
  }

  getDatabaseUrl(): string {
    return this.getString('POSTGRES_URL');
  }
}
