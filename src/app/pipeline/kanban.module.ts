import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanCardComponent } from './components/kanban-card/kanban-card.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ProgressBarModule } from 'primeng/progressbar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { KanbanComponent } from './pages/kanban/kanban.component';
import { KanbanListComponent } from './components/kanban-list-card/kanban-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanModalComponent } from './components/modal/kanban-modal.component';
import { MenuModule } from 'primeng/menu';
import { InplaceModule } from 'primeng/inplace';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KanbanService } from './services/kanban.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    KanbanCardComponent,
    KanbanComponent,
    KanbanModalComponent,
    KanbanListComponent,
  ],
  imports: [
    ProgressSpinnerModule,
    CommonModule,
    DropdownModule,
    KanbanRoutingModule,
    AvatarModule,
    AvatarGroupModule,
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
    ReactiveFormsModule,
    FormsModule,
    ToastModule,

    SelectButtonModule,
    CascadeSelectModule,

    ButtonModule,

    InputTextModule,
    MultiSelectModule,
  ],
  exports: [KanbanListComponent],
  providers: [KanbanService],
})
export class KanbanModule {}
