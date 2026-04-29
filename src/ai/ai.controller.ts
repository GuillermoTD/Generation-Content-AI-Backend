import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateContentDto } from './dto/generate-content.dto';

@Controller('generate')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('text')
  async generateText(@Body() generateRequest:GenerateContentDto): Promise<{ content: string }> {
    return this.aiService.generateText(generateRequest.prompt, generateRequest.contentType).then((content) => ({ content }));
  }
}
