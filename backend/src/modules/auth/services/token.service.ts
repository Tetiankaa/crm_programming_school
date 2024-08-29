import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { errorMessages } from '../../../common/constants/error-messages.constant';
import { Configs, JWTConfig } from '../../../configs/configs.type';
import { LoggerService } from '../../logger/services/logger.service';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { ETokenType } from '../enum/token-type.enum';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class TokenService {
  private jwtConfig: JWTConfig;
  constructor(
    private readonly configService: ConfigService<Configs>,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  public async generateTokenPair(
    payload: IJwtPayload,
  ): Promise<TokenPairResDto> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.access_secret,
      expiresIn: this.jwtConfig.access_expires_in,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refresh_secret,
      expiresIn: this.jwtConfig.refresh_expires_in,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async verifyToken(
    token: string,
    tokenType: ETokenType,
  ): Promise<IJwtPayload> {
    try {
      const secret = this.getSecret(tokenType);
      return (await this.jwtService.verifyAsync(token, {
        secret,
      })) as IJwtPayload;
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  private getSecret(tokenType: ETokenType): string {
    let secret: string;

    switch (tokenType) {
      case ETokenType.ACCESS:
        secret = this.jwtConfig.access_secret;
        break;
      case ETokenType.REFRESH:
        secret = this.jwtConfig.refresh_secret;
        break;
      default:
        throw new UnauthorizedException(errorMessages.INVALID_TOKEN_TYPE);
    }
    return secret;
  }
}
