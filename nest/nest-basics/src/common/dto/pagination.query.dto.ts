import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min, min } from 'class-validator';

export class PaginationDtoQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page should be in string' })
  @Min(1, {})
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit should be in string' })
  @Min(1, {})
  @Max(100, { message: 'cannot exced 100' })
  limit?: number = 10;
}
