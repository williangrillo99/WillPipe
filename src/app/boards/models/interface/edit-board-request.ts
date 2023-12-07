export class EditBoardRequest {
  nome: string;
  descricao: string;

  constructor(param: Partial<EditBoardRequest>) {
    this.nome = param.nome || '';
    this.descricao = param.descricao || '';
  }
}
