export type Configs = {
  app: AppConfig;
  database: DatabaseConfig;
  security: SecurityConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
  excel: ExcelConfig;
};

export type AppConfig = {
  port: number;
  host: string;
  swagger_url_path: string;
};
export type DatabaseConfig = {
  port: number;
  host: string;
  username: string;
  password: string;
  db_name: string;
};
export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};
export type JWTConfig = {
  access_secret: string;
  refresh_secret: string;
  access_expires_in: number;
  refresh_expires_in: number;
};
export type SecurityConfig = {
  hashPasswordRounds: number;
  defaultManagerPassword: string;
  admin_email: string;
  admin_password: string;
};

export type ExcelConfig = {
  excelMimeType: string;
  excelWorksheet: string;
};
