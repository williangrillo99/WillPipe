import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { LayoutService } from './layout/service/app.layout.service';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, AppLayoutModule, BrowserModule, HttpClientModule],
  providers: [AuthService, LayoutService],
  bootstrap: [AppComponent],
})
export class AppModule {}
