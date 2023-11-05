import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { LoginRequest } from './models/request/login.request';
import { Usuario } from './models/types/usuario';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly coockieService: CookieService,
    private http: HttpClient
  ) {}
  urlbase = environment.config.apis.local;

  isAuthenticated(): boolean {
    return this.coockieService.check('infoUsuario');
  }

  login(login: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlbase + 'Usuarios/Logar', login);
  }
}
