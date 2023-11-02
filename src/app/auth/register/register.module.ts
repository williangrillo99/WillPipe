import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterLayoutComponent } from './register-layoyt.component';

@NgModule({
  declarations: [RegisterPageComponent, RegisterLayoutComponent],
  imports: [CommonModule, RegisterRoutingModule],
})
export class RegisterModule {}
