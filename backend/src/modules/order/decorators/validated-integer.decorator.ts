import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';

export const ValidatedInteger = (): PropertyDecorator => {
  return applyDecorators(
    IsNumber(),
    IsInt(),
    Type(() => Number),
  );
};
