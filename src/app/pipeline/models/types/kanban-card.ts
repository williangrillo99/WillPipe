import { Assignee, IUsuario } from './assignee';
import { TaskList } from './task-list';
import { Comment, IComentario } from './comment';
import { ITarefa } from './task';
import { Coluna, IColuna } from './colunas';

export interface KanbanCard {
  id: string;
  title?: string;
  description?: string;
  progress?: number;
  assignees?: Assignee[];
  attachments?: number;
  comments?: Comment[];
  startDate?: string;
  dueDate?: string;
  completed?: boolean;
  taskList: TaskList;
}
export interface ICartao {
  id: number;
  titulo: string;
  descricao: string;
  progresso: number;
  usuarioResponsavel: IUsuario;
  comentarios: IComentario[];
  dataInicio: Date;
  dataFim: Date;
  listaTarefas: ITarefa;
  Coluna: IColuna;
  tarefas: ITarefa;
}

export class CartaoEditarRequest {
  titulo: string;
  descricao: string;
  dataInicio: Date | null;
  dataFim: Date | null;

  constructor(parms: Partial<CartaoEditarRequest>) {
    this.titulo = parms.titulo || '';
    this.descricao = parms.descricao || '';
    this.dataInicio = parms.dataInicio || null;
    this.dataFim = parms.dataFim || null;
  }
}
export class Cartao {
  id: number | null;
  titulo: string;
  descricao: string;
  progresso: number | null;
  usuarioResponsavel: IUsuario | null;
  Coluna: IColuna | null;
  comentarios: IComentario[] | null;
  dataInicio: Date | null;
  dataFim: Date | null;
  tarefas: ITarefa | null;

  constructor(params: Partial<Cartao>) {
    this.id = params.id || null;
    this.titulo = params.titulo || '';
    this.descricao = params.descricao || '';
    this.progresso = params.progresso || null;
    this.usuarioResponsavel = params.usuarioResponsavel || null;
    this.comentarios = params.comentarios || null;
    this.dataInicio = params.dataInicio || null;
    this.dataFim = params.dataFim || null;
    this.tarefas = params.tarefas || null;
    this.Coluna = params.Coluna || null;
  }
}

export class AtualizarCartao {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
export class AtualizarColuna {
  IdColuna: number | null;
  Cartoes: Array<AtualizarCartao>;
  constructor(parms: Partial<AtualizarColuna>) {
    this.IdColuna = parms.IdColuna || null;
    this.Cartoes = parms.Cartoes || [];
  }
}

export class AtualizarRequest {
  colunaAnterior: AtualizarColuna;
  colunasAtual: AtualizarColuna;

  constructor(colunaAnterior: AtualizarColuna, colunasAtual: AtualizarColuna) {
    this.colunaAnterior = colunaAnterior;
    this.colunasAtual = colunasAtual;
  }
}
