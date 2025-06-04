import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationDtoQuery } from 'src/common/dto/pagination.query.dto';

export class FindPostQueryDto extends PaginationDtoQuery {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;
}
