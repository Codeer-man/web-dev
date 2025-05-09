import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please enter a valide email address' })
  email: string;

  @MinLength(6, { message: '6 words are reuiqred' })
  @IsString()
  password: string;
}
