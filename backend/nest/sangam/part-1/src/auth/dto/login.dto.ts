import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Must be a email' })
  email: string;

  @IsNotEmpty({ message: 'password is requied' })
  @MinLength(3, { message: 'Must be longer than 6 character' })
  password: string;
}
