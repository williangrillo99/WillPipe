import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  any: any;
  ngOnInit() {
    this.model = [
      {
        label: 'Navegação',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Boards',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/app/boards'],
          },
          {
            label: 'Pipelines',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/app/pipeline/'],
            expanded: true,
            routerLinkActiveOptions: 'active',
          },
          {
            label: 'Cartões',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/app/cartoes'],
          },
        ],
      },
    ];
  }
}
