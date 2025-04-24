import { UsuarioStatus } from 'src/entities/user.entity';

export interface UserAuthenticated {
  id: number;
  email_institucional: string;
  status_usuario: UsuarioStatus;
}
