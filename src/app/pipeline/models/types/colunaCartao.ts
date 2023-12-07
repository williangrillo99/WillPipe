export interface IColunasListagem {
  idBoard: number;
  nomeBoard: string;
  coluna: Array<IColunaCartao>;
}
export interface IColunaCartao {
  idColuna: number;
  nomeColuna: string;
  cartoes: Array<ICartao>;
}

export class ColunasListagem {
  IdBoard: number | null;
  nomeBoard: string;
  Coluna: Array<ColunaCartao> | null;

  constructor(params: Partial<ColunasListagem>) {
    this.IdBoard = params.IdBoard || null;
    this.nomeBoard = params.nomeBoard || '';
    this.Coluna = params.Coluna || null;
  }
}
import { Cartao, ICartao } from './kanban-card';

export class ColunaCartao {
  IdColuna: number | null;
  NomeColuna: string;
  Cartoes: Array<Cartao> | null;

  constructor(params: Partial<ColunaCartao>) {
    this.IdColuna = params.IdColuna || null;
    this.NomeColuna = params.NomeColuna || '';
    this.Cartoes = params.Cartoes || null;
  }
}

export class TituloRequest {
  Titulo: string | null;
  constructor(Titulo: string) {
    this.Titulo = Titulo;
  }
}
