import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { InplaceModule } from 'primeng/inplace';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListBoardComponent } from './pages/list-board/list-board.component';
import { BoardRoutingModule } from './board-routing.module';
import { KanbanService } from '../pipeline/services/kanban.service';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ModalBoardComponent } from './components/modal-board/modal-board.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ModalBoardEditarComponent } from './components/modal-editar-board/modal-editar.compoenent';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    ListBoardComponent,
    ModalBoardComponent,
    ModalBoardEditarComponent,
  ],
  imports: [
    SelectButtonModule,
    CascadeSelectModule,
    InplaceModule,
    ButtonModule,
    SidebarModule,
    AvatarGroupModule,
    BoardRoutingModule,
    CommonModule,
    AvatarModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    AvatarModule,
    AvatarGroupModule,
    FormsModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [KanbanService],
})
export class BaordModule {}
