import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { ActionTokenEntity } from './action-token.entity';
import { ETableName } from './enums/table-name.enum';
import { EUserRole } from './enums/user-role.enum';
import { BaseModel } from './models/base.model';
import { OrderEntity } from './order.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity({ name: ETableName.MANAGERS })
export class ManagerEntity extends BaseModel {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  surname: string;

  @Column({ type: 'text' })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @Column({ type: 'date' })
  last_login: Date;

  @Column({ type: 'enum', enum: EUserRole })
  user_role: EUserRole;

  @OneToMany(() => OrderEntity, (entity) => entity.manager)
  orders?: OrderEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.manager)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => ActionTokenEntity, (entity) => entity.manager)
  actionTokens?: ActionTokenEntity[];
}
