import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AuthModule, PrismaModule, AiModule,
    ConfigModule.forRoot({
      isGlobal:true //Esto permite que el archivo .env sea global en toda la aplicacion
    }),
    AiModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
