export class LoginRequest {
  email: string;
  senha: string;

  constructor(parms: Partial<LoginRequest>) {
    this.email = parms.email || '';
    this.senha = parms.senha || '';
  }
}
