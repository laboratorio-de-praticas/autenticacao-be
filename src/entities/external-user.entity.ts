import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Visitantes')
export class Visitor {
  @PrimaryGeneratedColumn()
  id_visitante: number;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text' })
  telefone: string;

  @Column({ type: 'text', unique: true })
  chave_acesso: string;

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
