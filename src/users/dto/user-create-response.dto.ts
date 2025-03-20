import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserCreateResponseDto {
  @ApiProperty({
    description: 'ID do usuário recem criado.',
    example: 13,
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    description: 'Mensagem de sucesso...ou não.',
    example: 'Usuário criado com sucesso.',
  })
  @IsString()
  readonly message: string;
}
