import { Assignee, Usuario } from './assignee';
import { TaskList, ListaTarefa } from './task-list';
import { Comentario, Comment } from './comment';

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
export interface Cartao {
  Id: number;
  Titulo: string;
  Descricao: string;
  Progresso: number;
  UsuarioResponsavel: Usuario;
  Comentarios: Comentario[];
  DataInicio: Date;
  DataFim: Date;
  ListaTarefas: ListaTarefa;
}
