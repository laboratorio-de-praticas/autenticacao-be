import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UsuarioStatus, UsuarioTipos } from 'src/entities/user.entity';

export class UserUpdateRequestDto {
  @ApiPropertyOptional({
    description: 'Novo nome do usuário.',
    example: 'João Silva',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  nome?: string;

  @ApiPropertyOptional({
    description: 'Novo e-mail do usuário.',
    example: 'novoemail@exemplo.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email_institucional?: string;

  @ApiPropertyOptional({
    description: 'Nova senha do usuário.',
    example: 'novasenha123',
  })
  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string.' })
  senha?: string;

  @ApiPropertyOptional({
    description: 'Novo tipo de usuário.',
    enum: UsuarioTipos,
    example: UsuarioTipos.ADMIN,
  })
  @IsOptional()
  @IsEnum(UsuarioTipos, { message: 'Tipo do usuário inválido.' })
  tipo_usuario?: UsuarioTipos;

  @ApiPropertyOptional({
    description: 'Novo tipo de usuário.',
    enum: UsuarioStatus,
    example: UsuarioStatus.ATIVO,
  })
  @IsOptional()
  @IsEnum(UsuarioStatus, { message: 'Tipo do usuário inválido.' })
  status_usuario?: UsuarioStatus;
}
