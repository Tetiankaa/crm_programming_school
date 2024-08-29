import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { QueryReqDto } from '../dto/req/query.req.dto';
import { PaginationResDto } from '../dto/res/pagination.res.dto';
import { EOrder } from '../models/enums/order.enum';
import { RelationConfig } from '../models/types/relation-config.type';

@Injectable()
export class PaginationService {
  private readonly ENTITY_ALIAS = 'entity';

  public async paginate<T>(
    query: QueryReqDto,
    repository: Repository<T>,
    relations: RelationConfig[],
  ): Promise<PaginationResDto<T>> {
    const { page, limit, order: enteredOrder } = query;

    const skip = (page - 1) * limit;

    const qb = repository.createQueryBuilder(this.ENTITY_ALIAS);

    const orderBy =
      enteredOrder && enteredOrder.startsWith('-')
        ? enteredOrder.slice(1)
        : enteredOrder;

    const order =
      enteredOrder && enteredOrder.startsWith('-') ? EOrder.DESC : EOrder.ASC;

    if (relations.length) {
      relations.forEach((relation) => {
        Object.entries(relation).forEach(([key, value]) => {
          if (value) {
            qb.leftJoinAndSelect(`${this.ENTITY_ALIAS}.${key}`, key);
          }
        });
      });
    }

    if (enteredOrder) qb.addOrderBy(`${this.ENTITY_ALIAS}.${orderBy}`, order);

    const [data, totalCount] = await qb
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      limit,
      page,
      totalCount,
    };
  }
}
