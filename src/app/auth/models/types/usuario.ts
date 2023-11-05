import { TipoUsuarioEnum } from './tipo-usuario';

export interface Usuario {
  nome: string;
  login: string;
  email: string;
  dominio: string;
  tipoUsuarioEnum: TipoUsuarioEnum;
  id: number;
}
