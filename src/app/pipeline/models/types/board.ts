import { Coluna, IColuna } from './colunas';

export interface IBoard {
  id: number;
  nome: string;
  descricao: string;
  colunas: IColuna[];
}

export class Board {
  id: number | null;
  nome: string;
  descricao: string;
  colunas: IColuna[] | null;
  constructor(parms: Partial<Board>) {
    this.id = parms.id || null;
    this.nome = parms.nome || '';
    this.descricao = parms.descricao || '';
    this.colunas = parms.colunas || null;
  }
}
