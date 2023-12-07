import { Component, Input, OnInit } from '@angular/core';
import { Cartao, ICartao, KanbanCard } from '../../models/types/kanban-card';
import { Subscription } from 'rxjs';
import { KanbanService } from '../../services/kanban.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
})
export class KanbanCardComponent implements OnInit {
  @Input() card!: KanbanCard;
  @Input() cartao!: ICartao;

  constructor(private kanbanService: KanbanService) {}
  ngOnInit(): void {}

  parseDate(dueDate: string) {
    return new Date(dueDate).toDateString().split(' ').slice(1, 3).join(' ');
  }

  generateTaskInfo() {
    let total = this.card.taskList.tasks.length;
    let completed = this.card.taskList.tasks.filter((t) => t.completed).length;
    return `${completed} / ${total}`;
  }

  ngOnDestroy() {}
}
