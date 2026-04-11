import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UserDTO } from './dto/user.dto';
import { SignupDTO } from './dto/signup.dto';
import { publicEndpoint } from './guards/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Login Endpoint
  @publicEndpoint()
  @HttpCode(200)
  @Post('login')
  login(@Body() LoginData: LoginDTO) {
    return this.authService.login(LoginData);
  }

  //Signup Endpoint
  @publicEndpoint()
  @Post('signup')
  signup(@Body() SignupData: SignupDTO) {
    return this.authService.signup(SignupData);
  }
}
