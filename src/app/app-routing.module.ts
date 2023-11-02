import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'boards',
        data: { breadcrumb: 'Boards' },
        loadChildren: () =>
          import('src/app/boards/board.module').then((m) => m.BaordModule),
      },
      {
        path: 'pipelines',
        data: { breadcrumb: 'Pipelines' },
        loadChildren: () =>
          import('src/app/pipeline/kanban.module').then((m) => m.KanbanModule),
      },
      {
        path: 'cartoes',
        data: { breadcrumb: 'Cartões' },
        loadChildren: () =>
          import('src/app/cards/card.module').then((m) => m.CardModuleModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
