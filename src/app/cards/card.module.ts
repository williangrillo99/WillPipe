import { CardComponent } from './pags/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
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
import { CardRoutingModule } from './card-routing.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { KanbanService } from '../pipeline/services/kanban.service';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
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
    DropdownModule,
    CardModule,
    InputTextareaModule,
    CardRoutingModule,
    TableModule,
  ],
  providers: [KanbanService],
})
export class CardModuleModule {}
