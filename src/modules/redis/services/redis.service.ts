import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { LoggerService } from '../../logger/services/logger.service';
import { REDIS_CLIENT } from '../constants/redis.constants';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis,
    private readonly loggerService: LoggerService,
  ) {}

  public async execMulti(commands: [string, ...any[]][]): Promise<any> {
    try {
      const multi = this.redisClient.multi();
      commands.forEach((command) => multi[command[0]](...command.slice(1)));
      await multi.exec();
    } catch (error) {
      this.loggerService.error(error);
    }
  }
}
