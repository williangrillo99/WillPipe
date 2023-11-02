import { Board } from './board';
import { Cartao } from './kanban-card';

export interface Coluna {
  Nome: string;
  Cartoes: Cartao[];
  Board: Board;
}
