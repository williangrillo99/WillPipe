import { Component } from '@angular/core';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  constructor(private layoutService: LayoutService) {}
  confirmed: boolean = false;

  registro = new FormGroup({
    nome: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    senha: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    termos: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'dark';
  }
}
