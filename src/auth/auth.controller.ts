import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UserDTO } from './dto/user.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    //Login Endpoint
    @HttpCode(200)
    @Get("login")
    login(@Body() LoginData:LoginDTO){
        return this.authService.login(LoginData)
    }

    //Signup Endpoint
    @HttpCode(201)
    @Get("signup")
    signup(){
        // return this.authService.signup(SignupData)
        return "Esto parece que hace signup"
    }


}
