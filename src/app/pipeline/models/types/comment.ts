import { Usuario } from './assignee';

export interface Comment {
  id?: string;
  name: string;
  image?: string;
  text: string;
}
export interface Comentario {
  Id: string;
  Texto: string;
  Usuario: Usuario;
}
