import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ProgressBarModule } from 'primeng/progressbar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MenuModule } from 'primeng/menu';
import { InplaceModule } from 'primeng/inplace';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { ListBoardComponent } from './pages/list-board/list-board.component';
import { BoardRoutingModule } from './board-routing.module';
import { KanbanService } from '../pipeline/services/kanban.service';
import { KanbanModule } from '../pipeline/kanban.module';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations: [ListBoardComponent],
  imports: [
    AvatarGroupModule,
    BoardRoutingModule,
    CommonModule,
    AvatarModule,
    ProgressBarModule,
    TieredMenuModule,
    DragDropModule,
    MenuModule,
    InplaceModule,
    FormsModule,
    OverlayPanelModule,
    AutoCompleteModule,
    SidebarModule,
    CalendarModule,
    CheckboxModule,
    CardModule,
    InputTextareaModule,
    KanbanModule,
  ],
  providers: [KanbanService],
})
export class BaordModule {}
