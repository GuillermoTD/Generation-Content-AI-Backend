import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
//En esta linea se define cual es el strategy a usar, en este caso se esta usando el strategy de jwt
export class JwtGuard extends AuthGuard('jwt-strategy') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const publicEndpoint = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (publicEndpoint) return true;

    return super.canActivate(context);
  }
}
