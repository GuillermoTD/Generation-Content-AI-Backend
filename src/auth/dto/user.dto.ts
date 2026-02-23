import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class userResponse {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  name: string;
}

export class UserDTO {
  @IsString()
  accessToken: string;

  @ValidateNested()//Esto valida el objeto userResponse
  @Type(() => userResponse)//Esto permite usar y mapear el dto externo
  user: userResponse
}
