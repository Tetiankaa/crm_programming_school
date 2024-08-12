import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { EActionTokenType } from './enums/action-token-type.enum';
import { ETableName } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseModel } from './models/base.model';

@Entity({ name: ETableName.ACTION_TOKENS })
export class ActionTokenEntity extends BaseModel {
  @Column()
  manager_id: string;

  @Column('text')
  actionToken: string;

  @Column({ type: 'enum', enum: EActionTokenType })
  tokenType: EActionTokenType;

  @ManyToOne(() => ManagerEntity, (entity) => entity.actionTokens)
  @JoinColumn({ name: 'manager_id' })
  manager?: ManagerEntity;
}
