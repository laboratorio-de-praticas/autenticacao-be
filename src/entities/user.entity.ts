import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'enum', enum: UsuarioTipos, nullable: true, default: null })
  tipo_usuario: UsuarioTipos;

  @Column({ type: 'enum', enum: UsuarioStatus, default: UsuarioStatus.ATIVO })
  status_usuario: UsuarioStatus;

  @CreateDateColumn({
    name: 'data_criacao',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_criacao: Date;

  @CreateDateColumn({
    name: 'data_alteracao',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_alteracao: Date;
}
