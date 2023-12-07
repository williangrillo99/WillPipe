export class CreateBoardResquest {
  Nome: string;
  Descricao: string;

  constructor(params: Partial<CreateBoardResquest>) {
    this.Nome = params.Nome || '';
    this.Descricao = params.Descricao || '';
  }
}
export interface BoardMain {
  Nome: string;
  Descricao: string;
}
