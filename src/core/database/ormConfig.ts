import * as process from 'process';
import { DataSourceOptions } from 'typeorm';

const isDevelop = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const dbConfig = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'amazon_clone_db',
  entities: [`${__dirname}/../../**/*.entity.{ts,js}`],
  synchronize: isDevelop,
  logging: true,
  logger: 'file',
  autoLoadEntities: true,
  migrationsRun: isProduction,
  migrations: [`${__dirname}/../../migrations/**/*.{ts,js}`],
} as DataSourceOptions;
