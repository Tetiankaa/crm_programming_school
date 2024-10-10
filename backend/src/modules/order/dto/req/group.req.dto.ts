import { ValidatedTrimmedString } from '../../decorators/validated-trimmed-string.decorator';
import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupReqDto {
  @ValidatedTrimmedString()
  @IsNotEmpty()
  @Length(2, 30)
  @ApiProperty({
    example: 'sept-2024',
  })
  name: string;
}
