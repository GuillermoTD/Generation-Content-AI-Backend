import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
          secret: config.get(''), //Esto permite obtener la variable de entorno que permite obtener el secreto para jwt
          signOptions:{
            expiresIn: config.get('') || '7d' //Esto permite obtener la variables de entorno que define la expiracion de token
          }
      })
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
