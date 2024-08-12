import {Module} from '@nestjs/common';
import {MysqlModule} from "./modules/mysql/mysql.module";
import {ConfigModule} from "@nestjs/config";
import configuration from './configs/configs';

@Module({
  imports: [
      ConfigModule.forRoot({
          load:[configuration],
          isGlobal: true,
      }),
      MysqlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
