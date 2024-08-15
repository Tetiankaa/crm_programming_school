import { Module } from '@nestjs/common';

import { PaginationModule } from '../pagination/pagination.module';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [PaginationModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
