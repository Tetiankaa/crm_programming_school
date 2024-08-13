import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { OrderEntity } from './order.entity';

@Entity(ETableName.GROUPS)
export class GroupEntity extends BaseModel {
  @Column({ type: 'text' })
  name: string;

  @Column()
  order_id: string;

  @ManyToOne(() => OrderEntity, (entity) => entity.group)
  @JoinColumn({ name: 'order_id' })
  orders?: OrderEntity[];
}
