import * as process from 'process';
import { DataSourceOptions } from 'typeorm';

const isDevelop = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Information for database
 * configurations
 */

const DB_PASSWORD = process.env.PGPASSWORD;
const DB_USER = process.env.PGUSER;
const DB_HOST = process.env.PGHOST;
const DB_DATABASE = process.env.PGDATABASE;
const DB_PORT = process.env.PGPORT;

export const dbConfig = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [`${__dirname}/../../**/*.entity.{ts,js}`],
  synchronize: isDevelop,
  logging: true,
  logger: 'file',
  autoLoadEntities: true,
  migrationsRun: isProduction,
  migrations: [`${__dirname}/../../migrations/**/*.{ts,js}`],
} as DataSourceOptions;
