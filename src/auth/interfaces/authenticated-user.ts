import { UsuarioStatus } from 'src/entities/user.entity';

export interface AuthenticatedUser {
  id: number;
  email_institucional: string;
  status_usuario: UsuarioStatus;
}
