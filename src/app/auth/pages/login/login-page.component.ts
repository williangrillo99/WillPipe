import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/request/login.request';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import { LayoutService } from '../../../layout/service/app.layout.service';

@Component({
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  rememberMe: boolean = false;
  loginRequest: LoginRequest = new LoginRequest({});
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private layoutService: LayoutService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.verificarLogin();
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'dark';
  }

  login = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    senha: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  fazerLogin(): void {
    if (this.login.valid) {
      const login = Object.assign(this.loginRequest, this.login.value);
      this.authService.login(login).subscribe({
        next: (x) => {
          this.cookieService.set('infoUsuario', JSON.stringify(x));
          this.router.navigate(['/app/boards']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao fazer login',
            detail: 'Email ou senha incorretos',
          });
        },
      });
    }
  }

  verificarLogin(): void {
    if (this.authService.isAuthenticated()) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario autenticado',
          detail: 'Redirecionando usuario',
        });
      }, 1500);
      setTimeout(() => {
        this.router.navigate(['/app/boards']);
      }, 3500);
    }
  }
}
