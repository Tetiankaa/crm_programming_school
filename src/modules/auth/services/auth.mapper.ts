import { ManagerEntity } from '../../../database/entities/manager.entity';
import { ManagerMapper } from '../../manager/services/manager.mapper';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { ITokenPair } from '../interfaces/token.interface';

export class AuthMapper {
  public static toDto(
    entity: ManagerEntity,
    tokenPair: ITokenPair,
  ): AuthResDto {
    return {
      tokens: this.toTokenResponseDto(tokenPair),
      manager: ManagerMapper.toDto(entity),
    };
  }

  private static toTokenResponseDto(tokenPair: ITokenPair): TokenPairResDto {
    return {
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
    };
  }
}
