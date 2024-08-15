import { Global, Module } from '@nestjs/common';

import { ActionTokenRepository } from './services/action-token.repository';
import { GroupRepository } from './services/group.repository';
import { ManagerRepository } from './services/manager.repository';
import { OrderRepository } from './services/order.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';

const repositories = [
  ManagerRepository,
  OrderRepository,
  GroupRepository,
  RefreshTokenRepository,
  ActionTokenRepository,
];
@Global()
@Module({
  exports: [...repositories],
  providers: [...repositories],
})
export class RepositoryModule {}
