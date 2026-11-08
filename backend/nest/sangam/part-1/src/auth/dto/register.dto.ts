import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Must be a email' })
  email: string;

  @IsNotEmpty({ message: 'Name is requied' })
  @MinLength(3, { message: 'Must be longer than 3 character' })
  name: string;

  @IsNotEmpty({ message: 'password is requied' })
  @IsString()
  @MinLength(3, { message: 'Must be longer than 6 character' })
  password: string;
}
