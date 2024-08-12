import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { OrderEntity } from './order.entity';

@Entity({ name: ETableName.COMMENTS })
export class CommentEntity extends BaseModel {
  @Column({ type: 'text' })
  comment: string;

  @Column()
  order_id: string;

  @OneToOne(() => OrderEntity, (entity) => entity.comment)
  @JoinColumn({ name: 'order_id' })
  order?: OrderEntity;
}
