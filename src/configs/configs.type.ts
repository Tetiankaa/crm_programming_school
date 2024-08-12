export type Configs = {
  app: AppConfig;
  database: DatabaseConfig;
  security: SecurityConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
  // actionToken: ActionTokenConfig;
  // operations: OperationsConfig;
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
// export type ActionTokenConfig = {
//   setup_manager_secret: string;
//   setup_manager_expires_in: string;
//   forgot_password_secret: string;
//   forgot_password_expires_in: string;
//   setup_dealership_worker_secret: string;
//   setup_dealership_worker_expires_in: string;
// };
// export type OperationsConfig = {
//   batch_size: number;
// };
