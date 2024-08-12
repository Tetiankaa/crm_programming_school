import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @CreateDateColumn({ default: null })
  created_at: Date;
}
