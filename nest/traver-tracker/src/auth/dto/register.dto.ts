import {IsEmail, isEmail,IsString,MinLength}  from "class-validator"
//install class-validation

export class RegisterDto{
    @IsEmail({},{message:'Please provide a valid email address'})
    email: string

    @IsString()
    @MinLength(6,{message:"password must be 6 characte long"})
    password:string
}

