import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, map, switchMap, tap } from 'rxjs';
import { KanbanService } from '../../services/kanban.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AdicionarColunaRequest,
  Coluna,
  IColuna,
} from '../../models/types/colunas';
import {
  ColunasListagem,
  IColunaCartao,
  IColunasListagem,
} from '../../models/types/colunaCartao';
import { ICartao } from '../../models/types/kanban-card';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  providers: [MessageService],
})
export class KanbanComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = false;
  idBoard: number;
  lists: Coluna[] = [];
  listIds: string[] = [];
  listagem!: ColunasListagem;
  colunas: Array<IColunaCartao> = [];
  cartoe: Array<ICartao> = [];
  style!: HTMLStyleElement;
  teste: any;
  isMobileDevice: boolean = false;
  apiListagem: any;
  colunaNomes: string[] = [];

  constructor(
    private kanbanService: KanbanService,
    private route: ActivatedRoute,
    private service: MessageService
  ) {
    this.idBoard = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.removeLayoutResponsive();
    this.isMobileDevice = this.kanbanService.isMobileDevice();
    this.apiListagem = this.kanbanService
      .getColunas(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe((x) => {
        this.kanbanService.colunas.next(x.coluna);
        this.kanbanService.colunas$.subscribe((x) => {
          this.colunas = x;
          this.colunaNomes = this.colunas.map((l) => l.nomeColuna || '');
          console.log(this.colunaNomes);
        });
      });
  }

  toggleSidebar() {
    this.sidebarVisible = true;
  }

  addList() {
    var id = this.route.snapshot.paramMap.get('id');
    let coluna: AdicionarColunaRequest = new AdicionarColunaRequest({
      nome: 'Nova coluna',
      idBoard: Number(id),
    });
    this.kanbanService.addColuna(coluna).subscribe(
      (y) => {
        this.kanbanService.getColunas(this.idBoard).subscribe((x) => {
          this.kanbanService.colunas.next(x.coluna);
          this.kanbanService.colunas$.subscribe((x) => {
            this.colunas = x;
            this.colunaNomes = this.colunas.map((l) => l.nomeColuna || '');
          });
          this.service.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Coluna adicionada',
          });
        });
      },
      (erro) => {
        this.service.add({
          severity: 'danger',
          summary: 'Erro!',
          detail: 'Já exite coluna com este nome',
        });
      }
    );
  }

  dropList(event: CdkDragDrop<Coluna[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  removeLayoutResponsive() {
    this.style = document.createElement('style');
    this.style.innerHTML = `
                .layout-content {
                    width: 100%;
                }

                .layout-topbar {
                    width: 100%;
                }
            `;
    document.head.appendChild(this.style);
  }

  ngOnDestroy(): void {
    document.head.removeChild(this.style);
  }
}
