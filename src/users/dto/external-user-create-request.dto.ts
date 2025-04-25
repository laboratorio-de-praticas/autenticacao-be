import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExternalUserCreateRequestDto {
  @ApiProperty({
    description: 'Nome do visitante',
    example: 'Davi da Silva',
  })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @IsString()
  readonly nome: string;

  @ApiProperty({
    description: 'Telefone do visitante',
    example: '1399675432321',
  })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  @IsString()
  readonly telefone: string;
}
