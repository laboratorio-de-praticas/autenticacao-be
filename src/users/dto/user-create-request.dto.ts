import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

export class UserCreateRequestDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @IsString()
  readonly nome: string;
  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'usuario@fatec.sp.gov.br',
  })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail(
    { host_whitelist: [`${process.env.WHITELIST_DOMAIN}`] },
    { message: 'Insira um e-mail válido.' },
  )
  readonly email_institucional: string;

  @ApiProperty({
    description: 'Senha.',
    example: 'eng.u1i231ca',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  readonly senha: string;
}
