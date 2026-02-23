import {Injectable,UnauthorizedException  } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from './dto/signup.dto';
import { UserDTO } from './dto/user.dto';


@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService, private jwtService:JwtService){}
    
    async login(loginDTO:LoginDTO){
        //Datos enviados por el usuario
        const {email, password} = loginDTO;

        //Consulta a base de datos
        const user = await this.prisma.user.findUnique({where:{email}})

        if(!user){
            throw new UnauthorizedException('Credential invalid')
        }

        //se compará la password enviada a login con la que esta en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password)

        //Si el password no coincide
        if(!isPasswordValid){
            throw new UnauthorizedException("Contraseña incorrecta");
        }

        const payload = {
            sub:user.id,
            email:user.email
        }

        //Se genera el token
        const accessToken = await this.jwtService.sign(payload)

        //Se retorna un objeto con los datos requeridos al frontend
        return {
            accessToken,
            user:{
                id:user.id,
                email:user.email,
                name:user.name
            }
        } 
    }

    async signup(signupDTO:SignupDTO){
        return {message:"Esto parece que hace signup"}
    }
}
