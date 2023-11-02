import { KanbanCard } from './kanban-card';

export interface KanbanList {
  listId: string;
  title: string;
  cards: KanbanCard[];
}
