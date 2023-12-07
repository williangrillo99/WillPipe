import { EditBoardRequest } from './../../models/interface/edit-board-request';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBoardResquest } from '../../models/interface/create-board-resquest';
import { KanbanService } from '../../../pipeline/services/kanban.service';
import { Observable, Subscription, tap } from 'rxjs';
import { Board } from '../../../pipeline/models/types/board';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-editar-board',
  templateUrl: './modal.editar.component.html',
  styleUrls: ['./moda-editarl-board.component.scss'],
})
export class ModalBoardEditarComponent {
  @Input() editarsidebarVisible: boolean = false;
  @Output() closeSideBar: EventEmitter<boolean> = new EventEmitter();
  board!: Board;
  subscri: Subscription;
  editBoardRequest: EditBoardRequest = new EditBoardRequest({});
  constructor(
    private kanbanService: KanbanService,
    private service: MessageService
  ) {
    this.subscri = this.kanbanService.selectBoard$
      .pipe(
        tap((x) => {
          this.formBoardEditar.controls['Nome'].setValue(x.nome);
          this.formBoardEditar.controls['Descricao'].setValue(x.descricao);
        })
      )
      .subscribe((x) => {
        this.board = x;
      });
  }

  formBoardEditar: FormGroup = new FormGroup({
    Nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    Descricao: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  close() {
    this.closeSideBar.emit(false);
  }

  deletar() {
    this.kanbanService.deletetarBoard(this.board.id).subscribe((x) => {
      this.kanbanService.exibirBoards().subscribe((x) => {
        this.kanbanService.updateBoard(x);
        this.service.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Board deletado',
        });
        setTimeout(() => {
          this.close();
        }, 200);
      });
    });
  }

  enviar() {
    if (this.formBoardEditar.valid) {
      this.editBoardRequest.nome = this.formBoardEditar.controls['Nome'].value;
      this.editBoardRequest.descricao =
        this.formBoardEditar.controls['Descricao'].value;
      console.log(this.editBoardRequest);
      this.kanbanService
        .editarBoard(this.board.id, this.editBoardRequest)
        .pipe(
          tap((x) => {
            this.kanbanService.updateBoard(x);
            this.service.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Board editado',
            });
            setTimeout(() => {
              this.close();
            }, 100);
          })
        )
        .subscribe();
    }
  }
}
