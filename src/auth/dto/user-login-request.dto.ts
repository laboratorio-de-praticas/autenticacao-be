import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

export class UserLoginRequestDto {
  @ApiProperty({
    description: 'E-mail do usuário para autenticação.',
    example: 'usuario@dominio.com',
  })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail(
    { host_whitelist: [`${process.env.WHITELIST_DOMAIN}`] },
    { message: 'Insira um e-mail válido.' },
  )
  readonly email: string;

  @ApiProperty({
    description: 'Senha do usuário para autenticação.',
    example: 'senhaSuperSecreta123',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  password: string;
}
