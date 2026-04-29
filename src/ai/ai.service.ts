import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { CONTENT_PROMPTS } from './prompts/contentPrompts';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AiService {

  constructor(private config: ConfigService,private client: OpenAI, private prisma:PrismaService) {
    this.client = new OpenAI({
      apiKey: this.config.get<string>('GROK_API_KEY'),
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }
  //Este metodo tiene como responsabilidad dar contexto de lo que se espera del modelo haciendo que este responda de forma eficiente dependiendo del tipo de contenido que se le este pidiendo.
  private getSystemPrompt(contentType: string): string {
    return (
      CONTENT_PROMPTS[contentType] ??
      'Eres un asistente experto en creación de contenido digital.'
    );
  }

  //Generamos respeusta de parte del modelo dependiendo del prompt que se le pase
  async generateText(prompt: string, contentType: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: this.getSystemPrompt(contentType),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    if (completion.choices[0].message.content === null) {
      throw new InternalServerErrorException(
        'El modelo no generó ninguna respuesta',
      );
    }
    // const saveGeneration = await this.prisma.generation.create({
    //   data:{
    //     prompt,
    //     contentType,
    //     tone,
    //     language:language ?? 'es',
    //     content,
    //     model:'llama-3.3-70b-versatile',
    //     tokenUsed:completion.usage?.total_tokens,
    //     userId:
        
    //   }
    // })

    return completion.choices[0].message.content!;
  }
}
