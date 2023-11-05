import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      {
        path: 'boards',
        canActivate: [authGuard],
        data: { breadcrumb: 'Boards' },
        loadChildren: () =>
          import('src/app/boards/board.module').then((m) => m.BaordModule),
      },
      {
        path: 'pipelines',
        canActivate: [authGuard],
        data: { breadcrumb: 'Pipelines' },
        loadChildren: () =>
          import('src/app/pipeline/kanban.module').then((m) => m.KanbanModule),
      },
      {
        path: 'cartoes',
        canActivate: [authGuard],
        data: { breadcrumb: 'Cartões' },
        loadChildren: () =>
          import('src/app/cards/card.module').then((m) => m.CardModuleModule),
      },
    ],
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((m) => m.AutenticacaoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
