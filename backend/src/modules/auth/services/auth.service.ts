import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EntityManager, Repository } from 'typeorm';

import { errorMessages } from '../../../common/constants/error-messages.constant';
import { Configs, SecurityConfig } from '../../../configs/configs.type';
import { EUserRole } from '../../../database/entities/enums/user-role.enum';
import { ManagerEntity } from '../../../database/entities/manager.entity';
import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { LoginReqDto } from '../dto/req/login.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { ITokenPair } from '../interfaces/token.interface';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private securityConfig: SecurityConfig;
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService<Configs>,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
  ) {
    this.securityConfig = this.configService.get<SecurityConfig>('security');
  }

  public async login(dto: LoginReqDto): Promise<AuthResDto> {
    return await this.entityManager.transaction(async (entityManager) => {
      const managerRepository = entityManager.getRepository(ManagerEntity);
      const refreshTokenRepository =
        entityManager.getRepository(RefreshTokenEntity);

      const manager = await managerRepository.findOneBy({ email: dto.email });

      if (!manager || !manager.is_active) {
        throw new UnauthorizedException(errorMessages.WRONG_EMAIL_OR_PASSWORD);
      }

      const isPasswordValid = await bcrypt.compare(
        dto.password,
        manager.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException(errorMessages.WRONG_EMAIL_OR_PASSWORD);
      }

      await refreshTokenRepository.delete({
        deviceId: dto.deviceId,
        manager_id: manager.id,
      });

      const tokenPair = await this.generateAndSaveTokenPair(
        manager.id,
        manager.user_role,
        dto.deviceId,
        refreshTokenRepository,
      );

      const editedManagerEntity = await managerRepository.save({
        ...manager,
        last_login: new Date(),
      });

      return AuthMapper.toDto(editedManagerEntity, tokenPair);
    });
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    return await this.entityManager.transaction(async (entityManager) => {
      const refreshTokenRepository =
        entityManager.getRepository(RefreshTokenEntity);

      await refreshTokenRepository.delete({
        deviceId: userData.deviceId,
        manager_id: userData.userId,
      });

      const tokenPair = await this.generateAndSaveTokenPair(
        userData.userId,
        userData.role,
        userData.deviceId,
        refreshTokenRepository,
      );

      return AuthMapper.toTokenResponseDto(tokenPair);
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.securityConfig.hashPasswordRounds);
  }

  private async generateAndSaveTokenPair(
    managerId: string,
    role: EUserRole,
    deviceId: string,
    repository: Repository<RefreshTokenEntity>,
  ): Promise<ITokenPair> {
    const tokenPair = await this.tokenService.generateTokenPair({
      role,
      manager_id: managerId,
      deviceId,
    });

    await Promise.all([
      repository.save(
        repository.create({
          refreshToken: tokenPair.refreshToken,
          deviceId,
          manager_id: managerId,
        }),
      ),
      this.authCacheService.saveToken(
        tokenPair.accessToken,
        deviceId,
        managerId,
      ),
    ]);

    return tokenPair;
  }
}
