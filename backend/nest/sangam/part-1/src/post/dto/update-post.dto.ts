import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty({ message: 'The title must not be empty' })
  @IsString({ message: 'Title can only be string' })
  @MinLength(3, { message: 'must be 3 character long' })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'The content must not be empty' })
  @IsString({ message: 'content' })
  @MinLength(3, { message: 'must be 3 character long' })
  content?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'The aythor must not be empty' })
  @IsString({ message: 'author can only be string' })
  @MinLength(3, { message: 'must be 3 character long' })
  authorName?: string;
}
