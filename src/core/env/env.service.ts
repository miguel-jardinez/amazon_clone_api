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

  get isDevelop(): boolean {
    const data = this.getString('NODE_ENV');
    return data === 'development';
  }

  get isProduction(): boolean {
    const data = this.getString('NODE_ENV');
    return data === 'production';
  }

  get getDatabaseUrl(): string {
    return this.getString('POSTGRES_URL');
  }
}
