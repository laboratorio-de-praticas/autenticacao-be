import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UsuarioTipos {
  ADMIN = 'Admin',
  ATENDENTE = 'Atendente',
}

export enum UsuarioStatus {
  PENDENTE = 'Pendente',
  ATIVO = 'Ativo',
  DESLIGADO = 'Desligado',
}

@Entity('Usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text' })
  senha: string;

  @Column({ type: 'text', unique: true })
  email_institucional: string;

  @Column({ type: 'enum', enum: UsuarioTipos, nullable: true })
  tipo_usuario: UsuarioTipos;

  @Column({ type: 'enum', enum: UsuarioStatus, default: UsuarioStatus.ATIVO })
  status_usuario: UsuarioStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_alteracao: Date;
}
