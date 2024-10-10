import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ECourseFormat } from './enums/course-format.enum';
import { ETableName } from './enums/table-name.enum';

@Entity({ name: ETableName.COURSE_FORMATS })
export class CourseFormatEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'enum', enum: ECourseFormat })
  course_format: ECourseFormat;
}
