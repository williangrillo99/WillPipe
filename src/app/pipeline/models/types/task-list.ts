import { Tarefa, Task } from './task';

export interface TaskList {
  id?: string;
  title: string;
  tasks: Task[];
}
export interface ListaTarefa {
  Id: number;
  Tarefas: Tarefa[];
}
