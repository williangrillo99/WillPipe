import { Board } from './board';
import { ICartao } from './kanban-card';

export interface IColuna {
  nome: string;
  cartoes: ICartao[];
  board: Board;
  id: number;
}
export class Coluna {
  nome: string;
  Cartoes: ICartao[] | null;
  idBoard: number | null;
  constructor(params: Partial<Coluna>) {
    this.nome = params.nome || '';
    this.Cartoes = params.Cartoes || null;
    this.idBoard = params.idBoard || null;
  }
}

export class AdicionarColunaRequest {
  nome: string;
  idBoard: number | null;
  constructor(params: Partial<Coluna>) {
    this.nome = params.nome || '';
    this.idBoard = params.idBoard || null;
  }
}
