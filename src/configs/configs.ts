import * as process from 'node:process';

import * as dotenv from 'dotenv';

import { Configs } from './configs.type';

const environment = process.env.APP_ENVIRONMENT || 'local';
dotenv.config({ path: `environments/${environment}.env` });

export default (): Configs => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
    swagger_url_path: process.env.SWAGGER_URL_PATH,
  },
  database: {
    port: parseInt(process.env.MYSQL_PORT),
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    db_name: process.env.MYSQL_DB_NAME,
  },
  security: {
    hashPasswordRounds: parseInt(process.env.HASH_PASSWORD_ROUNDS),
    defaultManagerPassword: process.env.DEFAULT_MANAGER_PASSWORD,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
  },
  redis: {
    port: parseInt(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    refresh_expires_in: parseInt(process.env.JWT_REFRESH_EXPIRES_IN),
    access_expires_in: parseInt(process.env.JWT_ACCESS_EXPIRES_IN),
    access_secret: process.env.JWT_ACCESS_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
  },
  // actionToken: {
  //   setup_manager_secret: process.env.ACTION_TOKEN_SETUP_MANAGER_SECRET,
  //   setup_manager_expires_in: process.env.ACTION_TOKEN_SETUP_MANAGER_EXPIRES_IN,
  //   forgot_password_secret: process.env.ACTION_TOKEN_FORGOT_PASSWORD_SECRET,
  //   forgot_password_expires_in:
  //     process.env.ACTION_TOKEN_FORGOT_PASSWORD_EXPIRES_IN,
  //   setup_dealership_worker_secret:
  //     process.env.ACTION_TOKEN_SETUP_DEALERSHIP_WORKER_SECRET,
  //   setup_dealership_worker_expires_in:
  //     process.env.ACTION_TOKEN_SETUP_DEALERSHIP_WORKER_EXPIRES_IN,
  // },
  // operations: {
  //   batch_size: parseInt(process.env.BATCH_SIZE),
  // },
});
