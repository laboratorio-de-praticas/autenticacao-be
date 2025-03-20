import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginRequestDto {
  @ApiProperty({
    description: 'E-mail do usuário para autenticação.',
    example: 'usuario@dominio.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário para autenticação.',
    example: 'senhaSuperSecreta123',
  })
  @IsString()
  password: string;
}
