import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @ApiPropertyOptional({
    description: 'Novo e-mail do usuário.',
    example: 'novoemail@exemplo.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Nova senha do usuário.',
    example: 'novasenha123',
  })
  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string.' })
  password?: string;
}
