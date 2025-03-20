import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'usuario@dominio.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Senha.',
    example: 'eng.u1i231ca',
  })
  @IsString()
  readonly password: string;
}
