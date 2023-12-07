import { IUsuario } from './assignee';

export interface Comment {
  id?: string;
  name: string;
  image?: string;
  text: string;
}
export interface IComentario {
  Id: string;
  Texto: string;
  Usuario: IUsuario;
}
