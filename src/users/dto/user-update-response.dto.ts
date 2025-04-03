import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserUpdateResponseDto {
  @ApiProperty({
    description: 'ID do usuário atualizado.',
    example: 13,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Mensagem de sucesso.',
    example: 'Usuário atualizado com sucesso.',
  })
  @IsString()
  message: string;
}
