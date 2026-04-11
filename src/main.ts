import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:"http://localhost:5173",
    methods:["GET","POST","DELETE","PUT","PATCH"],
    credentials:true
  })

  //Validation global
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true
  }))

  app.useGlobalGuards(new JwtGuard(new Reflector()));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
