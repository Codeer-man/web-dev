import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'username is required' })
  @IsString({ message: 'username must be a string' })
  @MinLength(3, { message: 'username should have at least 3 characters' })
  @MaxLength(25, { message: 'username cannot exceed 25 characters' })
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password should have at least 6 characters' })
  @MaxLength(25, { message: 'password cannot exceed 25 characters' })
  password: string;
}
