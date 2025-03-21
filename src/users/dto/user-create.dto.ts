import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

export class UserCreateDto {
  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'usuario@fatec.sp.gov.br',
  })
  @IsEmail(
    { host_whitelist: [`${process.env.WHITELIST_DOMAIN}`] },
    { message: 'Insira um e-mail válido do domínio fatec.sp.gov.br' },
  )
  readonly email: string;

  @ApiProperty({
    description: 'Senha.',
    example: 'eng.u1i231ca',
  })
  @IsString()
  readonly password: string;
}
