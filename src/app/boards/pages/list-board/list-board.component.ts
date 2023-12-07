import { Subscription, switchMap, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { KanbanList } from '../../../pipeline/models/types/kanban-list';
import { Board } from '../../../pipeline/models/types/board';
import { KanbanPipeline } from '../../../pipeline/models/types/kanban-pipeline';
import { ListaBoard } from '../../../pipeline/models/types/listboard';
import { KanbanService } from '../../../pipeline/services/kanban.service';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.scss'],
  providers: [MessageService],
})
export class ListBoardComponent implements OnInit {
  sidebarVisible: boolean = false;
  selectEditar: boolean = false;
  lists: KanbanList[] = [];
  listaBoard: ListaBoard[] = [];
  board!: Board[];
  pipelines: Array<KanbanPipeline> = [];
  subscription = new Subscription();
  style!: HTMLStyleElement;
  editar: boolean = false;
  isMobileDevice: boolean = false;
  constructor(private kanbanService: KanbanService) {}
  ngOnInit(): void {
    this.kanbanService.exibirBoards().subscribe((x) => {
      this.kanbanService.updateBoard(x);
    });
    this.kanbanService.board.subscribe((x) => {
      this.board = x;
    });
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  editarFechart() {
    this.selectEditar = !this.selectEditar;
  }
  selectBoard(board: Board) {
    this.kanbanService.onSelectBoard(board);
    this.kanbanService.editar.next(true);
    this.editarFechart();
  }
}
