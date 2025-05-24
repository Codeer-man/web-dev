import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class updatePostDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'title must be string' })
  @MinLength(3, { message: 'title must be at least 3 characters long' })
  @MaxLength(50, { message: 'title must not exceed 50 characters' })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'content is required' })
  @IsString({ message: 'content must be string' })
  @MinLength(10, { message: 'title must be at least 10 characters long' })
  content?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be string' })
  @MinLength(3, { message: 'Author must be at least 3 characters long' })
  @MaxLength(25, { message: 'Author must not exceed 20 characters' })
  author?: string;
}
