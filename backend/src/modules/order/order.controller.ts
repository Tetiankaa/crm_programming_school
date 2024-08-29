import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-res.decorator';
import { QueryReqDto } from '../pagination/dto/req/query.req.dto';
import { PaginationResDto } from '../pagination/dto/res/pagination.res.dto';
import { OrderResDto } from './dto/res/order.res.dto';
import { OrderService } from './services/order.service';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiBearerAuth()
  @SkipAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiPaginatedResponse(OrderResDto)
  @ApiOperation({
    description:
      'Fetches a paginated list of orders. Supports ordering by various fields.',
  })
  public async getAll(
    @Query() query: QueryReqDto,
  ): Promise<PaginationResDto<OrderResDto>> {
    return await this.orderService.getAll(query);
  }
}
