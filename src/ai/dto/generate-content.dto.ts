import { ContentType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class GenerateContentDto {
    @IsEnum(ContentType)
    @IsNotEmpty()
    contentType!: ContentType

    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: 'El prompt debe tener al menos 10 caracteres' })
    prompt!: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    tone?: string

    @IsOptional()
    @IsString()
    language?: string






    
}