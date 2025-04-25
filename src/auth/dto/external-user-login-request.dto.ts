import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

export class ExternalUserLoginRequestDto {
  @ApiProperty({
    description: 'Chave de acesso do visitante.',
    example: '1234',
  })
  @IsNotEmpty({ message: 'A chave de acesso não pode estar vazia.' })
  chave_acesso: string;
}
