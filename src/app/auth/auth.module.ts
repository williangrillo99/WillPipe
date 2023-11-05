import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginPageComponent } from './pages/login/login-page.component';
import { LoginRoutingModule } from './auth-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LockscreenComponent } from './pages/lockscreen/lockscreen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { RegisterPageComponent } from './pages/register/register-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LockscreenComponent,
    RegisterPageComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    PasswordModule,
    RippleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
})
export class AutenticacaoModule {}
