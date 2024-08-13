import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

import { BasePaginationReqDto } from './base-pagination.req.dto';

export class QueryReqDto extends BasePaginationReqDto {
  @ApiProperty({ required: false, default: '-id' })
  @IsString()
  @IsOptional()
  @Matches(
    /^-?(id|name|surname|email|phone|age|course|course_format|course_type|status|sum|alreadyPaid|group|created_at|manager)$/i,
    { message: 'Invalid order field' },
  )
  order: string = '-id';
}
