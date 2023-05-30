export interface EnvRepository {
  getString(value: string): string;
  getBoolean(value: string): boolean;
  getNumber(value: string): number;
  getDatabaseUrl: string;
  isDevelop: boolean;
  isProduction: boolean;
}
