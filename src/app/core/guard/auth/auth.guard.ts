import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard  {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    } else {
      return true;
    }
  }

}
