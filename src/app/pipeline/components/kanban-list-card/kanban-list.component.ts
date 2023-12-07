import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ICartao } from '../../models/types/kanban-card';
import { KanbanList } from '../../models/types/kanban-list';
import { KanbanService } from '../../services/kanban.service';
import { KanbanComponent } from '../../pages/kanban/kanban.component';
import { IColunaCartao, TituloRequest } from '../../models/types/colunaCartao';
import { Observable, tap } from 'rxjs';
import { MoverCartaoColunaRequest } from '../../models/types/atualizarCartao';
@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.scss'],
})
export class KanbanListComponent implements OnInit {
  @Input() list!: KanbanList;
  @Input() listIds!: string[];
  @Input() coluna!: IColunaCartao;
  @Input() colunaNomes!: Array<string>;
  @Input() idBoard!: number;
  spinner: Observable<boolean>;
  listString: Array<string> = [];
  loading: boolean = false;
  menuItems: MenuItem[] = [];
  request!: MoverCartaoColunaRequest;
  previousIndex!: any[];
  currentIndex!: any[];
  previus!: Array<ICartao>;
  current!: Array<ICartao>;

  title: string = '';

  timeout: any = null;
  eteee!: any;
  isMobileDevice: boolean = false;

  @ViewChild('inputEl') inputEl!: ElementRef;

  @ViewChild('listEl') listEl!: ElementRef;

  constructor(
    public parent: KanbanComponent,
    private kanbanService: KanbanService,
    private service: MessageService
  ) {
    this.spinner = this.kanbanService.spinner$;
  }

  ngOnInit(): void {
    this.isMobileDevice = this.kanbanService.isMobileDevice();
    this.menuItems = [
      {
        label: 'Ações',
        items: [
          { separator: true },
          {
            label: 'Deletar coluna',
            command: () => {
              if (this.coluna) {
                this.onDelete(this.coluna);
              }
            },
          },
        ],
      },
    ];
  }

  toggleSidebar() {
    this.parent.sidebarVisible = true;
  }

  onDelete(id: any) {
    this.kanbanService.deleterColuna(id.idColuna).subscribe((x) => {
      this.kanbanService.getColunas(this.idBoard).subscribe((x) => {
        this.kanbanService.colunas.next(x.coluna);
        this.service.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Coluna deletada',
        });
      });
    });
  }

  onCardClick(event: Event, card: ICartao) {
    const eventTarget = event.target as HTMLElement;
    if (
      !(
        eventTarget.classList.contains('p-button-icon') ||
        eventTarget.classList.contains('p-trigger')
      )
    ) {
      if (card) {
        this.kanbanService.onCartaoSelect(card);
      }
      this.kanbanService.openModal();
    }
  }

  insertCard() {
    if (this.coluna) {
      this.kanbanService
        .adicionarCartao(this.coluna.idColuna)
        .subscribe((x) => {
          this.kanbanService.getColunas(this.idBoard).subscribe((x) => {
            this.kanbanService.colunas.next(x.coluna);
            this.service.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Cartao criado',
            });
          });
        });
    }
  }

  dropCard(event: CdkDragDrop<ICartao[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      var request = new MoverCartaoColunaRequest({
        colunaAtual: event.container.data,
        colunaAntiga: event.previousContainer.data,
        NomeConlunaAnterior: event.previousContainer.id,
        NomeColunaIndex: event.container.id,
        idBoard: this.idBoard,
      });

      this.kanbanService.moverCartaoCaluna(request).subscribe((x) => {
        this.kanbanService.exibirBoards().subscribe((x) => {
          this.kanbanService.getColunas(this.idBoard).subscribe((x) => {
            this.kanbanService.colunas.next(x.coluna);
            this.service.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Cartao atualizado',
            });
          });
        });
      });
    }
  }

  atualizaTitulo(id: number, nomeAtualizado: string) {
    let titulo: TituloRequest = new TituloRequest(nomeAtualizado);
    this.kanbanService.atualizarTituloColuna(id, titulo).subscribe((x) => {
      this.kanbanService.getColunas(this.idBoard).subscribe((x) => {
        this.kanbanService.colunas.next(x.coluna);
        this.service.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Titulo atualizado',
        });
      });
    });
  }

  focus() {
    this.timeout = setTimeout(() => this.inputEl.nativeElement.focus(), 1);
  }

  insertHeight(event: any) {
    event.container.element.nativeElement.style.minHeight = '10rem';
  }

  removeHeight(event: any) {
    event.container.element.nativeElement.style.minHeight = '2rem';
  }
}
