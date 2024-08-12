import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CommentEntity } from './comment.entity';
import { ECourse } from './enums/course.enum';
import { ECourseFormat } from './enums/course-format.enum';
import { ECourseType } from './enums/course-type.enum';
import { EOrderStatus } from './enums/order-status.enum';
import { ETableName } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseModel } from './models/base.model';

@Entity({ name: ETableName.ORDERS })
export class OrderEntity extends BaseModel {
  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  surname: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'enum', enum: ECourse, nullable: true })
  course: ECourse;

  @Column({ type: 'enum', enum: ECourseFormat, nullable: true })
  course_format: ECourseFormat;

  @Column({ type: 'enum', enum: ECourseType, nullable: true })
  course_type: ECourseType;

  @Column({ type: 'enum', enum: EOrderStatus, nullable: true })
  status: EOrderStatus;

  @Column({ type: 'int', nullable: true })
  sum: number;

  @Column({ type: 'int', nullable: true })
  alreadyPaid: number;

  @Column({ type: 'text', nullable: true })
  utm: string;

  @Column({ type: 'text', nullable: true })
  msg: string;

  @Column({ nullable: true})
  manager_id: string;

  @OneToOne(() => ManagerEntity, (entity) => entity.order)
  @JoinColumn({ name: 'manager_id' })
  manager?: ManagerEntity;

  @OneToOne(() => CommentEntity, (comment) => comment.order)
  comment?: CommentEntity;
}
