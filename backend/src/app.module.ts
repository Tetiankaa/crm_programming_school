import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configs';
import { MysqlModule } from './modules/mysql/mysql.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { AuthModule } from './modules/auth/auth.module';
import { ManagerModule } from './modules/manager/manager.module';
import { RedisModule } from './modules/redis/redis.module';
import { LoggerModule } from './modules/logger/logger.module';
import { OrderModule } from './modules/order/order.module';
import { PaginationModule } from './modules/pagination/pagination.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MysqlModule,
    RepositoryModule,
    RedisModule,
    LoggerModule,
    AuthModule,
    ManagerModule,
    OrderModule,
    PaginationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
