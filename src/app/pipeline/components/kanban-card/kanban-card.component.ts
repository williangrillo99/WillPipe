import { Component, Input } from '@angular/core';
import { KanbanCard } from '../../models/types/kanban-card';
import { Subscription } from 'rxjs';
import { KanbanService } from '../../services/kanban.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
})
export class KanbanCardComponent {
  @Input() card!: KanbanCard;

  @Input() listId!: string;

  menuItems: MenuItem[] = [];

  subscription: Subscription;

  constructor(private kanbanService: KanbanService) {
    this.subscription = this.kanbanService.lists$.subscribe((data) => {
      let subMenu = data.map((d) => ({
        id: d.listId,
        label: d.title,
        command: () => this.onMove(d.listId),
      }));
      this.generateMenu(subMenu);
    });
  }

  parseDate(dueDate: string) {
    return new Date(dueDate).toDateString().split(' ').slice(1, 3).join(' ');
  }

  onDelete() {
    this.kanbanService.deleteCard(this.card.id, this.listId);
  }

  onCopy() {
    this.kanbanService.copyCard(this.card, this.listId);
  }

  onMove(listId: string) {
    this.kanbanService.moveCard(this.card, listId, this.listId);
  }

  generateMenu(subMenu: any[]) {
    this.menuItems = [
      { label: 'Copiar cartão', command: () => this.onCopy() },
      { label: 'Mover cartão', items: subMenu },
      { label: 'Deletar cartão', command: () => this.onDelete() },
    ];
  }

  generateTaskInfo() {
    let total = this.card.taskList.tasks.length;
    let completed = this.card.taskList.tasks.filter((t) => t.completed).length;
    return `${completed} / ${total}`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
