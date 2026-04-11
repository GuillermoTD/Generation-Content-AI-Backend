import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { noDeprecation } from 'process';



//Esta clase se encarga de validar cuando se envia una petición si existe en la misma un token valido,
/*Esta clase utiliza pass´port para validar el jwt. Cuando se ejecuta se activan tres opciones las cuales son:
jwtFromRequest: este paremetro se encarga de extraer el token de la peticion
ignoreExpiration: este paremetro valida si el token esta expirado o no
secretOrKey:Este parametro lleva el secreto que debe usarse para poder revisar el token*/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt-strategy') {
    constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET')!,
    });
  }

   async validate(payload: { sub: string; email: string }) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}

