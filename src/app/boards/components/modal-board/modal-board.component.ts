import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ListBoardComponent } from '../../pages/list-board/list-board.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBoardResquest } from '../../models/interface/create-board-resquest';
import { KanbanService } from '../../../pipeline/services/kanban.service';
import { Observable, Subscribable, tap, timeout } from 'rxjs';
import { Board } from '../../../pipeline/models/types/board';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-board',
  templateUrl: './modal-board.component.html',
  styleUrls: ['./modal-board.component.scss'],
})
export class ModalBoardComponent {
  @Input() sidebarVisible: boolean = false;
  @Output() closeSideBar: EventEmitter<boolean> = new EventEmitter();
  boardRequest: CreateBoardResquest = new CreateBoardResquest({});
  constructor(
    private kanbanService: KanbanService,
    private service: MessageService
  ) {}

  formBoard: FormGroup = new FormGroup({
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

  enviar() {
    if (this.formBoard.valid) {
      this.kanbanService
        .addBoard(this.formBoard.value)
        .pipe(
          tap((x) => {
            this.kanbanService.updateBoard(x);
            this.service.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Board criado',
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
