import { ApiProperty } from '@nestjs/swagger';

export class PaginationResDto {

  @ApiProperty({
    isArray: true,
    description: 'Array of data items',
    type: any[],
  })
  data: any[];

  @ApiProperty({
    example: 1,
    description: 'Current page number',
  })
  page: number;

  @ApiProperty({
    example: 25,
    description: 'Number of items per page',
  })
  limit: number;

  @ApiProperty({
    example: 500,
    description: 'Total number of items',
  })
  totalCount: number;
}
