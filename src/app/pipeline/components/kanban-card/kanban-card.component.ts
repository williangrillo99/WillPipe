import { Component, Input, OnInit } from '@angular/core';
import { Cartao, ICartao, KanbanCard } from '../../models/types/kanban-card';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
})
export class KanbanCardComponent implements OnInit {
  @Input() card!: KanbanCard;
  @Input() cartao!: ICartao;

  constructor() {}
  ngOnInit(): void {}
}
