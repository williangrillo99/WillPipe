import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { KanbanCard } from '../../models/types/kanban-card';
import { Member } from '../../models/types/member';
import { Task } from '../../models/types/task';
import { Comment } from '../../models/types/comment';
import { ListName } from '../../models/types/list-name';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { MemberService } from '../../services/member.service';
import { KanbanService } from '../../services/kanban.service';
import { KanbanComponent } from '../../pages/kanban/kanban.component';

@Component({
  selector: 'app-kanban-sidebar',
  templateUrl: './kanban-modal.component.html',
  styleUrls: ['./kanban-modal.component.scss'],
})
export class KanbanModalComponent implements OnDestroy {
  card: KanbanCard = {
    id: '',
    taskList: { title: 'Untitled Task List', tasks: [] },
  };

  formValue!: KanbanCard;

  listId: string = '';

  filteredAssignees: Member[] = [];

  assignees: Member[] = [];

  newComment: Comment = { id: '123', name: 'Jane Cooper', text: '' };

  newTask: Task = { text: '', completed: false };

  comment: string = '';

  taskContent: string = '';

  timeout: any = null;

  showTaskContainer: boolean = false;

  menuItems: MenuItem[] = [];

  listNames: ListName[] = [];

  cardSubscription: Subscription;

  listSubscription: Subscription;

  listNameSubscription: Subscription;

  @ViewChild('inputTitle') inputTitle!: ElementRef;

  @ViewChild('inputTaskListTitle') inputTaskListTitle!: ElementRef;

  constructor(
    public parent: KanbanComponent,
    private memberService: MemberService,
    private kanbanService: KanbanService
  ) {
    this.memberService
      .getMembers()
      .then((members) => (this.assignees = members));

    this.cardSubscription = this.kanbanService.selectedCard$.subscribe(
      (data) => {
        this.card = data;
        this.formValue = { ...data };
      }
    );
    this.listSubscription = this.kanbanService.selectedListId$.subscribe(
      (data) => (this.listId = data)
    );
    this.listNameSubscription = this.kanbanService.listNames$.subscribe(
      (data) => (this.listNames = data)
    );
  }

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();
    this.listSubscription.unsubscribe();
    this.listNameSubscription.unsubscribe();
    clearTimeout(this.timeout);
  }

  close() {
    this.parent.sidebarVisible = false;
    this.resetForm();
  }

  filterAssignees(event: any) {
    let filtered: Member[] = [];
    let query = event.query;

    for (let i = 0; i < this.assignees.length; i++) {
      let assignee = this.assignees[i];
      if (
        assignee.name &&
        assignee.name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(assignee);
      }
    }

    this.filteredAssignees = filtered;
  }

  onComment(event: Event) {
    event.preventDefault();
    if (this.comment.trim().length > 0) {
      this.newComment = { ...this.newComment, text: this.comment };
      this.formValue?.comments?.unshift(this.newComment);
      this.comment = '';
    }
  }

  onSave(event: any) {
    event.preventDefault();
    this.card = { ...this.formValue };
    this.kanbanService.updateCard(this.card, this.listId);
    this.close();
  }

  onMove(listId: string) {
    this.kanbanService.moveCard(this.formValue, listId, this.listId);
  }

  onDelete() {
    this.kanbanService.deleteCard(this.formValue?.id || '', this.listId);
    this.parent.sidebarVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.formValue = {
      id: '',
      taskList: { title: 'Untitled Task List', tasks: [] },
    };
  }

  addTaskList() {
    this.showTaskContainer = !this.showTaskContainer;

    if (!this.showTaskContainer) {
      return;
    } else if (!this.formValue.taskList) {
      let id = this.kanbanService.generateId();
      this.formValue = {
        ...this.formValue,
        taskList: { id: id, title: 'Untitled Task List', tasks: [] },
      };
    }
  }

  addTask(event: Event) {
    event.preventDefault();
    if (this.taskContent.trim().length > 0) {
      this.newTask = { text: this.taskContent, completed: false };
      this.formValue.taskList?.tasks.unshift(this.newTask);
      this.taskContent = '';
      this.calculateProgress();
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

  calculateProgress() {
    if (this.formValue.taskList) {
      let completed = this.formValue.taskList.tasks.filter(
        (t) => t.completed
      ).length;
      this.formValue.progress = Math.round(
        100 * (completed / this.formValue.taskList.tasks.length)
      );
    }
  }
}
