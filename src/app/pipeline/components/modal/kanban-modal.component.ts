import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Cartao,
  CartaoEdicaoRequest,
  KanbanCard,
} from '../../models/types/kanban-card';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { KanbanService } from '../../services/kanban.service';
import { KanbanComponent } from '../../pages/kanban/kanban.component';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-kanban-sidebar',
  templateUrl: './kanban-modal.component.html',
  styleUrls: ['./kanban-modal.component.scss'],
})
export class KanbanModalComponent implements OnDestroy, OnInit {
  card: KanbanCard = {
    id: '',
    taskList: { title: 'Untitled Task List', tasks: [] },
  };

  cartao!: Cartao;
  formValue!: KanbanCard;

  cardForm: FormGroup;
  listId: string = '';

  taskContent: string = '';

  timeout: any = null;

  showTaskContainer: boolean = false;

  menuItems: MenuItem[] = [];

  cardSubscription: Subscription;

  @ViewChild('inputTitle') inputTitle!: ElementRef;

  @ViewChild('inputTaskListTitle') inputTaskListTitle!: ElementRef;

  idBoard: number;

  open!: boolean;
  constructor(
    public parent: KanbanComponent,
    private memberService: MessageService,
    private kanbanService: KanbanService,
    private route: ActivatedRoute
  ) {
    this.idBoard = Number(this.route.snapshot.paramMap.get('id'));
    this.cardForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl(''),
      dataInicio: new FormControl<Date | null>(null),
      dataFinal: new FormControl<Date | null>(null),
    });

    this.kanbanService.selectedCartao$.subscribe((x) => {
      this.cartao = x;
    });

    this.cardSubscription = this.kanbanService.selectedCartao$.subscribe(
      (x) => {
        if (x.dataInicio != null) {
          const dataInicio = new Date(x.dataInicio);
          this.cardForm.controls['dataInicio'].setValue(dataInicio);
        } else {
          this.cardForm.controls['dataInicio'].setValue(null);
        }
        if (x.dataFim != null) {
          const dataFim = new Date(x.dataFim);
          this.cardForm.controls['dataFinal'].setValue(dataFim);
        } else {
          this.cardForm.controls['dataFinal'].setValue(null);
        }
        this.cardForm.controls['titulo'].setValue(x.titulo);
        this.cardForm.controls['descricao'].setValue(x.descricao);
      }
    );

    this.kanbanService.openModal$.subscribe((x) => {
      this.open = x;
    });
  }
  ngOnInit(): void {}

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();

    clearTimeout(this.timeout);
  }

  close() {
    this.kanbanService.showModal();
  }

  deletar() {
    console.log(this.cartao.id);
    this.kanbanService.deletarCartao(this.cartao.id).subscribe((x) => {
      this.kanbanService.getColunas(this.idBoard).subscribe((x) => {
        this.kanbanService.colunas.next(x.coluna);
        this.memberService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Cartão deletado',
        });
        setTimeout(() => {
          this.close();
        }, 100);
      });
    });
  }
  onSave() {
    console.log(this.cardForm.value);
    if (this.cardForm.valid) {
      const request: CartaoEdicaoRequest = new CartaoEdicaoRequest({
        titulo: this.cardForm.controls['titulo'].value,
        descricao: this.cardForm.controls['descricao'].value,
        dataInicio: this.cardForm.controls['dataInicio'].value,
        dataFim: this.cardForm.controls['dataFinal'].value,
      });
      this.kanbanService
        .editarCartao(this.cartao.id, request)
        .subscribe((x) => {
          this.kanbanService.getColunas(this.idBoard).subscribe((x) => {
            this.kanbanService.colunas.next(x.coluna);
            this.memberService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Cartão editado',
            });
            setTimeout(() => {
              this.close();
            }, 100);
          });
        });
    }
  }

  focus(arg: number) {
    if (arg == 1) {
      this.timeout = setTimeout(() => this.inputTitle.nativeElement.focus(), 1);
    }
    if (arg == 2) {
      this.timeout = setTimeout(
        () => this.inputTaskListTitle.nativeElement.focus(),
        1
      );
    }
  }
}
