import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ETableName } from './enums/table-name.enum';
import { ECourseType } from './enums/course-type.enum';

@Entity({ name: ETableName.COURSE_TYPES })
export class CourseTypeEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'enum', enum: ECourseType })
  course_type: ECourseType;
}
