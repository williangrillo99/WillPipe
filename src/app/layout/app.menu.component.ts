import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Navegação',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Boards',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/boards'],
          },
          {
            label: 'Pipelines',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/pipelines'],
          },
          {
            label: 'Cartoes',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/cartoes'],
          },
          {
            label: 'Tarefas',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/tarefas'],
          },
        ],
      },
    ];
  }
}
