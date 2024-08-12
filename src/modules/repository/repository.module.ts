import { Global, Module } from '@nestjs/common';

import { CommentRepository } from './services/comment.repository';
import { ManagerRepository } from './services/manager.repository';
import { OrderRepository } from './services/order.repository';

const repositories = [ManagerRepository, OrderRepository, CommentRepository];
@Global()
@Module({
  exports: [...repositories],
  providers: [...repositories],
})
export class RepositoryModule {}
