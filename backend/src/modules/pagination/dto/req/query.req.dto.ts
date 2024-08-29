import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Validate } from 'class-validator';

import { IsValidOrderField } from '../../../../common/validators/is-valid-order-field.validator';
import {
  EOrderFieldsAsc,
  EOrderFieldsDesc,
} from '../../models/enums/order-fields.enum';
import { BasePaginationReqDto } from './base-pagination.req.dto';

export class QueryReqDto extends BasePaginationReqDto {
  @ApiProperty({
    required: false,
    default: EOrderFieldsDesc.ID,
    enum: [
      ...Object.values(EOrderFieldsAsc),
      ...Object.values(EOrderFieldsDesc),
    ],
    description:
      'Use a "-" before the field name for descending order (e.g., "-id" for descending order by ID)',
  })
  @IsString()
  @IsOptional()
  @Validate(IsValidOrderField)
  order?: EOrderFieldsDesc | EOrderFieldsAsc = EOrderFieldsDesc.ID;
}
