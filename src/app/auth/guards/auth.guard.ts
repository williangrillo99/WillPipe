import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['/login']);
};
