import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum } from 'class-validator';
import { UsuarioTipos, UsuarioStatus } from 'src/entities/user.entity';

export class UserUpdateResponseDto {
  @ApiProperty({
    description: 'ID do usuário atualizado.',
    example: 13,
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    description: 'Nome do usuário.',
    example: 'João Silva',
  })
  @IsString()
  readonly nome: string;

  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'usuario@fatec.sp.gov.br',
  })
  @IsString()
  readonly email_institucional: string;

  @ApiProperty({
    description: 'Tipo de usuário.',
    example: UsuarioTipos.ADMIN,
    enum: UsuarioTipos,
  })
  @IsEnum(UsuarioTipos)
  readonly tipo_usuario: UsuarioTipos;

  @ApiProperty({
    description: 'Status do usuário.',
    example: UsuarioStatus.ATIVO,
    enum: UsuarioStatus,
  })
  @IsEnum(UsuarioStatus)
  readonly status_usuario: UsuarioStatus;

  @ApiProperty({
    description: 'Mensagem de sucesso.',
    example: 'Usuário atualizado com sucesso.',
  })
  @IsString()
  readonly message: string;
}
