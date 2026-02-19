import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit{

    async onModuleInit(){
         await this.$connect();
         console.log("Database connection succeessed");
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Desconectado de la base de datos');
    }

    // Helper para limpiar base de datos en testing
    // async cleanDatabase() {
    //     if (process.env.NODE_ENV === 'production') {
    //     throw new Error('No puedes limpiar la BD en producción');
    //     }
    //         // Orden importante por las relaciones
    //         await this.$transaction([
    //         this.tagOnGeneration.deleteMany(),
    //         this.tagOnImage.deleteMany(),
    //         this.generationVersion.deleteMany(),
    //         this.favorite.deleteMany(),
    //         this.imageGeneration.deleteMany(),
    //         this.generation.deleteMany(),
    //         this.template.deleteMany(),
    //         this.tag.deleteMany(),
    //         this.project.deleteMany(),
    //         this.user.deleteMany(),
    //         ]);
    //     }
} 
