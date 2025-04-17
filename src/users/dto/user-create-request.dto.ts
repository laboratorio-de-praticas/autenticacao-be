import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

export class UserCreateRequestDto {
  @ApiProperty({
    description: 'Nome do usuário.',
    example: 'João Silva',
  })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  readonly nome: string;

  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'usuario@fatec.sp.gov.br',
  })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  readonly email_institucional: string;

  @ApiProperty({
    description: 'Senha do usuário.',
    example: 'senhaSegura123',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  readonly senha: string;
}
