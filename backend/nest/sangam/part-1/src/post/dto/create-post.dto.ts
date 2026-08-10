/**
 * NestJS officially recommends using classes instead of TypeScript interfaces for DTOs. Because interfaces disappear after your
 * code compiles into JavaScript, NestJS cannot look at them at runtime. Classes remain intact, allowing NestJS to perform data
 * validation and transformation dynamically
 *
 * stack overflow
 * https://stackoverflow.com/questions/53531488/why-do-we-need-dtos-and-interfaces-both-in-nestjs
 */

import { IsNotEmpty, IsString, MinLength } from 'class-validator';
//= ! i am going to asign them before using
export class CreatePostDto {
  @IsNotEmpty({ message: 'The title must not be empty' })
  @IsString({ message: 'Title can only be string' })
  @MinLength(3, { message: 'must be 3 character long' })
  title!: string;

  @IsNotEmpty({ message: 'The content must not be empty' })
  @IsString({ message: 'content' })
  @MinLength(3, { message: 'must be 3 character long' })
  content!: string;

  @IsNotEmpty({ message: 'The aythor must not be empty' })
  @IsString({ message: 'author can only be string' })
  @MinLength(3, { message: 'must be 3 character long' })
  authorName!: string;
}
