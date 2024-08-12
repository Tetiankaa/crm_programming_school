import {Injectable} from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {Configs, DatabaseConfig} from "../../../configs/configs.type";
import path from "node:path";
import process from "node:process";

@Injectable()
export class MysqlConnectService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService<Configs>) {}
    createTypeOrmOptions():  TypeOrmModuleOptions {
        const databaseConfig = this.configService.get<DatabaseConfig>('database');
            return  {
                type:'mysql',
                host: databaseConfig.host,
                port: databaseConfig.port,
                username: databaseConfig.username,
                password: databaseConfig.password,
                database: databaseConfig.db_name,
                entities: [
                    path.join(
                        process.cwd(),
                        'dist',
                        'src',
                        'database',
                        'entities',
                        '*.entity.js',
                    ),
                ],
                migrations: [
                    path.join(
                        process.cwd(),
                        'dist',
                        'src',
                        'database',
                        'migrations',
                        '*.js',
                    ),
                ],
                synchronize: false,
                migrationsRun: true,
            }
    }

}
