import { Component } from '@angular/core';
import { LayoutService } from '../../../../layout/service/app.layout.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
})
export class LockscreenComponent {
  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
