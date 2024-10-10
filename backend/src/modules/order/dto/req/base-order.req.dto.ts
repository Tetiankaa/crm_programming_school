import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { ECourse } from '../../../../database/entities/enums/course.enum';
import { ECourseFormat } from '../../../../database/entities/enums/course-format.enum';
import { ECourseType } from '../../../../database/entities/enums/course-type.enum';
import { EOrderStatus } from '../../../../database/entities/enums/order-status.enum';
import { ValidatedInteger } from '../../decorators/validated-integer.decorator';
import { ValidatedTrimmedString } from '../../decorators/validated-trimmed-string.decorator';

export class BaseOrderReqDto {
  @IsOptional()
  @ApiProperty({
    example: '1',
    required: false,
  })
  group_id?: string;

  @ValidatedTrimmedString()
  @IsOptional()
  @Length(1, 35)
  @ApiProperty({
    example: 'Oksana',
    required: false,
  })
  name?: string;

  @ValidatedTrimmedString()
  @IsOptional()
  @Length(1, 35)
  @ApiProperty({
    example: 'Pavlova',
    required: false,
  })
  surname?: string;

  @ValidatedTrimmedString()
  @IsOptional()
  @Matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, {
    message:
      'Email address must be in a valid format (Example: user@example.com)',
  })
  @ApiProperty({
    example: 'user@example.com',
    required: false,
  })
  email?: string;

  @ValidatedTrimmedString()
  @IsOptional()
  @Matches(/^\\d{3}\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/, {
    message: 'Invalid phone number. (Example: 380 12 345 67 89)',
  })
  @ApiProperty({ example: '380 12 345 67 89', required: false })
  phone?: string;

  @ValidatedInteger()
  @IsOptional()
  @Min(16)
  @Max(90)
  @ApiProperty({ example: 24, required: false })
  age?: number | null;

  @IsOptional()
  @IsString()
  @IsEnum(EOrderStatus, {
    message: `Entered order status must be one of the following values: ${Object.values(EOrderStatus)}`,
  })
  @ApiProperty({ example: 'New', required: false })
  status?: EOrderStatus;

  @IsOptional()
  @IsString()
  @IsEnum(ECourse, {
    message: `Entered course must be one of the following values: ${Object.values(ECourse)}`,
  })
  @ApiProperty({ example: 'QACX', required: false })
  course?: ECourse;

  @IsOptional()
  @IsString()
  @IsEnum(ECourseFormat, {
    message: `Entered course format must be one of the following values: ${Object.values(ECourseFormat)}`,
  })
  @ApiProperty({ example: 'online', required: false })
  course_format?: ECourseFormat;

  @IsOptional()
  @IsString()
  @IsEnum(ECourseType, {
    message: `Entered course type must be one of the following values: ${Object.values(ECourseType)}`,
  })
  @ApiProperty({ example: 'premium', required: false })
  course_type?: ECourseType;

  @ValidatedInteger()
  @IsOptional()
  @Min(1)
  @Max(2147483647)
  @ApiProperty({ example: 500, required: false })
  sum?: number | null;

  @ValidatedInteger()
  @IsOptional()
  @Min(1)
  @Max(2147483647)
  @ApiProperty({ example: 500, required: false })
  alreadyPaid?: number | null;
}
