import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginPageComponent } from './pages/login/login-page.component';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginRoutingModule } from './login-routing.module';
import { AppConfigModule } from '../../layout/config/app.config.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LockscreenComponent } from './pages/lockscreen/lockscreen.component';

@NgModule({
  declarations: [LoginPageComponent, LoginLayoutComponent, LockscreenComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
