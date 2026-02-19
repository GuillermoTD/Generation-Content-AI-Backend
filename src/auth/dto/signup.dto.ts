import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator"


export class SignupDTO{
    @IsEmail()
    email:string;

    @IsStrongPassword({
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
    }, {
        message: 'La contraseña no es suficientemente segura'
      })
    password:string;

    @IsString()
    fullName:string;
    
    @IsNumber()
    phone:number
}