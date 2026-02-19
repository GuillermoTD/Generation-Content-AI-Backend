import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, PrismaModule,
    ConfigModule.forRoot({
      isGlobal:true //Esto permite que el archivo .env sea global en toda la aplicacion
    })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
