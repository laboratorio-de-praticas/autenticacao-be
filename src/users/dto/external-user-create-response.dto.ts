import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ExternalUserCreateResponseDto {
  @ApiProperty({
    description: 'Chave de acesso do visitante.',
    example: '1234',
  })
  @IsString()
  @MaxLength(4)
  readonly chave_acesso: string;

  @ApiProperty({
    description: 'Mensagem de sucesso...ou não.',
    example: 'Cadastro do visitante realizado com sucesso.',
  })
  @IsString()
  readonly message: string;
}
