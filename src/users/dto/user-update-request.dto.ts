import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';
import { UsuarioTipos, UsuarioStatus } from 'src/entities/user.entity';

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
    example: 'novoemail@fatec.sp.gov.br',
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
    example: UsuarioTipos.ATENDENTE,
    enum: UsuarioTipos,
  })
  @IsOptional()
  @IsEnum(UsuarioTipos, { message: 'Tipo de usuário inválido.' })
  tipo_usuario?: UsuarioTipos;

  @ApiPropertyOptional({
    description: 'Novo status do usuário.',
    example: UsuarioStatus.ATIVO,
    enum: UsuarioStatus,
  })
  @IsOptional()
  @IsEnum(UsuarioStatus, { message: 'Status do usuário inválido.' })
  status_usuario?: UsuarioStatus;
}
