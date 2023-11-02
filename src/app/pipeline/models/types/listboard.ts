import { Board } from './board';
export class ListaBoard {
  board?: Board;

  constructor(params: Partial<ListaBoard>) {
    this.board = params.board;
  }
}
