import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    //Datos enviados por el usuario
    const { email, password } = loginDTO;

    //Consulta a base de datos
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Credencial invalida');
    }

    //se compará la password enviada a login con la que esta en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //Si el password no coincide
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    //Se genera el token
    const accessToken = await this.jwtService.signAsync(payload);

    //Se retorna un objeto con los datos requeridos al frontend
    return {
      message:'Login Success',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async signup(signupDTO: SignupDTO) {
    const { email, password, fullName } = signupDTO;

    // Verificar si el correo ya existe en la base de datos
    const existinUser = await this.prisma.user.findUnique({ where: { email } });

    if (existinUser) {
      throw new ConflictException('Este correo ya existe');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    //Crear el usuario en la base de datos
    const userCreated = await this.prisma.user.create({
      data: { email, name: fullName, password: hashedPassword },
    });

    //Crear payload para el token
    const payload = {
      sub: userCreated.id,
      email: email,
    };
    //Generar el token para el nuevo usuario
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: userCreated.id,
        email: userCreated.email,
        name: userCreated.name,
      },
    };
  }
}
