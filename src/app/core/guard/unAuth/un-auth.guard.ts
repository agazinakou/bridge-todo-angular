import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const unAuthGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(await authService.isAuthenticated()){
    router.navigate(['/dashboard']);
    return false;
  } else {
    return true;
  }
};
