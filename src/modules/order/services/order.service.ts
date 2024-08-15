import { Injectable } from '@nestjs/common';

import { OrderEntity } from '../../../database/entities/order.entity';
import { QueryReqDto } from '../../pagination/dto/req/query.req.dto';
import { PaginationResDto } from '../../pagination/dto/res/pagination.res.dto';
import { PaginationService } from '../../pagination/services/pagination.service';
import { OrderRepository } from '../../repository/services/order.repository';
import { OrderResDto } from '../dto/res/order.res.dto';
import { OrderMapper } from './order.mapper';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paginationService: PaginationService,
  ) {}

  public async getAll(
    query: QueryReqDto,
  ): Promise<PaginationResDto<OrderResDto>> {
    const data = await this.paginationService.paginate<OrderEntity>(
      query,
      this.orderRepository,
      [{ manager: true }, { group: true }],
    );
    return OrderMapper.toOrderListDto(data);
  }
}
