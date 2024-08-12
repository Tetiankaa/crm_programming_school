import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { RedisModule } from '../redis/redis.module';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [RedisModule, JwtModule],
  providers: [AuthService, AuthCacheService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
