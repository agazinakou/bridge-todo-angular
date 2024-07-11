import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.currentTokenValue();

  if(token){
    req = req.clone({
      setHeaders: {
        Authorization : 'Bearer ' + token
      }
    });
  }

  return next(req);
};
