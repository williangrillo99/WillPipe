import { Observable, Subscribable, Subscription, switchMap, tap } from 'rxjs';
import { KanbanService } from './../../pipeline/services/kanban.service';
import { Component, OnInit } from '@angular/core';
import { BoardNome } from '../models/board-nome.response';
import { ICartao } from '../../pipeline/models/types/kanban-card';

@Component({
  templateUrl: './card.component.html',
})
export class CardComponent {
  cardSubscription: Subscription;
  cardSubscription1: any;

  listaBoard!: Array<BoardNome>;
  select: any;
  listaCartao!: Array<ICartao>;
  constructor(private kanbanService: KanbanService) {
    this.cardSubscription = kanbanService
      .recuperarNomeBoard()
      .subscribe((x) => {
        this.listaBoard = x;
        this.kanbanService.selectId.next(x[0].id);
      });

    this.cardSubscription1 = this.kanbanService.selectId$
      .pipe(
        switchMap((x) => {
          return this.kanbanService.listarCartoes(x);
        })
      )
      .subscribe((x) => {
        this.listaCartao = x;
      });
  }
  selecionarCartoes(select: BoardNome) {
    this.kanbanService.selectId.next(select.id);
  }
}
