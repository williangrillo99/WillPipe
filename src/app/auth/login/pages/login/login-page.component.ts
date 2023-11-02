import { Component } from '@angular/core';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  rememberMe: boolean = false;
  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'dark';
  }

  login = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
