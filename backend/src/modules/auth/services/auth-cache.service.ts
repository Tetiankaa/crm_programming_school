import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JWTConfig } from '../../../configs/configs.type';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JWTConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  public async saveToken(
    token: string,
    deviceId: string,
    managerId: string,
  ): Promise<void> {
    const key = this.getKey(deviceId, managerId);

    const commands: [string, ...any[]][] = [
      ['del', key],
      ['sadd', key, token],
      ['expire', key, this.jwtConfig.access_expires_in],
    ];

    await this.redisService.execMulti(commands);
  }

  public async isTokenExists(
    token: string,
    deviceId: string,
    managerId: string,
  ): Promise<boolean> {
    const key = this.getKey(deviceId, managerId);
    const setOfValues = await this.redisService.sMembers(key);
    return setOfValues.includes(token);
  }

  private getKey(deviceId: string, managerId: string): string {
    return `ACCESS_TOKEN:${managerId}:${deviceId}`;
  }
}
