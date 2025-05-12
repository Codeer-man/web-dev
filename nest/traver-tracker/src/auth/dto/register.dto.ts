import { IsEmail, IsString, MinLength } from 'class-validator';
//install class-validator and class-transformer

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'password must be 6 characte long' })
  password: string;
}
