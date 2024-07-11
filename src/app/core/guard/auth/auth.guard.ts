import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  var authService = inject(AuthService);
  var router = inject(Router);

  if(await authService.isAuthenticated()){
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
