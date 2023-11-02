import { Component, OnInit } from '@angular/core';
import { KanbanList } from '../../../pipeline/models/types/kanban-list';
import { Board } from '../../../pipeline/models/types/board';
import { KanbanPipeline } from '../../../pipeline/models/types/kanban-pipeline';
import { ListaBoard } from '../../../pipeline/models/types/listboard';
import { KanbanService } from '../../../pipeline/services/kanban.service';

@Component({
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.scss'],
})
export class ListBoardComponent implements OnInit {
  sidebarVisible: boolean = false;
  lists: KanbanList[] = [];
  listIds: string[] = [];
  listaBoard: ListaBoard[] = [];
  board: Board[] = [];
  pipelines: Array<KanbanPipeline> = [];

  style!: HTMLStyleElement;

  isMobileDevice: boolean = false;
  constructor(private kanbanService: KanbanService) {}
  ngOnInit(): void {
    this.kanbanService.recoverBaord().subscribe((x) => {
      console.log(x);
      this.board = x;
    });
  }
}
