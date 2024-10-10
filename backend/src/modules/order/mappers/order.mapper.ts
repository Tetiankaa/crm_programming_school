import { OrderEntity } from '../../../database/entities/order.entity';
import { PaginationResDto } from '../../pagination/dto/res/pagination.res.dto';
import { OrderResDto } from '../dto/res/order.res.dto';
import { CommentMapper } from './comment.mapper';

export class OrderMapper {
  public static toOrderDto(entity: OrderEntity): OrderResDto {
    return {
      id: entity.id,
      name: entity.name,
      surname: entity.surname,
      age: entity.age,
      email: entity.email,
      phone: entity.phone,
      course: entity.course,
      course_format: entity.course_format,
      course_type: entity.course_type,
      status: entity.status,
      sum: entity.sum,
      alreadyPaid: entity.alreadyPaid,
      created_at: entity.created_at,
      msg: entity.msg,
      utm: entity.utm,
      group_name: entity.group ? entity.group.name : null,
      manager_name: entity.manager ? entity.manager.name : null,
      comments: entity.comments
        ? CommentMapper.toListDto(entity.comments)
        : null,
    };
  }

  public static toOrderListDto(
    paginationData: PaginationResDto<OrderEntity>,
  ): PaginationResDto<OrderResDto> {
    return {
      data: paginationData.data.map((order) => this.toOrderDto(order)),
      limit: paginationData.limit,
      page: paginationData.page,
      totalCount: paginationData.totalCount,
    };
  }
}
